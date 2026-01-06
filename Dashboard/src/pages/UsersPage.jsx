import React from 'react';
import { Users, UserPlus, Shield, User, ChevronDown, MoreVertical, Edit2, Trash2, Eye } from 'lucide-react';

function UsersPage() {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@stms.ai', role: 'Admin', status: 'Active', lastLogin: '2 hours ago' },
    { id: 2, name: 'Jane Smith', email: 'jane@stms.ai', role: 'Operator', status: 'Active', lastLogin: '5 hours ago' },
    { id: 3, name: 'Mike Johnson', email: 'mike@stms.ai', role: 'Operator', status: 'Active', lastLogin: '1 day ago' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@stms.ai', role: 'Viewer', status: 'Inactive', lastLogin: '3 days ago' }
  ];

  return (
    <div className="w-full px-3 xs:px-4 sm:px-5 md:px-6 py-4 xs:py-5 sm:py-6 max-w-[1920px] mx-auto">
      {/* Header */}
      <div className="mb-4 xs:mb-5 sm:mb-6">
        <div className="flex flex-col xs:flex-row xs:items-end xs:justify-between gap-3">
          <div>
            <h1 className="text-xl xs:text-2xl sm:text-3xl font-bold text-gray-200 mb-1">User Management</h1>
            <p className="text-xs xs:text-sm text-gray-400">Manage system users and access permissions</p>
          </div>
          
          {/* Mobile Add User Button */}
          <button className="xs:hidden flex items-center justify-center space-x-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors w-full">
            <UserPlus className="h-4 w-4" />
            <span className="text-sm font-medium">Add User</span>
          </button>
        </div>
      </div>

      {/* Stats Cards - Responsive Grid */}
      <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 mb-4 xs:mb-5 sm:mb-6">
        <div className="bg-gray-900 rounded-lg xs:rounded-xl border border-gray-800 p-3 xs:p-4 sm:p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs xs:text-sm text-gray-400">Total Users</span>
            <Users className="h-4 w-4 xs:h-5 xs:w-5 text-blue-400 flex-shrink-0" />
          </div>
          <div className="text-xl xs:text-2xl sm:text-3xl font-bold text-white">{users.length}</div>
        </div>

        <div className="bg-gray-900 rounded-lg xs:rounded-xl border border-gray-800 p-3 xs:p-4 sm:p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs xs:text-sm text-gray-400">Admins</span>
            <Shield className="h-4 w-4 xs:h-5 xs:w-5 text-purple-400 flex-shrink-0" />
          </div>
          <div className="text-xl xs:text-2xl sm:text-3xl font-bold text-white">
            {users.filter(u => u.role === 'Admin').length}
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg xs:rounded-xl border border-gray-800 p-3 xs:p-4 sm:p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs xs:text-sm text-gray-400">Operators</span>
            <User className="h-4 w-4 xs:h-5 xs:w-5 text-emerald-400 flex-shrink-0" />
          </div>
          <div className="text-xl xs:text-2xl sm:text-3xl font-bold text-white">
            {users.filter(u => u.role === 'Operator').length}
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg xs:rounded-xl border border-gray-800 p-3 xs:p-4 sm:p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs xs:text-sm text-gray-400">Active</span>
            <div className="h-2 w-2 xs:h-3 xs:w-3 bg-emerald-500 rounded-full flex-shrink-0" />
          </div>
          <div className="text-xl xs:text-2xl sm:text-3xl font-bold text-white">
            {users.filter(u => u.status === 'Active').length}
          </div>
        </div>
      </div>

      {/* Users Table Section */}
      <div className="bg-gray-900 rounded-lg xs:rounded-xl sm:rounded-2xl border border-gray-800 p-3 xs:p-4 sm:p-5 md:p-6">
        {/* Table Header */}
        <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between mb-4 xs:mb-5 sm:mb-6 gap-3">
          <h3 className="text-lg xs:text-xl sm:text-2xl font-semibold text-gray-200">System Users</h3>
          
          {/* Desktop Add User Button */}
          <button className="hidden xs:flex items-center justify-center space-x-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            <UserPlus className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-sm sm:text-base font-medium">Add User</span>
          </button>
        </div>

        {/* Desktop Table View */}
        <div className="hidden xs:block overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-3 px-3 xs:px-4 text-xs xs:text-sm text-gray-400 font-medium whitespace-nowrap">User</th>
                <th className="text-left py-3 px-3 xs:px-4 text-xs xs:text-sm text-gray-400 font-medium whitespace-nowrap">Role</th>
                <th className="text-left py-3 px-3 xs:px-4 text-xs xs:text-sm text-gray-400 font-medium whitespace-nowrap">Status</th>
                <th className="text-left py-3 px-3 xs:px-4 text-xs xs:text-sm text-gray-400 font-medium whitespace-nowrap">Last Login</th>
                <th className="text-left py-3 px-3 xs:px-4 text-xs xs:text-sm text-gray-400 font-medium whitespace-nowrap">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors last:border-0">
                  <td className="py-3 xs:py-4 px-3 xs:px-4">
                    <div className="flex items-center space-x-2 xs:space-x-3">
                      <div className="h-8 w-8 xs:h-9 xs:w-9 sm:h-10 sm:w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm xs:text-base font-medium">{user.name.charAt(0)}</span>
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-gray-200 text-sm xs:text-base truncate">{user.name}</div>
                        <div className="text-xs xs:text-sm text-gray-400 truncate">{user.email}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 xs:py-4 px-3 xs:px-4">
                    <span
                      className={`px-2 xs:px-3 py-1 rounded-full text-xs xs:text-sm whitespace-nowrap ${
                        user.role === 'Admin'
                          ? 'bg-purple-500/20 text-purple-400'
                          : user.role === 'Operator'
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-gray-500/20 text-gray-400'
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="py-3 xs:py-4 px-3 xs:px-4">
                    <span className="flex items-center space-x-1.5 xs:space-x-2">
                      <div
                        className={`h-1.5 w-1.5 xs:h-2 xs:w-2 rounded-full flex-shrink-0 ${
                          user.status === 'Active' ? 'bg-emerald-500' : 'bg-gray-500'
                        }`}
                      />
                      <span className={`text-xs xs:text-sm ${user.status === 'Active' ? 'text-emerald-400' : 'text-gray-400'}`}>
                        {user.status}
                      </span>
                    </span>
                  </td>

                  <td className="py-3 xs:py-4 px-3 xs:px-4 text-gray-400 text-xs xs:text-sm whitespace-nowrap">
                    {user.lastLogin}
                  </td>

                  <td className="py-3 xs:py-4 px-3 xs:px-4">
                    <div className="flex items-center space-x-1 xs:space-x-2">
                      <button className="px-2 xs:px-3 py-1 text-xs xs:text-sm text-blue-400 hover:text-blue-300 transition-colors whitespace-nowrap">
                        Edit
                      </button>
                      <span className="text-gray-700 hidden xs:inline">|</span>
                      <button className="px-2 xs:px-3 py-1 text-xs xs:text-sm text-red-400 hover:text-red-300 transition-colors whitespace-nowrap">
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards View */}
        <div className="xs:hidden space-y-3">
          {users.map(user => (
            <div key={user.id} className="bg-gray-800/50 rounded-lg border border-gray-700 p-3">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-medium">{user.name.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-200">{user.name}</div>
                    <div className="text-xs text-gray-400">{user.email}</div>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-300">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <div className="text-xs text-gray-400 mb-1">Role</div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      user.role === 'Admin'
                        ? 'bg-purple-500/20 text-purple-400'
                        : user.role === 'Operator'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}
                  >
                    {user.role}
                  </span>
                </div>
                
                <div>
                  <div className="text-xs text-gray-400 mb-1">Status</div>
                  <span className="flex items-center space-x-1.5">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        user.status === 'Active' ? 'bg-emerald-500' : 'bg-gray-500'
                      }`}
                    />
                    <span className={`text-xs ${user.status === 'Active' ? 'text-emerald-400' : 'text-gray-400'}`}>
                      {user.status}
                    </span>
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-gray-700 pt-3">
                <div>
                  <div className="text-xs text-gray-400 mb-1">Last Login</div>
                  <div className="text-sm text-gray-300">{user.lastLogin}</div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-1.5 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 rounded">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UsersPage;