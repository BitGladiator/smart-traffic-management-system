import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Welcome to STMS Assistant. I specialize in Smart Traffic Management System queries. How may I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messageQueue, setMessageQueue] = useState([]);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 100)}px`;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputValue]);

  useEffect(() => {
    if (messageQueue.length > 0 && !isTyping) {
      processMessageQueue();
    }
  }, [messageQueue, isTyping]);

  const knowledgeBase = {
    features: {
      patterns: ['feature', 'capabilit', 'what can', 'offer', 'provide', 'include'],
      response: "STMS provides comprehensive traffic management solutions:\n\n- AI-driven traffic optimization algorithms\n- Real-time monitoring and analytics dashboard\n- Predictive congestion modeling\n- Emergency vehicle priority routing\n- Intersection signal optimization\n- Public transit integration\n- Environmental impact monitoring\n\nSpecific feature inquiries are welcome."
    },
    pricing: {
      patterns: ['price', 'cost', 'pricing', 'subscription', 'license', 'fee'],
      response: "STMS utilizes enterprise pricing models based on:\n\n- Municipal scale and infrastructure\n- Integration complexity requirements\n- Support and maintenance levels\n- Custom development needs\n- Historical data processing volume\n\nDetailed proposals are available upon consultation."
    },
    technical: {
      patterns: ['technical', 'specification', 'requirement', 'infrastructure', 'hardware', 'api'],
      response: "Technical specifications for STMS:\n\n- Cloud-native architecture with edge computing\n- RESTful API integration capabilities\n- Supports standard traffic protocols (NTCIP, ITS)\n- Real-time data processing latency < 100ms\n- 99.9% system availability guarantee\n- Scalable from single intersection to metropolitan deployment\n- Multi-vendor hardware compatibility"
    },
    deployment: {
      patterns: ['deploy', 'implement', 'installation', 'timeline', 'setup'],
      response: "Standard deployment process:\n\n1. Infrastructure assessment and planning\n2. Sensor and camera installation\n3. Network configuration and testing\n4. System integration and calibration\n5. Staff training and certification\n6. Phased rollout and optimization\n\nTypical deployment timeframe: 8-12 weeks for municipal implementation."
    },
    analytics: {
      patterns: ['analytics', 'data', 'report', 'metric', 'kpi', 'dashboard'],
      response: "STMS analytics capabilities:\n\n- Real-time traffic flow visualization\n- Historical trend analysis and reporting\n- Congestion prediction accuracy: 92%\n- Custom KPI dashboard configuration\n- Automated incident detection and alerting\n- Environmental impact metrics\n- Performance benchmarking across regions\n\nReports are exportable in multiple formats."
    },
    security: {
      patterns: ['security', 'secure', 'encryption', 'compliance', 'gdpr', 'privacy'],
      response: "Security and compliance measures:\n\n- End-to-end AES-256 encryption\n- Zero-trust network architecture\n- SOC 2 Type II certified\n- GDPR and CCPA compliant\n- Regular third-party security audits\n- Role-based access control system\n- Complete audit trail logging\n- Data anonymization for privacy protection"
    },
    support: {
      patterns: ['support', 'help', 'contact', 'assistance', 'maintenance', 'service'],
      response: "Support and maintenance offerings:\n\n- 24/7 technical support with <15 min response time\n- Dedicated account management team\n- Regular system updates and patches\n- On-site maintenance available\n- Comprehensive documentation portal\n- Training and certification programs\n- Quarterly performance reviews\n- Emergency incident response team"
    }
  };

  const naturalLanguageProcessor = (input) => {
    const normalized = input.toLowerCase().trim();
    
    const categoryMatches = Object.entries(knowledgeBase).map(([category, data]) => {
      const matchCount = data.patterns.filter(pattern => normalized.includes(pattern)).length;
      return { category, matchCount };
    }).filter(item => item.matchCount > 0);

    if (categoryMatches.length > 0) {
      const bestMatch = categoryMatches.reduce((prev, current) => 
        prev.matchCount > current.matchCount ? prev : current
      );
      return knowledgeBase[bestMatch.category].response;
    }

    const fallbackResponses = [
      "I can provide detailed information about STMS features, technical specifications, pricing models, deployment processes, analytics capabilities, security protocols, and support services. Please specify your area of interest.",
      "The Smart Traffic Management System offers comprehensive solutions for urban mobility challenges. Could you clarify which aspect you'd like to explore?",
      "For precise information, please inquire about specific topics such as system features, implementation requirements, or analytical capabilities."
    ];

    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  };

  const processMessageQueue = async () => {
    if (messageQueue.length === 0 || isTyping) return;

    const nextMessage = messageQueue[0];
    setIsTyping(true);

    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));

    const botResponse = {
      id: messages.length + 2,
      text: naturalLanguageProcessor(nextMessage.text),
      sender: 'bot',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botResponse]);
    setMessageQueue(prev => prev.slice(1));
    setIsTyping(false);
  };

  const handleSend = () => {
    const trimmedValue = inputValue.trim();
    if (!trimmedValue || isTyping) return;

    const userMessage = {
      id: messages.length + 1,
      text: trimmedValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setMessageQueue(prev => [...prev, userMessage]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestedQueries = [
    "STMS technical specifications",
    "Deployment process timeline",
    "Analytics and reporting features",
    "Security compliance details"
  ];

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setTimeout(() => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.focus();
      }
    }, 10);
  };

  const resetTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-blue-600 to-emerald-500 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
          aria-label="Open chat interface"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-300">
          <div className="bg-gradient-to-r from-blue-600 to-emerald-500 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/10 rounded-lg">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">STMS Assistant</h3>
                <p className="text-xs text-white/90">Intelligent Traffic Management</p>
              </div>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                resetTextareaHeight();
              }}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Close chat interface"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === 'user' 
                      ? 'bg-blue-100' 
                      : 'bg-gradient-to-br from-blue-600 to-emerald-500'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="h-4 w-4 text-blue-600" />
                    ) : (
                      <Bot className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div>
                    <div className={`rounded-2xl px-4 py-3 ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-emerald-500 text-white'
                        : 'bg-white border border-gray-200 text-gray-800'
                    }`}>
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 px-2">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {messages.length <= 1 && (
            <div className="px-4 py-3 bg-white border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">Suggested inquiries:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQueries.map((query, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(query)}
                    className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors duration-200"
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex items-end space-x-2">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Enter your query..."
                rows="1"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none overflow-hidden transition-all duration-200"
                style={{ minHeight: '44px' }}
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping}
                className="p-3 bg-gradient-to-r from-blue-600 to-emerald-500 text-white rounded-xl hover:from-blue-700 hover:to-emerald-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Send message"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              Enter to send • Shift + Enter for line break
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;