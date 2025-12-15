import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, ShieldCheck, Sparkles, Lock } from 'lucide-react';

function Logout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const steps = [
      { name: 'Ending Sessions', duration: 400 },
      { name: 'Clearing Cache', duration: 400 },
      { name: 'Securing Data', duration: 400 },
      { name: 'Redirecting', duration: 400 }
    ];

    let currentStep = 0;
    const totalDuration = steps.reduce((sum, step) => sum + step.duration, 0);

    // Animate progress bar
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + (100 / (totalDuration / 50));
      });
    }, 50);

    // Animate steps
    const stepInterval = setInterval(() => {
      if (currentStep < steps.length) {
        setStep(currentStep);
        currentStep++;
      } else {
        clearInterval(stepInterval);
      }
    }, 400);

    // Countdown timer
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Perform logout after animation
    setTimeout(() => {
      logout();
      setTimeout(() => {
        navigate('/login');
      }, 500);
    }, totalDuration);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
      clearInterval(countdownInterval);
    };
  }, [logout, navigate]);

  const steps = [
    { name: 'Ending Sessions', icon: <LogOut className="h-5 w-5" /> },
    { name: 'Clearing Cache', icon: <Sparkles className="h-5 w-5" /> },
    { name: 'Securing Data', icon: <Lock className="h-5 w-5" /> },
    { name: 'Redirecting', icon: <ShieldCheck className="h-5 w-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-emerald-50/20 pt-16">
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-20 w-60 h-60 bg-emerald-300/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 sm:p-10 border border-gray-200/50 shadow-2xl shadow-blue-500/5">
            <div className="text-center mb-10">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-500 blur-xl opacity-50 rounded-full"></div>
                <div className="relative bg-gradient-to-br from-blue-600 to-emerald-500 p-4 rounded-2xl">
                  <LogOut className="h-12 w-12 text-white" />
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                Logging Out
              </h1>
              <p className="text-gray-600">
                Goodbye, <span className="font-semibold text-blue-600">{user?.name || 'User'}</span>!<br />
                Securing your session and data.
              </p>
            </div>
            <div className="space-y-8 mb-10">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Logout Progress</span>
                  <span className="text-sm font-bold text-blue-600">{Math.round(progress)}%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 transition-all duration-300 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
              <div className="space-y-4">
                {steps.map((stepItem, index) => (
                  <div 
                    key={index}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                      index === step 
                        ? 'bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-200' 
                        : index < step 
                          ? 'bg-gray-50 opacity-70' 
                          : 'bg-gray-50/50'
                    }`}
                  >
                    <div className={`flex-shrink-0 p-3 rounded-lg ${
                      index === step 
                        ? 'bg-gradient-to-br from-blue-600 to-emerald-500 text-white' 
                        : index < step 
                          ? 'bg-emerald-100 text-emerald-600' 
                          : 'bg-gray-200 text-gray-400'
                    }`}>
                      {stepItem.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{stepItem.name}</p>
                      <p className="text-sm text-gray-500">
                        {index < step ? 'Completed' : index === step ? 'In progress...' : 'Pending'}
                      </p>
                    </div>
                    <div className={`h-2 w-2 rounded-full ${
                      index === step 
                        ? 'bg-blue-600 animate-pulse' 
                        : index < step 
                          ? 'bg-emerald-500' 
                          : 'bg-gray-300'
                    }`}></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-50 to-emerald-50 rounded-full mb-4 border-2 border-blue-200">
                <div className="text-3xl font-bold text-blue-600">{countdown}</div>
              </div>
              <p className="text-gray-600">
                Redirecting to login in {countdown} second{countdown !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="text-center">
              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="inline-flex items-center px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:border-blue-400 hover:text-blue-600 transition-all duration-300 group"
              >
                Go to Login Now
                <svg
                  className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
              <p className="mt-3 text-sm text-gray-500">
                Your session has been securely terminated.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logout;