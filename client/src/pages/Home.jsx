import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Cpu, Shield, Zap, BarChart3,
  Smartphone, Globe, Lock, CheckCircle,
  ArrowRight, MapPin, Users, Server,
  ShieldCheck, Cloud, Wifi, Settings,
  TrafficCone, Building2, Car, Network,
  ChevronDown, Sparkles, Target, LineChart,
  Database, Shield as ShieldIcon, Clock,
  AlertTriangle, BarChart2, Globe as GlobeIcon,
  Layers, Cctv, Radio
} from 'lucide-react';

function Home() {
  const heroRef = useRef(null);
  const featuresRef = useRef([]);
  const parallaxRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = parallaxRef.current;
      
      if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
      }

      // Animate features on scroll
      featuresRef.current.forEach((feature, index) => {
        if (feature) {
          const rect = feature.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight * 0.8;
          
          if (isVisible) {
            feature.style.opacity = '1';
            feature.style.transform = 'translateY(0)';
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <Cpu className="h-12 w-12 text-blue-600" />,
      title: "AI Traffic Optimization",
      description: "Advanced neural networks analyze and optimize traffic flow across entire city networks in real-time.",
      stats: "40% congestion reduction",
      color: "from-blue-500/10 to-blue-600/5",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <BarChart3 className="h-12 w-12 text-emerald-600" />,
      title: "Predictive Analytics",
      description: "Forecast traffic conditions and deploy preventive measures before congestion occurs.",
      stats: "92% prediction accuracy",
      color: "from-emerald-500/10 to-emerald-600/5",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: <Shield className="h-12 w-12 text-violet-600" />,
      title: "Enterprise Security",
      description: "Military-grade encryption ensuring complete data protection and system integrity.",
      stats: "99.9% uptime guarantee",
      color: "from-violet-500/10 to-violet-600/5",
      gradient: "from-violet-500 to-purple-500"
    },
    {
      icon: <Cloud className="h-12 w-12 text-cyan-600" />,
      title: "Cloud Infrastructure",
      description: "Global cloud deployment with automatic scaling for seamless performance.",
      stats: "Global availability",
      color: "from-cyan-500/10 to-cyan-600/5",
      gradient: "from-cyan-500 to-sky-500"
    }
  ];

  const metrics = [
    { value: "40%", label: "Reduction in Traffic Congestion", icon: <TrafficCone className="h-8 w-8" />, color: "text-blue-600" },
    { value: "25%", label: "Decrease in Commute Time", icon: <Clock className="h-8 w-8" />, color: "text-emerald-600" },
    { value: "30%", label: "Lower Vehicle Emissions", icon: <GlobeIcon className="h-8 w-8" />, color: "text-amber-600" },
    { value: "35%", label: "Faster Emergency Response", icon: <AlertTriangle className="h-8 w-8" />, color: "text-red-600" }
  ];

  const integrations = [
    { name: "Municipal Systems", icon: <Building2 className="h-6 w-6" />, color: "text-blue-600" },
    { name: "Emergency Services", icon: <ShieldCheck className="h-6 w-6" />, color: "text-red-600" },
    { name: "Public Transit", icon: <Users className="h-6 w-6" />, color: "text-emerald-600" },
    { name: "Navigation Apps", icon: <Smartphone className="h-6 w-6" />, color: "text-violet-600" },
    { name: "IoT Sensors", icon: <Wifi className="h-6 w-6" />, color: "text-cyan-600" },
    { name: "Traffic Cameras", icon: <Cctv className="h-6 w-6" />, color: "text-amber-600" }
  ];

  const AnimatedBackground = () => (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-1/4 left-1/4 animate-float-slow">
        <div className="w-64 h-64 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-30" />
      </div>
      <div className="absolute bottom-1/4 right-1/4 animate-float">
        <div className="w-96 h-96 bg-gradient-to-tr from-emerald-200 to-teal-200 rounded-full blur-3xl opacity-20" />
      </div>
      
      {/* Animated traffic lines */}
      <div className="absolute inset-0">
        <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d="M0,50 Q25,30 50,50 T100,50"
            fill="none"
            stroke="url(#gradient1)"
            strokeWidth="0.5"
            strokeDasharray="5,5"
            className="animate-traffic-flow"
          />
          <path
            d="M0,60 Q40,40 60,60 T100,60"
            fill="none"
            stroke="url(#gradient2)"
            strokeWidth="0.5"
            strokeDasharray="5,5"
            className="animate-traffic-flow-delayed"
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopColorOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );

  return (
    <div className="overflow-hidden">
      {/* Custom animations in global scope - Add to your global CSS */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-1deg); }
        }
        @keyframes traffic-flow {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -20; }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-traffic-flow { animation: traffic-flow 20s linear infinite; }
        .animate-traffic-flow-delayed { animation: traffic-flow 20s linear infinite 2s; }
        .animate-pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
      `}</style>

      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <AnimatedBackground />
        
        <div ref={parallaxRef} className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-7xl mx-auto">
            {/* Animated title with floating particles */}
            <div className="relative mb-12">
              <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl animate-pulse-glow" />
              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-xl animate-pulse-glow" style={{animationDelay: '2s'}} />
              
              <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight tracking-tighter text-center">
                <span className="block text-gray-900">
                  Smart Traffic
                </span>
                <span className="block mt-4 relative">
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 blur-2xl opacity-50" />
                  <span className="relative bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
                    Management
                  </span>
                  <Sparkles className="absolute -top-4 -right-4 h-8 w-8 text-amber-500 animate-pulse" />
                </span>
              </h1>
            </div>

            <p className="text-2xl md:text-3xl text-gray-600 max-w-4xl mx-auto text-center mb-12 leading-relaxed font-light">
              Revolutionizing urban mobility with <span className="font-semibold text-blue-600">AI-powered</span> traffic solutions for modern cities worldwide.
            </p>

            {/* Interactive CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
              <Link 
                to="/signup" 
                className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-emerald-600 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <span className="relative flex items-center justify-center">
                  Request Enterprise Demo
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </span>
              </Link>
              
              <Link 
                to="/contact" 
                className="group px-10 py-5 bg-white/80 backdrop-blur-sm text-gray-800 font-semibold rounded-xl border-2 border-gray-300/50 hover:border-blue-500 hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <span className="relative flex items-center justify-center">
                  Contact Sales Team
                  <Target className="ml-3 h-5 w-5 text-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </span>
              </Link>
            </div>

            {/* Animated metrics cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {metrics.map((metric, index) => (
                <div 
                  key={index}
                  className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-200/50 hover:border-blue-300 transition-all duration-300 hover:shadow-2xl hover:scale-105"
                >
                  <div className="flex justify-center mb-4">
                    <div className={`p-3 ${metric.color} bg-gradient-to-br from-gray-50 to-white rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                      {metric.icon}
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {metric.value}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">{metric.label}</div>
                </div>
              ))}
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="animate-bounce">
                <ChevronDown className="h-8 w-8 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with scroll animations */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Enterprise-Grade
              <span className="block mt-4">
                <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
                  Traffic Intelligence
                </span>
                <Network className="inline-block ml-4 h-12 w-12 text-cyan-500 animate-pulse" />
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive suite of tools designed for modern urban infrastructure management and optimization.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index}
                ref={el => featuresRef.current[index] = el}
                className="group opacity-0 translate-y-10 transition-all duration-700 ease-out"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative bg-white rounded-3xl p-8 border border-gray-200 hover:border-transparent transition-all duration-300 hover:shadow-2xl overflow-hidden">
                  {/* Animated background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className="relative flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className={`p-4 bg-gradient-to-br ${feature.gradient} bg-clip-text text-transparent rounded-2xl border border-gray-100 group-hover:border-${feature.gradient.split('-')[1]}-200 transition-colors`}>
                        {feature.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {feature.description}
                      </p>
                      <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-50 to-white text-gray-700 rounded-lg text-sm font-medium border border-gray-200 group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-blue-700 transition-all duration-300">
                        <LineChart className="h-4 w-4 mr-2" />
                        {feature.stats}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Seamless
              <span className="block mt-4">
                <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                  System Integration
                </span>
                <Database className="inline-block ml-4 h-12 w-12 text-emerald-500 animate-pulse" />
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built to work with existing municipal infrastructure and third-party systems for comprehensive coverage.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
            {integrations.map((integration, index) => (
              <div 
                key={index}
                className="group bg-white rounded-2xl p-6 text-center border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <div className="relative flex justify-center mb-4">
                  <div className={`p-4 ${integration.color} bg-gradient-to-br from-gray-50 to-white rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                    {integration.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {integration.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 rounded-full mb-8 border border-blue-200">
                <ShieldIcon className="h-5 w-5" />
                <span className="text-sm font-semibold">ENTERPRISE SECURITY</span>
              </div>
              
              <h2 className="text-5xl font-bold text-gray-900 mb-8">
                Military-Grade
                <span className="block mt-4 bg-gradient-to-r from-blue-600 via-violet-500 to-purple-500 bg-clip-text text-transparent">
                  Security Infrastructure
                </span>
              </h2>
              
              <div className="space-y-6">
                {[
                  "End-to-end encryption for all data transmission",
                  "Zero-trust architecture with multi-factor authentication",
                  "GDPR, CCPA, and global privacy compliance",
                  "24/7 security monitoring and threat detection",
                  "Regular penetration testing and security audits",
                  "Data sovereignty and residency controls"
                ].map((item, index) => (
                  <div key={index} className="flex items-center group">
                    <div className="flex-shrink-0 mr-4">
                      <div className="p-2 bg-gradient-to-br from-emerald-100 to-green-100 rounded-lg group-hover:scale-110 transition-transform">
                        <CheckCircle className="h-5 w-5 text-emerald-600" />
                      </div>
                    </div>
                    <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-200">
                <div className="space-y-8">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900">System Availability</h3>
                      <span className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                        99.9%
                      </span>
                    </div>
                    <div className="h-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 w-[99.9%] animate-pulse-glow" />
                    </div>
                    <div className="text-sm text-gray-500 mt-2">Enterprise SLA Guarantee</div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Compliance Certifications</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {['ISO 27001', 'SOC 2', 'GDPR', 'CCPA'].map((cert) => (
                        <div key={cert} className="group bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-5 text-center hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50 transition-all duration-300">
                          <div className="text-base font-semibold text-gray-900 group-hover:text-blue-600">
                            {cert}
                          </div>
                          <div className="text-xs text-gray-500 mt-1 group-hover:text-blue-500">
                            Certified
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-8 border-t border-gray-200">
                    <div className="text-center">
                      <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2">
                        24/7
                      </div>
                      <div className="text-gray-700 font-medium">Dedicated Enterprise Support</div>
                      <div className="text-sm text-gray-500 mt-1">Phone, Email, & On-site</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating security shield */}
              <div className="absolute -top-6 -right-6 animate-float">
                <div className="p-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-2xl">
                  <ShieldCheck className="h-10 w-10 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <AnimatedBackground />
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm rounded-full mb-10 border border-blue-200/50">
              <Radio className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-semibold text-gray-700">REAL-TIME DEPLOYMENT</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-10">
              Transform Your City's
              <span className="block mt-4">
                <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
                  Traffic Infrastructure
                </span>
              </span>
            </h2>
            
            <p className="text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Schedule a comprehensive demo with our solutions team and discover how STMS can optimize your city's traffic management.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                to="/signup" 
                className="group relative px-12 py-6 bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-bold rounded-xl hover:from-blue-700 hover:to-emerald-600 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <span className="relative flex items-center justify-center text-lg">
                  Request Enterprise Demo
                  <ArrowRight className="ml-4 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                </span>
              </Link>
              
              <Link 
                to="/contact" 
                className="group px-12 py-6 bg-white/80 backdrop-blur-sm text-gray-800 font-bold rounded-xl border-2 border-gray-300/50 hover:border-blue-500 hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <span className="relative flex items-center justify-center text-lg">
                  Download Whitepaper
                  <BarChart2 className="ml-4 h-6 w-6 text-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;