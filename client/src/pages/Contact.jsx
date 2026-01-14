import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Building2, Clock, Globe, MessageSquare, Users, Shield } from 'lucide-react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setSubmitted(true);
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <Mail className="h-8 w-8" />,
      title: "Sales Inquiries",
      value: "sales@stms.ai",
      link: "mailto:sales@stms.ai",
      description: "For enterprise pricing and demos",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "Technical Support",
      value: "support@stms.ai",
      link: "mailto:support@stms.ai",
      description: "24/7 technical assistance",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      icon: <Phone className="h-8 w-8" />,
      title: "Phone",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567",
      description: "Mon-Fri, 9AM-6PM EST",
      color: "from-violet-500 to-violet-600"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Partnerships",
      value: "partners@stms.ai",
      link: "mailto:partners@stms.ai",
      description: "Strategic partnerships",
      color: "from-amber-500 to-amber-600"
    }
  ];

  const locations = [
    {
      icon: <Building2 className="h-6 w-6" />,
      city: "San Francisco",
      address: "123 Innovation Drive",
      details: "Headquarters",
      color: "bg-blue-50 text-blue-700"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      city: "Singapore",
      address: "456 Marina Bay",
      details: "APAC Regional Office",
      color: "bg-emerald-50 text-emerald-700"
    },
    {
      icon: <Building2 className="h-6 w-6" />,
      city: "London",
      address: "789 Tech Square",
      details: "EMEA Regional Office",
      color: "bg-violet-50 text-violet-700"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl mx-auto text-center">
            
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Let's Transform
              <span className="block bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent mt-2">
                Urban Mobility Together
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              Get in touch with our expert team to discuss how STMS can optimize your city's traffic flow and create smarter urban environments.
            </p>
          </div>
        </div>
      </section>
      <section className="py-8 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="space-y-8">

              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.link}
                    className="group block bg-white rounded-2xl p-6 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 p-3 rounded-xl bg-gradient-to-br ${info.color} text-white`}>
                        {info.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {info.title}
                          </h3>
                          <div className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all">
                            <Send className="h-4 w-4 text-blue-500" />
                          </div>
                        </div>
                        <p className="text-gray-900 font-medium mt-1 mb-2">{info.value}</p>
                        <p className="text-sm text-gray-600">{info.description}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-emerald-500 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-6 w-6" />
                  <h3 className="text-xl font-bold">Fast Response Guarantee</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <div className="text-2xl font-bold mb-1">≤ 24 hours</div>
                    <p className="text-white/80 text-sm">Initial response time</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <div className="text-2xl font-bold mb-1">1-2 hours</div>
                    <p className="text-white/80 text-sm">Priority enterprise support</p>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-white/20">
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4" />
                    <span>Enterprise-grade SLA included</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg h-full">
                {submitted ? (
                  <div className="text-center py-16 px-4">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-emerald-100 to-green-100 rounded-full mb-8">
                      <CheckCircle className="h-12 w-12 text-emerald-600" />
                    </div>
                    
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      Message Received!
                    </h3>
                    
                    <p className="text-lg text-gray-600 mb-10 max-w-md mx-auto leading-relaxed">
                      Thank you for contacting STMS. Our team will review your inquiry and get back to you within 24 hours.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                        onClick={() => setSubmitted(false)}
                        className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-emerald-600 transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        Send Another Message
                      </button>
                      <a
                        href="/"
                        className="px-8 py-3.5 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-blue-400 hover:text-blue-600 transition-all duration-300"
                      >
                        Return Home
                      </a>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <h2 className="text-3xl font-bold text-gray-900 mb-3">
                        Send us a Message
                      </h2>
                      <p className="text-gray-600">
                        Fill out the form below and our team will reach out to discuss your requirements.
                      </p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
                            placeholder="John Smith"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
                            placeholder="john@company.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Company/Organization
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
                          placeholder="City Municipality / Transportation Dept."
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Subject *
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
                          placeholder="What would you like to discuss?"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Message *
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows="5"
                          className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none placeholder:text-gray-400"
                          placeholder="Tell us about your traffic management challenges and requirements..."
                          required
                        />
                      </div>

                      <div className="pt-4">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="group w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-emerald-600 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl active:scale-[0.99]"
                        >
                          {isSubmitting ? (
                            <div className="flex items-center justify-center">
                              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                              Sending Message...
                            </div>
                          ) : (
                            <div className="flex items-center justify-center">
                              <Send className="h-5 w-5 mr-3 group-hover:translate-x-1 transition-transform" />
                              Send Message
                            </div>
                          )}
                        </button>
                        
                        <p className="text-center text-gray-500 text-sm mt-4">
                          By submitting this form, you agree to our Privacy Policy and Terms of Service.
                        </p>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Global Presence
              </h2>
              <p className="text-gray-600">
                Serving cities worldwide with local expertise
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {locations.map((location, index) => (
                <div key={index} className={`rounded-2xl p-6 ${location.color} bg-opacity-10 border border-current border-opacity-20`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg ${location.color.replace('text', 'bg').replace('700', '100')}`}>
                      {location.icon}
                    </div>
                    <h3 className="text-xl font-bold">{location.city}</h3>
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium">{location.address}</p>
                    <p className="text-sm opacity-75">{location.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common questions about our platform and implementation process
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  q: "What cities are currently using STMS?",
                  a: "We serve major cities worldwide including Singapore, London, Dubai, and San Francisco with proven results in traffic optimization."
                },
                {
                  q: "How long does implementation typically take?",
                  a: "Enterprise deployments typically take 3-6 months with minimal disruption to existing infrastructure."
                },
                {
                  q: "Do you offer custom solutions?",
                  a: "Yes, we provide fully tailored solutions based on specific urban requirements, traffic patterns, and infrastructure constraints."
                },
                {
                  q: "What kind of support do you provide?",
                  a: "24/7 enterprise support with dedicated account managers, technical teams, and on-site assistance when needed."
                },
                {
                  q: "Is there integration with existing systems?",
                  a: "Yes, our platform is designed to integrate seamlessly with existing traffic management systems and IoT infrastructure."
                },
                {
                  q: "What are the typical ROI metrics?",
                  a: "Cities typically see 30-40% reduction in congestion and 20-30% improvement in emergency response times within the first year."
                }
              ].map((faq, index) => (
                <div 
                  key={index} 
                  className="group bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                      <span className="text-blue-600 font-semibold">Q{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {faq.q}
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;