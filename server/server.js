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

const allowedOrigins = [
  'http://localhost:3000', 
  'https://smart-traffic-management-system-black-kappa.vercel.app',
  'https://smart-traffic-management-system-bpm.vercel.app'
];

// Enhanced CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('Blocked origin:', origin);
      callback(null, false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Authorization'],
  maxAge: 86400 // 24 hours
};

app.use(cors(corsOptions));

// Preflight handling
app.options('*', cors(corsOptions));

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
    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET || "your-secret-key-change-in-production"
    );
    
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
      error: "Invalid token",
      message: error.message
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
  console.log(`✓ Client connected: ${socket.id}`);
  console.log(`  Origin: ${socket.handshake.headers.origin}`);
  
  socket.on("disconnect", () => {
    console.log(`✗ Client disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`\n========================================`);
  console.log(`✓ Backend server running on port ${PORT}`);
  console.log(`✓ WebSocket server ready`);
  console.log(`✓ API available at http://localhost:${PORT}/api`);
  console.log(`✓ Allowed origins:`);
  allowedOrigins.forEach(origin => console.log(`  - ${origin}`));
  console.log(`========================================\n`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
    process.exit(0);
  });
});