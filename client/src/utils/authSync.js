export const syncLogout = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      sessionStorage.clear();
      
      const clientUrl = process.env.NODE_ENV === 'production'
        ? window.location.origin
        : 'http://localhost:3000';
      
      window.location.href = `${clientUrl}/login`;
    } catch (error) {
      console.error('Logout sync error:', error);
    }
  };