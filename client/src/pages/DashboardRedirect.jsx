import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  ShieldCheck,
  ArrowRight,
  AlertCircle,
  Loader2,
} from "lucide-react";

function DashboardRedirect() {
  const { user } = useAuth();
  const [countdown, setCountdown] = useState(5);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Simpler, more reliable redirect function
  const handleDirectRedirect = () => {
    try {
      const token = localStorage.getItem("token");
      const userData = user || JSON.parse(localStorage.getItem("user") || "{}");
      
      if (!token) {
        setError("No authentication token found. Please log in again.");
        return;
      }

      const dashboardUrl = "https://smart-traffic-management-system-bpm.vercel.app";
      

      const params = new URLSearchParams({
        token: token,
        userId: userData.id || "1",
        userName: encodeURIComponent(userData.name || "User"),
        userEmail: encodeURIComponent(userData.email || "user@stms.ai"),
        userRole: userData.role || "user",
        timestamp: Date.now().toString()
      });

      const redirectUrl = `${dashboardUrl}?${params.toString()}`;
      
      console.log("Redirecting to:", redirectUrl);
      window.location.href = redirectUrl;
      
    } catch (err) {
      console.error("Redirect failed:", err);
      setError(`Redirect failed: ${err.message}`);
      setIsRedirecting(false);
    }
  };

  useEffect(() => {
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 4;
      });
    }, 100);

    // Countdown timer
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          if (!isRedirecting) {
            setIsRedirecting(true);
            handleDirectRedirect();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(countdownInterval);
    };
  }, [user, isRedirecting]);

  const handleManualRedirect = () => {
    if (!isRedirecting) {
      setIsRedirecting(true);
      handleDirectRedirect();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-emerald-50/20 pt-16">
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-20 w-60 h-60 bg-emerald-300/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/3 w-40 h-40 bg-violet-300/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 sm:p-12 border border-gray-200/50 shadow-2xl shadow-blue-500/5">
            {error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-2xl">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-red-800">Authentication Error</p>
                    <p className="text-sm text-red-700">{error}</p>
                    <button
                      onClick={() => window.location.href = '/login'}
                      className="mt-2 text-sm font-medium text-red-800 hover:text-red-900 underline"
                    >
                      Return to Login
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="text-center mb-10">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-500 blur-xl opacity-50 rounded-full"></div>
                <div className="relative bg-gradient-to-br from-blue-600 to-emerald-500 p-4 rounded-2xl">
                  {isRedirecting ? (
                    <Loader2 className="h-12 w-12 text-white animate-spin" />
                  ) : (
                    <ShieldCheck className="h-12 w-12 text-white" />
                  )}
                </div>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {isRedirecting ? "Redirecting..." : "Access Granted"}
                <span className="block bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent mt-2">
                  Welcome to STMS Dashboard
                </span>
              </h1>

              <p className="text-lg text-gray-600 mb-6">
                Hello,{" "}
                <span className="font-semibold text-blue-600">
                  {user?.name || "User"}
                </span>
                ! Redirecting you to the analytics dashboard.
              </p>
            </div>

            <div className="mb-10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Loading progress
                </span>
                <span className="text-sm font-bold text-blue-600">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 transition-all duration-300 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              <div className="text-center mt-8">
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  {countdown}
                </div>
                <p className="text-sm text-gray-600">
                  {isRedirecting ? "Redirecting now..." : "Redirecting in seconds"}
                </p>
              </div>
            </div>

            <div className="mt-8 text-center space-y-4">
              <button
                onClick={handleManualRedirect}
                disabled={isRedirecting}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRedirecting ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                    Redirecting...
                  </>
                ) : (
                  <>
                    Go to Dashboard Now
                    <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
              
              <p className="mt-3 text-sm text-gray-500">
                {isRedirecting 
                  ? "Please wait while we redirect you..." 
                  : `Click above if you're not automatically redirected within ${countdown} seconds`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardRedirect;