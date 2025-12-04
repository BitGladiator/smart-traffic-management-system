const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5500/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  
  return data;
};

// Auth APIs
export const authAPI = {
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  },
};

// Traffic APIs
export const trafficAPI = {
  getLiveTrafficStatus: async () => {
    const response = await fetch(`${API_BASE_URL}/traffic/live-status`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      },
    });
    return handleResponse(response);
  },

  getPublicAlerts: async () => {
    const response = await fetch(`${API_BASE_URL}/traffic/alerts`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      },
    });
    return handleResponse(response);
  },

  getRoadCongestion: async () => {
    const response = await fetch(`${API_BASE_URL}/traffic/congestion`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      },
    });
    return handleResponse(response);
  },
};

// Admin APIs
export const adminAPI = {
  getAllSignals: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/signals`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      },
    });
    return handleResponse(response);
  },

  updateSignal: async (id, updates) => {
    const response = await fetch(`${API_BASE_URL}/admin/signals/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(updates),
    });
    return handleResponse(response);
  },

  getAnalytics: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/analytics`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      },
    });
    return handleResponse(response);
  },
};