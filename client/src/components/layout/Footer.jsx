import React from 'react';
import { Link } from 'react-router-dom';
import { TrafficCone, Github, Twitter, Mail, Linkedin, MapPin, Phone, Shield } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
    { path: '/dashboard', label: 'Dashboard', auth: true },
  ];

  const resources = [
    { label: 'Documentation', href: '#' },
    { label: 'API Reference', href: '#' },
    { label: 'Case Studies', href: '#' },
    { label: 'Whitepapers', href: '#' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'GDPR Compliance', href: '#' },
  ];

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, label: 'GitHub', href: '#' },
    { icon: <Twitter className="h-5 w-5" />, label: 'Twitter', href: '#' },
    { icon: <Linkedin className="h-5 w-5" />, label: 'LinkedIn', href: '#' },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Brand & Description */}
          <div className="space-y-6">
            <Link to="/" className="inline-flex items-center space-x-3 group">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-lg group-hover:scale-105 transition-transform">
                <TrafficCone className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">STMS</div>
                <div className="text-sm text-gray-400">Smart Traffic Management System</div>
              </div>
            </Link>
            
            <p className="text-gray-400 max-w-md leading-relaxed">
              Enterprise-grade traffic intelligence platform transforming urban mobility through AI-powered optimization and real-time monitoring.
            </p>
            
            <div className="flex items-center space-x-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Platform</h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-white transition-colors text-sm hover:translate-x-1 transform inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
              <ul className="space-y-3">
                {resources.map((resource, index) => (
                  <li key={index}>
                    <a
                      href={resource.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm hover:translate-x-1 transform inline-block"
                    >
                      {resource.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Legal</h3>
              <ul className="space-y-3">
                {legalLinks.map((legal, index) => (
                  <li key={index}>
                    <a
                      href={legal.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm hover:translate-x-1 transform inline-block"
                    >
                      {legal.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Contact & Info */}
        <div className="border-t border-gray-800 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="flex items-start space-x-3">
              <Mail className="h-5 w-5 text-blue-400 mt-1" />
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-white">contact@stms.ai</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Phone className="h-5 w-5 text-emerald-400 mt-1" />
              <div>
                <p className="text-sm text-gray-400">Support</p>
                <p className="text-white">+1 (555) 123-4567</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-amber-400 mt-1" />
              <div>
                <p className="text-sm text-gray-400">Headquarters</p>
                <p className="text-white">San Francisco, CA</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Shield className="h-4 w-4" />
                <span>ISO 27001 Certified</span>
              </div>
              <div className="text-sm text-gray-400">
                Enterprise Security Compliance
              </div>
            </div>
            
            <div className="text-sm text-gray-400">
              &copy; {currentYear} STMS. All rights reserved.
            </div>
          </div>
          
          <div className="mt-4 text-center md:text-right">
            <p className="text-xs text-gray-500">
              Designed for urban planners and city administrators. Data privacy and security are our top priorities.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;