import React, { useState } from 'react';
import { Settings, Bell, Shield, Database, Globe } from 'lucide-react';

function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleToggle = (setter, currentValue, name) => {
    setter(!currentValue);
    showToast(`${name} ${!currentValue ? 'enabled' : 'disabled'}`, 'success');
  };

  const handleButtonClick = (action) => {
    showToast(`${action} feature clicked - This is a demo`, 'info');
  };

  const handleCheckUpdates = () => {
    showToast('Checking for updates... System is up to date!', 'info');
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg border ${
          toast.type === 'success' 
            ? 'bg-emerald-900/90 border-emerald-800 text-emerald-200' 
            : 'bg-blue-900/90 border-blue-800 text-blue-200'
        } backdrop-blur-sm animate-slide-in`}>
          <p className="font-medium">{toast.message}</p>
        </div>
      )}

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-200 mb-2">Settings</h1>
        <p className="text-gray-400">Manage your system preferences and configurations</p>
      </div>

      <div className="space-y-6">
        {/* Notifications */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Bell className="h-6 w-6 text-blue-400" />
            <h2 className="text-xl font-semibold text-gray-200">Notifications</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-800">
              <div>
                <h3 className="font-medium text-gray-200">Push Notifications</h3>
                <p className="text-sm text-gray-400">Receive real-time alerts</p>
              </div>
              <button
                onClick={() => handleToggle(setNotifications, notifications, 'Push notifications')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications ? 'bg-blue-600' : 'bg-gray-700'
                }`}
                aria-label={`${notifications ? 'Disable' : 'Enable'} push notifications`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-800">
              <div>
                <h3 className="font-medium text-gray-200">Email Alerts</h3>
                <p className="text-sm text-gray-400">Get notified via email</p>
              </div>
              <button
                onClick={() => handleToggle(setEmailAlerts, emailAlerts, 'Email alerts')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  emailAlerts ? 'bg-blue-600' : 'bg-gray-700'
                }`}
                aria-label={`${emailAlerts ? 'Disable' : 'Enable'} email alerts`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    emailAlerts ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Settings className="h-6 w-6 text-emerald-400" />
            <h2 className="text-xl font-semibold text-gray-200">Appearance</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-800">
              <div>
                <h3 className="font-medium text-gray-200">Dark Mode</h3>
                <p className="text-sm text-gray-400">Use dark color scheme</p>
              </div>
              <button
                onClick={() => handleToggle(setDarkMode, darkMode, 'Dark mode')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  darkMode ? 'bg-blue-600' : 'bg-gray-700'
                }`}
                aria-label={`${darkMode ? 'Disable' : 'Enable'} dark mode`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    darkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="h-6 w-6 text-purple-400" />
            <h2 className="text-xl font-semibold text-gray-200">Security</h2>
          </div>

          <div className="space-y-4">
            <button 
              onClick={() => handleButtonClick('Change password')}
              className="w-full text-left px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <h3 className="font-medium text-gray-200 mb-1">Change Password</h3>
              <p className="text-sm text-gray-400">Update your account password</p>
            </button>

            <button 
              onClick={() => handleButtonClick('Two-factor authentication')}
              className="w-full text-left px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <h3 className="font-medium text-gray-200 mb-1">Two-Factor Authentication</h3>
              <p className="text-sm text-gray-400">Add an extra layer of security</p>
            </button>

            <button 
              onClick={() => handleButtonClick('Active sessions')}
              className="w-full text-left px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <h3 className="font-medium text-gray-200 mb-1">Active Sessions</h3>
              <p className="text-sm text-gray-400">Manage your login sessions</p>
            </button>
          </div>
        </div>

        {/* System */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Database className="h-6 w-6 text-amber-400" />
            <h2 className="text-xl font-semibold text-gray-200">System</h2>
          </div>

          <div className="space-y-4">
            <div className="px-4 py-3 bg-gray-800 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">System Version</span>
                <span className="text-sm font-medium text-gray-200">v2.5.1</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">Last Updated</span>
                <span className="text-sm font-medium text-gray-200">Dec 7, 2024</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Database Status</span>
                <span className="flex items-center text-sm font-medium text-emerald-400">
                  <div className="h-2 w-2 bg-emerald-500 rounded-full mr-2" />
                  Connected
                </span>
              </div>
            </div>

            <button 
              onClick={handleCheckUpdates}
              className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
            >
              Check for Updates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;