import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Cpu, Shield, Zap, BarChart3,
  Smartphone, Globe, Lock, CheckCircle,
  ArrowRight, MapPin, Users, Server,
  ShieldCheck, Cloud, Wifi, Settings,
  TrafficCone, Building2, Car
} from 'lucide-react';

function Home() {
  const features = [
    {
      icon: <Cpu className="h-12 w-12 text-blue-600" />,
      title: "AI Traffic Optimization",
      description: "Advanced neural networks analyze and optimize traffic flow across entire city networks in real-time.",
      stats: "40% congestion reduction",
      color: "from-blue-50 to-blue-100"
    },
    {
      icon: <BarChart3 className="h-12 w-12 text-emerald-600" />,
      title: "Predictive Analytics",
      description: "Forecast traffic conditions and deploy preventive measures before congestion occurs.",
      stats: "92% prediction accuracy",
      color: "from-emerald-50 to-emerald-100"
    },
    {
      icon: <Shield className="h-12 w-12 text-violet-600" />,
      title: "Enterprise Security",
      description: "Military-grade encryption ensuring complete data protection and system integrity.",
      stats: "99.9% uptime guarantee",
      color: "from-violet-50 to-violet-100"
    },
    {
      icon: <Cloud className="h-12 w-12 text-cyan-600" />,
      title: "Cloud Infrastructure",
      description: "Global cloud deployment with automatic scaling for seamless performance.",
      stats: "Global availability",
      color: "from-cyan-50 to-cyan-100"
    }
  ];

  const metrics = [
    { value: "40%", label: "Reduction in Traffic Congestion", icon: <TrafficCone className="h-8 w-8 text-blue-600" /> },
    { value: "25%", label: "Decrease in Commute Time", icon: <Car className="h-8 w-8 text-emerald-600" /> },
    { value: "30%", label: "Lower Vehicle Emissions", icon: <Globe className="h-8 w-8 text-amber-600" /> },
    { value: "35%", label: "Faster Emergency Response", icon: <ShieldCheck className="h-8 w-8 text-red-600" /> }
  ];

  const integrations = [
    { name: "Municipal Systems", icon: <Building2 className="h-6 w-6 text-blue-600" /> },
    { name: "Emergency Services", icon: <ShieldCheck className="h-6 w-6 text-red-600" /> },
    { name: "Public Transit", icon: <Users className="h-6 w-6 text-emerald-600" /> },
    { name: "Navigation Apps", icon: <Smartphone className="h-6 w-6 text-violet-600" /> },
    { name: "IoT Sensors", icon: <Wifi className="h-6 w-6 text-cyan-600" /> },
    { name: "Weather Data", icon: <Cloud className="h-6 w-6 text-sky-600" /> }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen flex items-center">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full opacity-50 -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-emerald-100 to-teal-100 rounded-full opacity-50 -translate-x-48 translate-y-48"></div>
        
        <div className="container relative mx-auto px-4 py-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              {/* <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full mb-8 border border-blue-200">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">ENTERPRISE TRAFFIC INTELLIGENCE</span>
              </div> */}
              
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight text-gray-900">
                Smart Traffic
                <span className="block mt-2 bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
                  Management System
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
                Advanced AI-driven solutions for modern cities. Reduce congestion, improve safety, and optimize urban mobility with enterprise-level traffic management systems.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/signup" 
                  className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-emerald-600 transition-all duration-300 hover:shadow-xl shadow-lg shadow-blue-500/25"
                >
                  Request Enterprise Demo
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </Link>
                
                <Link 
                  to="/contact" 
                  className="group inline-flex items-center justify-center px-8 py-4 bg-white text-gray-800 font-semibold rounded-xl border-2 border-gray-300 hover:border-blue-500 hover:shadow-lg transition-all duration-300"
                >
                  Contact Sales Team
                </Link>
              </div>
            </div>
            
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {metrics.map((metric, index) => (
                <div key={index} className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      {metric.icon}
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</div>
                  <div className="text-sm text-gray-600">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-16 bg-white border-t border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-gray-500 text-sm uppercase tracking-wider mb-2">TRUSTED BY GLOBAL CITIES</p>
            <h3 className="text-2xl font-bold text-gray-900">Worldwide Deployment Network</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {['NEW YORK', 'LONDON', 'TOKYO', 'SINGAPORE', 'DUBAI', 'SYDNEY'].map((city) => (
              <div key={city} className="text-center">
                <div className="text-xl font-bold text-gray-900 mb-1">{city}</div>
                <div className="text-xs text-gray-500 uppercase">Metropolitan</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Enterprise-Grade
              <span className="block bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent mt-2">
                Traffic Intelligence
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
                className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-2xl"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className={`p-4 bg-gradient-to-br ${feature.color} rounded-xl`}>
                      {feature.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
                    <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-100">
                      {feature.stats}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Seamless System
              <span className="block bg-gradient-to-r from-emerald-600 to-cyan-500 bg-clip-text text-transparent mt-2">
                Integration
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built to work with existing municipal infrastructure and third-party systems for comprehensive coverage.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-4xl mx-auto">
            {integrations.map((integration, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-xl p-6 text-center border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                    {integration.icon}
                  </div>
                </div>
                <div className="font-medium text-gray-900">{integration.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-6">
                <Lock className="h-4 w-4" />
                <span className="text-sm font-medium">ENTERPRISE SECURITY</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Military-Grade
                <span className="block bg-gradient-to-r from-blue-600 to-violet-500 bg-clip-text text-transparent mt-2">
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
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-emerald-500 mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
              <div className="space-y-8">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">System Availability</h3>
                    <span className="text-emerald-600 font-bold">99.9%</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 w-3/4"></div>
                  </div>
                  <div className="text-sm text-gray-500 mt-2">Enterprise SLA Guarantee</div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Compliance Certifications</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {['ISO 27001', 'SOC 2', 'GDPR', 'CCPA'].map((cert) => (
                      <div key={cert} className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center hover:bg-blue-50 transition-colors">
                        <div className="text-sm font-medium text-gray-900">{cert}</div>
                        <div className="text-xs text-gray-500 mt-1">Certified</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-8 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
                    <div className="text-gray-600">Dedicated Enterprise Support</div>
                    <div className="text-sm text-gray-500 mt-1">Phone, Email, & On-site</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-blue-50 via-white to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full mb-8 border border-blue-200">
              <Server className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">ENTERPRISE READY</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Transform Your City's
              <span className="block bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent mt-2">
                Traffic Infrastructure
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Schedule a comprehensive demo with our solutions team and discover how STMS can optimize your city's traffic management systems.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/signup" 
                className="group inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-bold rounded-xl hover:from-blue-700 hover:to-emerald-600 transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                Request Enterprise Demo
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
              </Link>
              
              <Link 
                to="/contact" 
                className="group inline-flex items-center justify-center px-10 py-5 bg-white text-gray-800 font-bold rounded-xl border-2 border-gray-300 hover:border-blue-500 hover:shadow-xl transition-all duration-300"
              >
                Download Technical Whitepaper
              </Link>
            </div>
            
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-2">24/7</div>
                  <div className="text-sm text-gray-600">Enterprise Support</div>
                  <div className="text-xs text-gray-500">Global coverage</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-2">99.9%</div>
                  <div className="text-sm text-gray-600">Uptime SLA</div>
                  <div className="text-xs text-gray-500">Enterprise guarantee</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-2">Global</div>
                  <div className="text-sm text-gray-600">Data Centers</div>
                  <div className="text-xs text-gray-500">Multi-region deployment</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;