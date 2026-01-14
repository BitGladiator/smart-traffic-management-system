import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  UserPlus, Mail, Lock, User, Eye, EyeOff, AlertCircle, Check,
  Shield, Zap, Sparkles, Globe, Building2, Users, ArrowRight,
  Target, BarChart3, Cloud, ShieldCheck, Cpu
} from 'lucide-react';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    organization: '',
    role: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const particlesRef = useRef([]);

  useEffect(() => {
    // Create floating particles effect
    const createParticles = () => {
      const container = document.querySelector('.particles-container');
      if (!container) return;

      particlesRef.current.forEach(particle => particle.remove());
      particlesRef.current = [];

      for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute rounded-full';
        particle.style.width = `${Math.random() * 25 + 8}px`;
        particle.style.height = particle.style.width;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animation = `float ${Math.random() * 6 + 6}s ease-in-out infinite`;
        particle.style.animationDelay = `${Math.random() * 2}s`;
        
        const gradients = [
          'from-blue-400/20 to-cyan-400/20',
          'from-emerald-400/20 to-teal-400/20',
          'from-violet-400/20 to-purple-400/20',
          'from-amber-400/20 to-orange-400/20'
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    if (formData.password.length < 8) {
      return setError('Password must be at least 8 characters long');
    }

    if (!termsAccepted) {
      return setError('Please accept the terms and conditions');
    }
  
    setLoading(true);
  
    try {
      await signup(formData, null);
      navigate('/dashboard');
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = formData.password.length > 0 ? 
    formData.password.length < 8 ? 'Weak' : 
    /[A-Z]/.test(formData.password) && /[0-9]/.test(formData.password) && /[^A-Za-z0-9]/.test(formData.password) ? 'Strong' : 'Good'
    : '';

  const getPasswordStrengthColor = () => {
    if (formData.password.length === 0) return 'bg-gray-200';
    if (formData.password.length < 8) return 'bg-red-500';
    if (passwordStrength === 'Good') return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  const getPasswordStrengthWidth = () => {
    if (formData.password.length === 0) return '0%';
    if (formData.password.length < 8) return `${(formData.password.length / 8) * 33}%`;
    if (passwordStrength === 'Good') return '66%';
    return '100%';
  };

  const TrafficFlowSVG = () => (
    <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 300" preserveAspectRatio="none">
      <defs>
        <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#10b981" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      
      <path
        d="M0,120 Q100,80 200,120 T400,120"
        fill="none"
        stroke="url(#flowGradient)"
        strokeWidth="1.5"
        strokeDasharray="8,4"
        className="animate-traffic-flow"
      />
      <path
        d="M0,180 Q150,120 300,180 T400,180"
        fill="none"
        stroke="url(#flowGradient)"
        strokeWidth="1"
        strokeDasharray="8,4"
        className="animate-traffic-flow-delayed"
      />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/60 via-white to-emerald-50/60 pt-16 overflow-hidden">
      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(0.5deg); }
        }
        @keyframes traffic-flow {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -12; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes progress-pulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        .animate-traffic-flow { animation: traffic-flow 12s linear infinite; }
        .animate-traffic-flow-delayed { animation: traffic-flow 12s linear infinite 2s; }
        .animate-progress-pulse { animation: progress-pulse 2s ease-in-out infinite; }
      `}</style>

      {/* Background Elements */}
      <div className="particles-container fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <TrafficFlowSVG />
        
        {/* Gradient orbs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-200/40 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-emerald-200/40 to-transparent rounded-full blur-3xl"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-blue-100/30 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]" />
      </div>

      <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Premium Intro */}
          <div className="hidden lg:block space-y-12">
            {/* Premium Header */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="inline-flex items-center gap-4 mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-2xl blur-lg opacity-30"></div>
                    <div className="relative bg-gradient-to-br from-white to-gray-50 p-3 rounded-2xl border border-gray-200 shadow-lg">
                      <Sparkles className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Join the Platform</span>
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-emerald-600 to-blue-600 bg-clip-text text-transparent">
                      STMS 
                    </h1>
                  </div>
                </div>
                
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Transform Urban Mobility
                  <span className="block mt-2 text-transparent bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text">
                    With Advanced Intelligence
                  </span>
                </h2>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Join thousands of urban planners, traffic engineers, and city officials 
                  who use STMS to optimize transportation networks and improve urban mobility.
                </p>
              </div>
            </div>

            {/* Premium Feature Grid */}
            <div className="grid grid-cols-1 gap-6">
              {[
                {
                  icon: <Cpu className="h-5 w-5" />,
                  title: "AI-Powered Optimization",
                  desc: "Advanced neural networks for traffic flow prediction",
                  color: "from-blue-50 to-blue-100",
                  iconColor: "text-blue-600"
                },
                {
                  icon: <BarChart3 className="h-5 w-5" />,
                  title: "Real-time Analytics",
                  desc: "Comprehensive dashboards with live data visualization",
                  color: "from-emerald-50 to-emerald-100",
                  iconColor: "text-emerald-600"
                },
                {
                  icon: <ShieldCheck className="h-5 w-5" />,
                  title: "Security",
                  desc: "SOC 2 compliant with military-grade encryption",
                  color: "from-violet-50 to-violet-100",
                  iconColor: "text-violet-600"
                },
                {
                  icon: <Globe className="h-5 w-5" />,
                  title: "Global Deployment",
                  desc: "Support for multi-city and regional implementations",
                  color: "from-cyan-50 to-cyan-100",
                  iconColor: "text-cyan-600"
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="group relative"
                >
                  <div className={`absolute -inset-0.5 bg-gradient-to-br ${feature.color} rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  <div className="relative bg-white rounded-2xl p-5 border border-gray-200 shadow-sm group-hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 ${feature.color} rounded-xl border border-gray-200`}>
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
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[Users, Building2, Target, Cloud].map((Icon, index) => (
                      <div key={index} className="w-8 h-8 bg-gradient-to-br from-blue-50 to-emerald-50 border-2 border-white rounded-full flex items-center justify-center shadow-sm">
                        <Icon className="h-4 w-4 text-gray-600" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Trusted by 500+ Cities</div>
                    <div className="text-xs text-gray-500">Global network</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-emerald-600">
                  <Shield className="h-5 w-5" />
                  <span className="text-sm font-medium">Production Ready</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Premium Signup Form */}
          <div className="w-full">
            <div className="relative group">
              {/* Form Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 via-emerald-500/10 to-blue-500/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-700"></div>
              
              {/* Main Form Container */}
              <div className="relative bg-white rounded-3xl border border-gray-200 shadow-2xl shadow-blue-500/10 overflow-hidden">
                {/* Premium Header */}
                <div className="relative bg-gradient-to-r from-blue-600 to-emerald-500 px-10 py-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5"></div>
                  <div className="relative flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        Create SMTS Account
                      </h2>
                      <p className="text-blue-100/90 mt-1">
                        Join the STMS platform in minutes
                      </p>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-xl blur"></div>
                      <div className="relative bg-white/20 backdrop-blur-sm p-3 rounded-xl border border-white/30">
                        <UserPlus className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Steps */}
              

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

                {/* Signup Form */}
                <div className="px-8 py-10">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="group">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-gray-500" />
                              <span>Full Name *</span>
                            </div>
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-5 py-3.5 bg-gray-50/80 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 text-gray-900 group-hover:border-blue-400"
                            placeholder="John Smith"
                            required
                          />
                        </div>

                        <div className="group">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-gray-500" />
                              <span>Email Address *</span>
                            </div>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-5 py-3.5 bg-gray-50/80 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 text-gray-900 group-hover:border-blue-400"
                            placeholder="john.smith@example.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="group">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <div className="flex items-center gap-2">
                              <Building2 className="h-4 w-4 text-gray-500" />
                              <span>Organization</span>
                            </div>
                          </label>
                          <input
                            type="text"
                            name="organization"
                            value={formData.organization}
                            onChange={handleChange}
                            className="w-full px-5 py-3.5 bg-gray-50/80 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 text-gray-900 group-hover:border-blue-400"
                            placeholder="City Municipality"
                          />
                        </div>

                        <div className="group">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <div className="flex items-center gap-2">
                              <Target className="h-4 w-4 text-gray-500" />
                              <span>Role</span>
                            </div>
                          </label>
                          <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full px-5 py-3.5 bg-gray-50/80 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition-all text-gray-900 group-hover:border-blue-400"
                          >
                            <option value="">Select your role</option>
                            <option value="traffic-engineer">Traffic Engineer</option>
                            <option value="urban-planner">Urban Planner</option>
                            <option value="city-official">City Official</option>
                            <option value="consultant">Consultant</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Password Section */}
                    <div className="space-y-6 pt-4">
                      <div className="group">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <div className="flex items-center gap-2">
                            <Lock className="h-4 w-4 text-gray-500" />
                            <span>Password *</span>
                          </div>
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-5 py-3.5 bg-gray-50/80 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 text-gray-900 group-hover:border-blue-400 pr-12"
                            placeholder="Minimum 8 characters"
                            required
                            minLength={8}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors p-1"
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                        
                        {formData.password.length > 0 && (
                          <div className="mt-4 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-600">Password Strength</span>
                              <span className={`text-sm font-medium ${
                                passwordStrength === 'Weak' ? 'text-red-600' :
                                passwordStrength === 'Good' ? 'text-amber-600' : 'text-emerald-600'
                              }`}>
                                {passwordStrength}
                              </span>
                            </div>
                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${getPasswordStrengthColor()} transition-all duration-500`}
                                style={{ width: getPasswordStrengthWidth() }}
                              ></div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${
                                  formData.password.length >= 8 ? 'bg-emerald-500' : 'bg-gray-300'
                                }`}></div>
                                <span className="text-xs text-gray-600">8+ characters</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${
                                  /[A-Z]/.test(formData.password) ? 'bg-emerald-500' : 'bg-gray-300'
                                }`}></div>
                                <span className="text-xs text-gray-600">Uppercase letter</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${
                                  /[0-9]/.test(formData.password) ? 'bg-emerald-500' : 'bg-gray-300'
                                }`}></div>
                                <span className="text-xs text-gray-600">Number</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${
                                  /[^A-Za-z0-9]/.test(formData.password) ? 'bg-emerald-500' : 'bg-gray-300'
                                }`}></div>
                                <span className="text-xs text-gray-600">Special character</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="group">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-gray-500" />
                            <span>Confirm Password *</span>
                          </div>
                        </label>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-5 py-3.5 bg-gray-50/80 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 text-gray-900 group-hover:border-blue-400 pr-12"
                            placeholder="Re-enter your password"
                            required
                            minLength={8}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors p-1"
                          >
                            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                        
                        {formData.password && formData.confirmPassword && (
                          <div className="mt-3 flex items-center gap-2">
                            {formData.password === formData.confirmPassword ? (
                              <>
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                <span className="text-sm text-emerald-600 font-medium">Passwords match</span>
                              </>
                            ) : (
                              <>
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                                <span className="text-sm text-red-600 font-medium">Passwords do not match</span>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Terms Agreement */}
                    <div className="pt-4">
                      <label className="flex items-start space-x-3 cursor-pointer group">
                        <div className="flex items-center h-5 mt-0.5">
                          <input
                            type="checkbox"
                            checked={termsAccepted}
                            onChange={(e) => setTermsAccepted(e.target.checked)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer group-hover:border-blue-400 transition-colors"
                            required
                          />
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="font-medium text-gray-900">I agree to the STMS Platform </span>
                          <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Terms of Service</a>
                          <span className="font-medium text-gray-900"> and </span>
                          <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Privacy Policy</a>
                          <span className="font-medium text-gray-900">. I understand that STMS is an platform for professional use.</span>
                        </div>
                      </label>
                    </div>

                    {/* Premium Submit Button */}
                    <button
                      type="submit"
                      disabled={loading || !termsAccepted}
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
                            <span>Creating Your Account...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center">
                            <UserPlus className={`h-5 w-5 mr-3 transition-transform ${isHovered ? 'translate-x-1' : ''}`} />
                            <span>Create Your Account</span>
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
                        <span className="px-4 bg-white text-gray-500">Already have an account?</span>
                      </div>
                    </div>
                  </div>

                  {/* Sign In Link */}
                  <div className="mt-8 text-center">
                    <Link
                      to="/login"
                      className="inline-flex items-center px-8 py-3.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-blue-500 hover:text-blue-600 hover:shadow-lg transition-all duration-300 group"
                    >
                      <span>Sign in to your account</span>
                      <Zap className="ml-3 h-5 w-5 transform group-hover:scale-110 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Premium Footer */}
                <div className="px-8 py-6 border-t border-gray-200 bg-gray-50/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 text-sm">
                      <span className="flex items-center gap-2 text-gray-600">
                        <ShieldCheck className="h-4 w-4" />
                        <span>SOC 2 Compliant</span>
                      </span>
                      <span className="flex items-center gap-2 text-gray-600">
                        <Cloud className="h-4 w-4" />
                        <span>Secure Cloud</span>
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

export default Signup;