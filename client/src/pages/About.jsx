import React from 'react';
import { 
  Target, Users, Globe, Award, 
  TrendingUp, Shield, Cpu, Clock,
  BarChart3, MapPin, Zap, Building2
} from 'lucide-react';

function About() {
  const values = [
    {
      icon: <Target className="h-10 w-10 text-blue-600" />,
      title: "Our Mission",
      description: "Revolutionize urban mobility through intelligent traffic management that prioritizes efficiency, safety, and sustainability.",
      gradient: "from-blue-50 to-blue-100"
    },
    {
      icon: <Users className="h-10 w-10 text-emerald-600" />,
      title: "Our Team",
      description: "Multidisciplinary experts in AI, urban planning, and transportation engineering working collaboratively.",
      gradient: "from-emerald-50 to-emerald-100"
    },
    {
      icon: <Globe className="h-10 w-10 text-cyan-600" />,
      title: "Global Impact",
      description: "Deployed across major cities worldwide, transforming urban mobility on a global scale.",
      gradient: "from-cyan-50 to-cyan-100"
    },
    {
      icon: <Award className="h-10 w-10 text-violet-600" />,
      title: "Excellence",
      description: "Committed to delivering enterprise-grade solutions with uncompromising quality and support.",
      gradient: "from-violet-50 to-violet-100"
    }
  ];

  const milestones = [
    { year: "2024", event: "Founded as a hackathon project", icon: <Zap className="h-6 w-6" /> },
    { year: "2025", event: "First city deployment in Singapore", icon: <MapPin className="h-6 w-6" /> },
    { year: "2026", event: "Expanded to 12 global cities", icon: <Globe className="h-6 w-6" /> },
    { year: "2027", event: "Enterprise platform launch", icon: <Building2 className="h-6 w-6" /> },
  ];

  const achievements = [
    { metric: "40%", label: "Average congestion reduction", icon: <TrendingUp className="h-8 w-8" /> },
    { metric: "25%", label: "Commute time decrease", icon: <Clock className="h-8 w-8" /> },
    { metric: "99.9%", label: "System uptime", icon: <Shield className="h-8 w-8" /> },
    { metric: "92%", label: "Prediction accuracy", icon: <BarChart3 className="h-8 w-8" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-emerald-500/5"></div>
        <div className="container relative mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Building Smarter
              <span className="block bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent mt-2">
                Urban Futures
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
              STMS leads the transformation of urban mobility through AI-powered traffic management, 
              creating more efficient, safer, and sustainable cities for everyone.
            </p>
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-50 to-emerald-50 rounded-lg">
                    <div className="text-blue-600">
                      {achievement.icon}
                    </div>
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{achievement.metric}</div>
                <div className="text-sm text-gray-600">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-10 border border-gray-200 shadow-xl">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-full mb-6">
                  <Target className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">OUR CORE PURPOSE</span>
                </div>
                
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Transforming Urban Mobility
                  <span className="block text-2xl text-gray-600 font-normal mt-4">
                    One intersection at a time
                  </span>
                </h2>
                
                <p className="text-lg text-gray-700 leading-relaxed">
                  STMS was founded with a singular vision: to harness cutting-edge technology 
                  for creating cities where traffic flows seamlessly, emissions are reduced, 
                  and every commute is safer and more efficient. We believe in using AI not 
                  just as a tool, but as a transformative force for urban environments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our Guiding
              <span className="block bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent mt-2">
                Principles
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The foundation upon which we build smarter transportation solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-2xl"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className={`p-4 bg-gradient-to-br ${value.gradient} rounded-xl`}>
                      {value.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our Journey
              <span className="block text-xl text-gray-600 font-normal mt-4">
                From concept to global impact
              </span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500 to-emerald-500"></div>
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div 
                    key={index}
                    className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-16 text-right' : 'pl-16'}`}>
                      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="p-2 bg-gradient-to-br from-blue-50 to-emerald-50 rounded-lg">
                            <div className="text-blue-600">
                              {milestone.icon}
                            </div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-gray-900">{milestone.year}</div>
                          </div>
                        </div>
                        <p className="text-gray-700">{milestone.event}</p>
                      </div>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-10 shadow-xl border border-gray-200">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full mb-6">
                  <Cpu className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">INNOVATION STORY</span>
                </div>
                
                <h2 className="text-4xl font-bold text-gray-900 mb-8">
                  Pioneering Urban
                  <span className="block bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent mt-2">
                    Intelligence
                  </span>
                </h2>
              </div>
              
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  What began as a visionary hackathon project in 2024 has evolved into 
                  a comprehensive enterprise platform serving cities across the globe. 
                  Our journey started with a simple question: How can technology make 
                  cities work better for people?
                </p>
                
                <p>
                  From our first prototype that reduced wait times at a single intersection 
                  to today's city-wide deployments managing thousands of vehicles, our 
                  commitment has remained the same: use technology to solve real urban 
                  challenges.
                </p>
                
                <p>
                  Today, STMS stands at the forefront of urban mobility innovation. 
                  Our platform processes millions of data points daily, using advanced 
                  AI to predict traffic patterns, optimize signal timing, and reduce 
                  congestion before it happens. We're not just managing traffic—we're 
                  building the foundation for smarter, more sustainable cities.
                </p>
                
                <div className="pt-8 border-t border-gray-200 mt-8">
                  <p className="text-lg font-medium text-gray-900">
                    "The future of urban mobility isn't about more roads—it's about 
                    smarter systems that work together seamlessly."
                  </p>
                  <div className="mt-4 text-gray-600">— STMS Leadership Team</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;