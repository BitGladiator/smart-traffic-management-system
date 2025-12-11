import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  ShieldCheck,
  ArrowRight,
  Server,
  Cpu,
  Lock,
  Sparkles,
  Loader2,
  Globe,
  AlertCircle,
} from "lucide-react";

function DashboardRedirect() {
  const { user } = useAuth();
  const [countdown, setCountdown] = useState(5);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleSecureRedirect = async () => {
    if (isRedirecting) return;
    
    setIsRedirecting(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      if (!user) {
        throw new Error("User information not available");
      }

      // Generate dashboard-specific token via backend
      const response = await fetch("https://smart-traffic-management-system-23fs.onrender.com/api/auth/dashboard-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          dashboardUrl: "https://smart-traffic-management-system-bpm.vercel.app",
          userAgent: navigator.userAgent
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate dashboard session");
      }

      const data = await response.json();
      
      // Create a form for secure POST redirect
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://smart-traffic-management-system-23fs.onrender.com/api/auth/dashboard-callback';
      form.target = '_self';
      form.style.display = 'none';
      
      // Add hidden fields
      const fields = {
        token: data.dashboardToken,
        userId: user.id || "1",
        userName: user.name || "User",
        userEmail: user.email || "user@stms.ai",
        userRole: user.role || "user",
        redirect: "https://smart-traffic-management-system-bpm.vercel.app/dashboard"
      };

      Object.entries(fields).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      // Add to DOM and submit
      document.body.appendChild(form);
      console.log("Initiating secure dashboard redirect...");
      form.submit();

    } catch (err) {
      console.error("Secure redirect failed:", err);
      setError(`Redirect failed: ${err.message}. Using fallback method.`);
      setIsRedirecting(false);
      
      // Fallback to old method
      setTimeout(() => {
        const fallbackUrl = `https://smart-traffic-management-system-bpm.vercel.app/login?fallback=true&time=${Date.now()}`;
        window.open(fallbackUrl, '_blank');
      }, 1000);
    }
  };

  // Fallback redirect method (your original approach)
  const handleFallbackRedirect = () => {
    const redirectUrl = "https://smart-traffic-management-system-bpm.vercel.app/login";
    const params = new URLSearchParams();

    if (user) {
      params.append("token", localStorage.getItem("token") || "temp-token");
      params.append("userId", user.id || "1");
      params.append("userName", encodeURIComponent(user.name || "User"));
      params.append("userEmail", encodeURIComponent(user.email || "user@stms.ai"));
      params.append("userRole", encodeURIComponent(user.role || "user"));
      params.append("fallback", "true");
      params.append("timestamp", Date.now().toString());
    }

    const finalUrl = `${redirectUrl}?${params.toString()}`;
    console.log("Using fallback redirect to:", finalUrl);
    window.location.href = finalUrl;
  };

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 4;
      });
    }, 100);

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          // Try secure redirect first
          if (!isRedirecting) {
            handleSecureRedirect();
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
      handleSecureRedirect();
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
        <div className="max-w-4xl w-full">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 sm:p-12 border border-gray-200/50 shadow-2xl shadow-blue-500/5">
            {/* Error Alert */}
            {error && (
              <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-2xl animate-pulse">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-amber-800">Authentication Notice</p>
                    <p className="text-sm text-amber-700">{error}</p>
                    <button
                      onClick={handleFallbackRedirect}
                      className="mt-2 text-sm font-medium text-amber-800 hover:text-amber-900 underline"
                    >
                      Click here to use alternative method
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="text-center mb-10">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-500 blur-xl opacity-50 rounded-full"></div>
                <div className="relative bg-gradient-to-br from-blue-600 to-emerald-500 p-4 rounded-2xl">
                  <ShieldCheck className="h-12 w-12 text-white" />
                </div>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {isRedirecting ? "Securing Connection..." : "Access Granted"}
                <span className="block bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent mt-2">
                  {isRedirecting ? "Establishing Secure Session..." : "Welcome to STMS Dashboard"}
                </span>
              </h1>

              <p className="text-lg text-gray-600 mb-6">
                Hello,{" "}
                <span className="font-semibold text-blue-600">
                  {user?.name || "User"}
                </span>
                ! {isRedirecting ? "Securing your connection..." : "You're being redirected to the analytics dashboard."}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-10">
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl p-6 border border-blue-200/50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg">
                      {isRedirecting ? (
                        <Loader2 className="h-6 w-6 text-blue-600 animate-spin" />
                      ) : (
                        <Lock className="h-6 w-6 text-blue-600" />
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {isRedirecting ? "Initializing Secure Session" : "Dashboard Initialization"}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          {isRedirecting ? "Security handshake" : "Loading progress"}
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
                    </div>

                    <div className="text-center">
                      <div className="text-5xl font-bold text-gray-900 mb-2">
                        {countdown}
                      </div>
                      <p className="text-sm text-gray-600">
                        {isRedirecting ? "Establishing connection..." : "Redirecting in seconds"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className={`flex items-center gap-3 p-3 rounded-xl ${isRedirecting ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'}`}>
                    <div className={`p-2 rounded-lg ${isRedirecting ? 'bg-blue-100' : 'bg-emerald-100'}`}>
                      <Lock className={`h-5 w-5 ${isRedirecting ? 'text-blue-600' : 'text-emerald-600'}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        Authentication
                      </p>
                      <p className="text-sm text-gray-600">
                        {isRedirecting ? "Verifying credentials..." : "Secure connection established"}
                      </p>
                    </div>
                    <div className={`w-2 h-2 rounded-full animate-pulse ${isRedirecting ? 'bg-blue-500' : 'bg-emerald-500'}`}></div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Cpu className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        Data Processing
                      </p>
                      <p className="text-sm text-gray-600">
                        Fetching real-time analytics
                      </p>
                    </div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-br from-violet-100 to-violet-200 rounded-lg">
                      <Server className="h-6 w-6 text-violet-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      System Architecture
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                      <span className="text-gray-700">
                        Dashboard Application
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-emerald-600">
                          Running
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                      <span className="text-gray-700">API Gateway</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-emerald-600">
                          Connected
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                      <span className="text-gray-700">
                        Real-time Data Stream
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-emerald-600">
                          Active
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg">
                      <Sparkles className="h-6 w-6 text-amber-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Security Features
                    </h3>
                  </div>

                  <ul className="space-y-3">
                    {[
                      "Encrypted token transmission",
                      "Short-lived session tokens",
                      "Cross-domain authentication",
                      "Secure POST redirects",
                      "Fallback authentication methods",
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl p-6 border border-blue-200">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl">
                  <Globe className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Secure Dashboard Architecture
                  </h4>
                  <p className="text-gray-600 mb-3">
                    Using secure token exchange via backend API to ensure safe cross-domain authentication. 
                    This prevents token exposure in URL parameters and provides better security.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                    <span>
                      Using secure POST redirect to: smart-traffic-management-system-bpm.vercel.app
                    </span>
                  </div>
                </div>
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
                    Securing Connection...
                  </>
                ) : (
                  <>
                    Go to Dashboard Now
                    <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
              
              <button
                onClick={handleFallbackRedirect}
                className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-all duration-300 text-sm"
              >
                Use Alternative Redirect Method
              </button>
              
              <p className="mt-3 text-sm text-gray-500">
                {isRedirecting 
                  ? "Establishing secure session with dashboard..." 
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