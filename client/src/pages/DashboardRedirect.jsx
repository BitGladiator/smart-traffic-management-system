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
} from "lucide-react";

function DashboardRedirect() {
  const { user } = useAuth();
  const [countdown, setCountdown] = useState(5);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const redirectUrl =
      process.env.NODE_ENV === "production"
        ? "https://smart-traffic-management-system-bpm.vercel.app/login"
        : "http://localhost:3001";

    const params = new URLSearchParams();

    if (user) {
      params.append("token", localStorage.getItem("token") || "temp-token");
      params.append("userId", user.id || "1");
      params.append("userName", encodeURIComponent(user.name || "User"));
      params.append(
        "userEmail",
        encodeURIComponent(user.email || "user@stms.ai")
      );
      params.append("userRole", encodeURIComponent(user.role || "user"));
    } else {
      params.append("token", localStorage.getItem("token") || "temp-token");
      params.append("userName", "User");
      params.append("userEmail", "user@stms.ai");
    }
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
          const finalUrl = `${redirectUrl}?${params.toString()}`;
          console.log("Redirecting to:", finalUrl);
          window.location.href = finalUrl;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(countdownInterval);
    };
  }, [user]);
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
            <div className="text-center mb-10">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-500 blur-xl opacity-50 rounded-full"></div>
                <div className="relative bg-gradient-to-br from-blue-600 to-emerald-500 p-4 rounded-2xl">
                  <ShieldCheck className="h-12 w-12 text-white" />
                </div>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Access Granted
                <span className="block bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent mt-2">
                  Welcome to STMS Dashboard
                </span>
              </h1>

              <p className="text-lg text-gray-600 mb-6">
                Hello,{" "}
                <span className="font-semibold text-blue-600">
                  {user?.name || "User"}
                </span>
                ! You're being redirected to the analytics dashboard.
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-8 mb-10">
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl p-6 border border-blue-200/50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg">
                      <Loader2 className="h-6 w-6 text-blue-600 animate-spin" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Initializing Dashboard
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div>
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
                    </div>

                    <div className="text-center">
                      <div className="text-5xl font-bold text-gray-900 mb-2">
                        {countdown}
                      </div>
                      <p className="text-sm text-gray-600">
                        Redirecting in seconds
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <Lock className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        Authentication
                      </p>
                      <p className="text-sm text-gray-600">
                        Secure connection established
                      </p>
                    </div>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
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
                      What's Loading
                    </h3>
                  </div>

                  <ul className="space-y-3">
                    {[
                      "Real-time traffic analytics",
                      "Predictive congestion models",
                      "Incident management system",
                      "Infrastructure health monitoring",
                      "Smart signal optimization",
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
                    Dashboard Architecture Notice
                  </h4>
                  <p className="text-gray-600 mb-3">
                    The dashboard runs as a separate microservice to ensure
                    optimal performance and scalability. This architecture
                    allows for independent updates, specialized resource
                    allocation, and enhanced security.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                    <span>
                      Redirecting to:{" "}
                      {process.env.NODE_ENV === "production"
                        ? "dashboard.stms.ai"
                        : "localhost:3001"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <button
                onClick={() => {
                  const redirectUrl =
                    process.env.NODE_ENV === "production"
                      ? "/dashboard"
                      : "http://localhost:3001";
                  window.location.href = redirectUrl;
                }}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                Go to Dashboard Now
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="mt-3 text-sm text-gray-500">
                Click above if you're not automatically redirected within{" "}
                {countdown} seconds
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardRedirect;
