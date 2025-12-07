import React from "react";
import { Search, Bell, User, Menu, Calendar } from "lucide-react";

function Header({ user, onToggleSidebar, sidebarCollapsed }) {
  return (
    <header className="sticky top-0 z-10 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onToggleSidebar}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="hidden md:flex items-center space-x-2 text-gray-400">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search intersections, alerts..."
                className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>

            <button className="p-2 hover:bg-gray-800 rounded-lg relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="flex items-center space-x-3">
              <div className="h-9 w-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                {user?.name ? (
                  <span className="text-white font-medium text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                ) : (
                  <User className="h-5 w-5 text-white" />
                )}
              </div>

              {!sidebarCollapsed && (
                <div className="hidden lg:block">
                  <p className="text-sm font-medium text-white">
                    {user?.name || "Loading..."}
                  </p>
                  <p className="text-xs text-gray-400">
                    {user?.email || "user@stms.ai"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
