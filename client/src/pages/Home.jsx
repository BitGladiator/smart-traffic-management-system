import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, Shield, Zap, Clock, 
  TrendingUp, Users, MapPin, ArrowRight 
} from 'lucide-react';

function Home() {
  const features = [
    {
      icon: <BarChart3 className="h-8 w-8 text-primary-600" />,
      title: "Real-time Analytics",
      description: "Live traffic data and predictive insights"
    },
    {
      icon: <Shield className="h-8 w-8 text-primary-600" />,
      title: "AI Optimization",
      description: "Smart signal timing based on traffic patterns"
    },
    {
      icon: <Zap className="h-8 w-8 text-primary-600" />,
      title: "Fast Response",
      description: "Instant alerts and automated adjustments"
    },
    {
      icon: <Clock className="h-8 w-8 text-primary-600" />,
      title: "24/7 Monitoring",
      description: "Continuous surveillance and reporting"
    }
  ];

  const stats = [
    { label: "Cities Covered", value: "12", icon: <MapPin className="h-5 w-5" /> },
    { label: "Active Users", value: "500+", icon: <Users className="h-5 w-5" /> },
    { label: "Traffic Reduced", value: "40%", icon: <TrendingUp className="h-5 w-5" /> },
    { label: "Avg. Wait Time", value: "45s", icon: <Clock className="h-5 w-5" /> }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Smart Traffic Management System
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Revolutionizing urban mobility with AI-powered traffic optimization and real-time monitoring.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="btn bg-white text-primary-700 hover:bg-gray-100">
                Get Started Free
              </Link>
              <Link to="/about" className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white/10">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="flex justify-center mb-3">
                  <div className="p-2 bg-primary-50 rounded-lg">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage urban traffic efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to transform your city's traffic?
            </h2>
            <p className="text-gray-600 mb-8">
              Join hundreds of cities already using STMS to reduce congestion and improve commute times.
            </p>
            <Link to="/signup" className="btn inline-flex items-center">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;