import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LogIn, Mail, Lock, Eye, EyeOff, AlertCircle, 
  Shield, Cpu, BarChart3, Building2, ArrowRight,
  Cloud, Database, Zap, CheckCircle, Users,
  Target, Globe, ShieldCheck, Sparkles
} from 'lucide-react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const particlesRef = useRef([]);
  const formRef = useRef(null);

  useEffect(() => {
    // Create floating particles effect
    const createParticles = () => {
      const container = document.querySelector('.particles-container');
      if (!container) return;

      particlesRef.current.forEach(particle => particle.remove());
      particlesRef.current = [];

      for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute rounded-full';
        particle.style.width = `${Math.random() * 30 + 10}px`;
        particle.style.height = particle.style.width;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animation = `float ${Math.random() * 8 + 8}s ease-in-out infinite`;
        particle.style.animationDelay = `${Math.random() * 3}s`;
        
        // Random gradient backgrounds
        const gradients = [
          'from-blue-500/20 to-cyan-500/20',
          'from-emerald-500/20 to-teal-500/20',
          'from-violet-500/20 to-purple-500/20',
          'from-amber-500/20 to-orange-500/20'
        ];
        particle.className += ` bg-gradient-to-br ${gradients[Math.floor(Math.random() * gradients.length)]}`;
        
        container.appendChild(particle);
        particlesRef.current.push(particle);
      }
    };

    createParticles();

    return () => {
      particlesRef.current.forEach(particle => particle.remove());
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const API_BASE_URL = process.env.NODE_ENV === 'production' 
        ? 'https://smart-traffic-management-system-23fs.onrender.com' 
        : 'http://localhost:5500';

      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      if (!data.token) {
        throw new Error('No token received from server');
      }

      await login(data.user, data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to login. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  const TrafficFlowSVG = () => (
    <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 300" preserveAspectRatio="none">
      <defs>
        <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#10b981" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
        </linearGradient>
        <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Traffic flow lines */}
      <path
        d="M0,100 Q100,50 200,100 T400,100"
        fill="none"
        stroke="url(#flowGradient)"
        strokeWidth="2"
        strokeDasharray="10,5"
        className="animate-traffic-flow"
      />
      <path
        d="M0,150 Q150,100 300,150 T400,150"
        fill="none"
        stroke="url(#flowGradient)"
        strokeWidth="1.5"
        strokeDasharray="10,5"
        className="animate-traffic-flow-delayed"
      />
      <path
        d="M0,200 Q100,150 200,200 T400,200"
        fill="none"
        stroke="url(#flowGradient)"
        strokeWidth="1"
        strokeDasharray="10,5"
        className="animate-traffic-flow-delayed2"
      />
      
      {/* Traffic nodes */}
      <circle cx="100" cy="100" r="8" fill="url(#nodeGradient)" className="animate-pulse" />
      <circle cx="200" cy="100" r="6" fill="url(#nodeGradient)" className="animate-pulse" style={{animationDelay: '0.5s'}} />
      <circle cx="300" cy="100" r="4" fill="url(#nodeGradient)" className="animate-pulse" style={{animationDelay: '1s'}} />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-emerald-50/50 pt-16 overflow-hidden">
      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }
        @keyframes traffic-flow {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -20; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        .animate-traffic-flow { animation: traffic-flow 15s linear infinite; }
        .animate-traffic-flow-delayed { animation: traffic-flow 15s linear infinite 3s; }
        .animate-traffic-flow-delayed2 { animation: traffic-flow 15s linear infinite 6s; }
        .animate-shimmer { animation: shimmer 3s ease-in-out infinite; }
        .animate-glow-pulse { animation: glow-pulse 3s ease-in-out infinite; }
      `}</style>

      {/* Background Elements */}
      <div className="particles-container fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <TrafficFlowSVG />
        
        {/* Large gradient orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-transparent rounded-full blur-3xl animate-glow-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-emerald-200/30 to-transparent rounded-full blur-3xl animate-glow-pulse" style={{animationDelay: '1s'}}></div>
        
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-grid-blue-50/50 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]" />
      </div>

      <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Premium Intro */}
          <div className="hidden lg:block space-y-12">
            {/* Premium Header */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="inline-flex items-center gap-3 mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-2xl blur-lg opacity-30"></div>
                    <div className="relative bg-gradient-to-br from-white to-gray-50 p-3 rounded-2xl border border-gray-200 shadow-lg">
                      <Sparkles className="h-7 w-7 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Secure Platform</span>
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-emerald-600 to-blue-600 bg-clip-text text-transparent">
                      STMS
                    </h1>
                  </div>
                </div>
                
                <h2 className="text-5xl font-bold text-gray-900 mb-6">
                  Smart Traffic Management
                  <span className="block mt-2 text-transparent bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text">
                    System Dashboard
                  </span>
                </h2>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  Access the world's most advanced urban mobility intelligence platform. 
                  Monitor, analyze, and optimize city infrastructure with real-time 
                  AI-powered insights.
                </p>
              </div>
            </div>

            {/* Premium Feature Cards */}
            <div className="grid grid-cols-2 gap-6">
              {[
                {
                  icon: <Cpu className="h-6 w-6" />,
                  title: "AI Optimization",
                  desc: "Neural networks for traffic flow",
                  color: "from-blue-50 to-blue-100",
                  iconColor: "text-blue-600",
                  borderColor: "border-blue-200"
                },
                {
                  icon: <BarChart3 className="h-6 w-6" />,
                  title: "Real-time Analytics",
                  desc: "Live monitoring dashboard",
                  color: "from-emerald-50 to-emerald-100",
                  iconColor: "text-emerald-600",
                  borderColor: "border-emerald-200"
                },
                {
                  icon: <ShieldCheck className="h-6 w-6" />,
                  title: "Enterprise Security",
                  desc: "Military-grade protection",
                  color: "from-violet-50 to-violet-100",
                  iconColor: "text-violet-600",
                  borderColor: "border-violet-200"
                },
                {
                  icon: <Globe className="h-6 w-6" />,
                  title: "Global Network",
                  desc: "Multi-city deployment",
                  color: "from-cyan-50 to-cyan-100",
                  iconColor: "text-cyan-600",
                  borderColor: "border-cyan-200"
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="group relative"
                >
                  <div className={`absolute -inset-0.5 bg-gradient-to-br ${feature.color} rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  <div className={`relative bg-white rounded-2xl p-5 border ${feature.borderColor} shadow-sm group-hover:shadow-lg transition-all duration-300 hover:scale-[1.02]`}>
                    <div className="flex items-start gap-4">
                      <div className={`p-3 ${feature.color} rounded-xl border ${feature.borderColor} group-hover:scale-110 transition-transform duration-300`}>
                        <div className={feature.iconColor}>
                          {feature.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                        <p className="text-sm text-gray-600">{feature.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[Users, Target, Cloud, Database].map((Icon, index) => (
                      <div key={index} className="w-8 h-8 bg-gradient-to-br from-blue-50 to-emerald-50 border-2 border-white rounded-full flex items-center justify-center">
                        <Icon className="h-4 w-4 text-gray-600" />
                      </div>
                    ))}
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">Trusted by 500+ Cities</div>
                    <div className="text-xs text-gray-500">Global deployment</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-emerald-600">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">99.9% Uptime</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Premium Login Form */}
          <div className="w-full">
            <div className="relative group" ref={formRef}>
              {/* Form Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-emerald-500/20 to-blue-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-700"></div>
              
              {/* Main Form Container */}
              <div className="relative bg-white rounded-3xl border border-gray-200 shadow-2xl shadow-blue-500/10 overflow-hidden">
                {/* Premium Header with Gradient */}
                <div className="relative bg-gradient-to-r from-blue-600 to-emerald-500 px-10 py-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5"></div>
                  <div className="relative flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        Secure Account Access
                      </h2>
                      <p className="text-blue-100/90 mt-1">
                        Sign in to your STMS dashboard
                      </p>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-xl blur"></div>
                      <div className="relative bg-white/20 backdrop-blur-sm p-3 rounded-xl border border-white/30">
                        <Shield className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Error Alert */}
                {error && (
                  <div className="mx-8 mt-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl shadow-sm">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-red-800">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Login Form */}
                <div className="px-8 py-10">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Field */}
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <span>Email Address</span>
                        </div>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-emerald-500/5 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative">
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-5 py-3.5 bg-gray-50/80 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 text-gray-900 group-hover:border-blue-400"
                            placeholder="example@yourdomain.com"
                            required
                            autoComplete="email"
                          />
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Password Field */}
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        <div className="flex items-center gap-2">
                          <Lock className="h-4 w-4 text-gray-500" />
                          <span>Password</span>
                        </div>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-emerald-500/5 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-5 py-3.5 bg-gray-50/80 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 text-gray-900 group-hover:border-blue-400"
                            placeholder="••••••••"
                            required
                            autoComplete="current-password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors p-1"
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Remember & Forgot */}
                    <div className="flex items-center justify-between">
                      <label className="flex items-center cursor-pointer group">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-blue-500/30"
                          defaultChecked
                        />
                        <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Remember this device</span>
                      </label>
                      <a
                        href="#"
                        className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        Forgot password?
                      </a>
                    </div>

                    {/* Premium Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      className="relative w-full group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-emerald-600/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                        {loading ? (
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                            <span>Authenticating...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center">
                            <LogIn className={`h-5 w-5 mr-3 transition-transform ${isHovered ? 'translate-x-1' : ''}`} />
                            <span>Secure Sign In</span>
                            <ArrowRight className={`h-5 w-5 ml-3 transition-transform ${isHovered ? 'translate-x-1' : ''}`} />
                          </div>
                        )}
                      </div>
                    </button>
                  </form>

                  {/* Divider */}
                  <div className="mt-8">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500">New to STMS?</span>
                      </div>
                    </div>
                  </div>

                  {/* Premium Sign Up Link */}
                  <div className="mt-8 text-center">
                    <Link
                      to="/signup"
                      className="inline-flex items-center px-8 py-3.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-blue-500 hover:text-blue-600 hover:shadow-lg transition-all duration-300 group"
                    >
                      <span>Create an account</span>
                      <Zap className="ml-3 h-5 w-5 transform group-hover:scale-110 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Premium Footer */}
                <div className="px-8 py-6 border-t border-gray-200 bg-gray-50/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 text-sm">
                      <span className="flex items-center gap-2 text-gray-600">
                        <Cloud className="h-4 w-4" />
                        <span>Secure Cloud</span>
                      </span>
                      <span className="flex items-center gap-2 text-gray-600">
                        <ShieldCheck className="h-4 w-4" />
                        <span>SOC 2 Compliant</span>
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      © 2024 STMS Platform v2.0
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;