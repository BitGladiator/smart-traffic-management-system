import React from 'react';
import { Users, UserPlus, Shield, User } from 'lucide-react';

function UsersPage() {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@stms.ai', role: 'Admin', status: 'Active', lastLogin: '2 hours ago' },
    { id: 2, name: 'Jane Smith', email: 'jane@stms.ai', role: 'Operator', status: 'Active', lastLogin: '5 hours ago' },
    { id: 3, name: 'Mike Johnson', email: 'mike@stms.ai', role: 'Operator', status: 'Active', lastLogin: '1 day ago' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@stms.ai', role: 'Viewer', status: 'Inactive', lastLogin: '3 days ago' }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-200 mb-2">User Management</h1>
        <p className="text-gray-400">Manage system users and access permissions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Total Users</span>
            <Users className="h-5 w-5 text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-white">{users.length}</div>
        </div>

        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Admins</span>
            <Shield className="h-5 w-5 text-purple-400" />
          </div>
          <div className="text-3xl font-bold text-white">
            {users.filter(u => u.role === 'Admin').length}
          </div>
        </div>

        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Operators</span>
            <User className="h-5 w-5 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold text-white">
            {users.filter(u => u.role === 'Operator').length}
          </div>
        </div>

        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Active</span>
            <div className="h-3 w-3 bg-emerald-500 rounded-full" />
          </div>
          <div className="text-3xl font-bold text-white">
            {users.filter(u => u.status === 'Active').length}
          </div>
        </div>
      </div>

      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-200">System Users</h3>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            <UserPlus className="h-5 w-5" />
            <span>Add User</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">User</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Role</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Last Login</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">{user.name.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-200">{user.name}</div>
                        <div className="text-sm text-gray-400">{user.email}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
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

                  <td className="py-4 px-4">
                    <span
                      className={`flex items-center space-x-2 ${
                        user.status === 'Active' ? 'text-emerald-400' : 'text-gray-400'
                      }`}
                    >
                      <div
                        className={`h-2 w-2 rounded-full ${
                          user.status === 'Active' ? 'bg-emerald-500' : 'bg-gray-500'
                        }`}
                      />
                      <span>{user.status}</span>
                    </span>
                  </td>

                  <td className="py-4 px-4 text-gray-400">{user.lastLogin}</td>

                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="px-3 py-1 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                        Edit
                      </button>
                      <button className="px-3 py-1 text-sm text-red-400 hover:text-red-300 transition-colors">
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UsersPage;
