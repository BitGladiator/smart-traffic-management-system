const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

require("dotenv").config();
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const trafficRoutes = require("./routes/trafficRoutes");
const { errorHandler } = require("./middlewares/errorhandles");

connectDB();

const app = express();
const server = http.createServer(app);

// CORS configuration
const allowedOrigins = [
  'http://localhost:3000', 
  'http://localhost:3001',
  'https://smart-traffic-management-system-black-kappa.vercel.app',
  'https://smart-traffic-management-system-bpm.vercel.app'
];

// FIXED: Use a simpler CORS configuration
const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Authorization']
};

// Apply CORS middleware
app.use(cors(corsOptions));

// REMOVED: Don't use app.options('*', ...) - it's causing the error
// Express will handle OPTIONS requests automatically with the CORS middleware

// Increase JSON payload limit
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server is running",
    timestamp: new Date().toISOString(),
    allowedOrigins: allowedOrigins
  });
});

// Dashboard token endpoint
app.post("/api/auth/dashboard-token", async (req, res) => {
  try {
    const { dashboardUrl } = req.body;
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false, 
        error: "Authorization token required" 
      });
    }
    
    const token = authHeader.split(' ')[1];
    const jwt = require('jsonwebtoken');
    
    // Decode the token
    const decoded = jwt.decode(token);
    
    if (!decoded) {
      return res.status(401).json({ 
        success: false, 
        error: "Invalid token" 
      });
    }
    
    // Generate dashboard token
    const dashboardToken = jwt.sign(
      {
        userId: decoded.userId || decoded.id || "1",
        userName: decoded.userName || decoded.name || "User",
        userEmail: decoded.userEmail || decoded.email || "user@stms.ai",
        userRole: decoded.userRole || decoded.role || "user",
        dashboardUrl: dashboardUrl,
        source: "dashboard-redirect",
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (15 * 60)
      },
      process.env.JWT_SECRET || "your-secret-key-change-in-production",
      { expiresIn: '15m' }
    );
    
    res.json({
      success: true,
      dashboardToken,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
      user: {
        id: decoded.userId || decoded.id || "1",
        name: decoded.userName || decoded.name || "User",
        email: decoded.userEmail || decoded.email || "user@stms.ai",
        role: decoded.userRole || decoded.role || "user"
      }
    });
    
  } catch (error) {
    console.error("Dashboard token error:", error);
    res.status(500).json({ 
      success: false, 
      error: "Failed to generate dashboard token",
      message: error.message 
    });
  }
});

// Dashboard callback endpoint
app.post("/api/auth/dashboard-callback", (req, res) => {
  try {
    const { token, userId, userName, userEmail, userRole, redirect } = req.body;
    
    if (!token) {
      return res.status(400).json({ 
        success: false, 
        error: "Token is required" 
      });
    }
    
    const dashboardUrl = "https://smart-traffic-management-system-bpm.vercel.app";
    const redirectUrl = redirect || `${dashboardUrl}/dashboard`;
    
    const htmlResponse = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Redirecting to Dashboard...</title>
        <script>
          // Store token in localStorage
          localStorage.setItem('authToken', '${token}');
          localStorage.setItem('userData', JSON.stringify({
            id: '${userId || "1"}',
            name: '${userName || "User"}',
            email: '${userEmail || "user@stms.ai"}',
            role: '${userRole || "user"}'
          }));
          
          // Redirect to dashboard
          setTimeout(() => {
            window.location.href = '${redirectUrl}';
          }, 100);
        </script>
      </head>
      <body>
        <div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
          <div style="text-align: center;">
            <h2>Authenticating...</h2>
            <p>Redirecting to dashboard...</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    res.setHeader('Content-Type', 'text/html');
    res.send(htmlResponse);
    
  } catch (error) {
    console.error("Dashboard callback error:", error);
    res.status(500).json({ 
      success: false, 
      error: "Authentication failed" 
    });
  }
});

// Token validation endpoint
app.get("/api/auth/validate", (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
      valid: false, 
      error: "No token provided" 
    });
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key-change-in-production");
    
    res.json({
      valid: true,
      user: {
        id: decoded.userId || decoded.id,
        name: decoded.userName || decoded.name,
        email: decoded.userEmail || decoded.email,
        role: decoded.userRole || decoded.role
      }
    });
  } catch (error) {
    res.status(401).json({ 
      valid: false, 
      error: "Invalid token" 
    });
  }
});

// Socket.io configuration
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  },
  transports: ['websocket', 'polling'],
  pingTimeout: 60000,
  pingInterval: 25000,
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/traffic", trafficRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    message: "Route not found",
    path: req.path,
    method: req.method 
  });
});

// Error handling middleware
app.use(errorHandler);

// Socket.io for real-time updates
require("./sockets/trafficSockets")(io);

// Socket connection logging
io.on("connection", (socket) => {
  console.log(`New client connected: ${socket.id}`);
  console.log(`Origin: ${socket.handshake.headers.origin}`);
  
  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`✓ Backend server running on port ${PORT}`);
  console.log(`✓ WebSocket server ready`);
  console.log(`✓ API available at http://localhost:${PORT}/api`);
  console.log(`✓ Allowed origins:`);
  allowedOrigins.forEach(origin => console.log(`  - ${origin}`));
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
    process.exit(0);
  });
});