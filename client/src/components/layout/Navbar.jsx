import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { TrafficCone, Menu, X, LogOut, User } from 'lucide-react';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <TrafficCone className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">STMS</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary-600 transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary-600 transition-colors">
              Contact
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-primary-600" />
                  </div>
                  <span className="text-gray-700">{user.name}</span>
                </div>
                <Link to="/dashboard" className="btn py-2">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn-secondary py-2 flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="btn-secondary py-2">
                  Login
                </Link>
                <Link to="/signup" className="btn py-2">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary-600"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-primary-600 py-2"
              >
                Home
              </Link>
              <Link 
                to="/about" 
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-primary-600 py-2"
              >
                About
              </Link>
              <Link 
                to="/contact" 
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-primary-600 py-2"
              >
                Contact
              </Link>
              
              {user ? (
                <>
                  <div className="flex items-center space-x-2 py-2">
                    <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-primary-600" />
                    </div>
                    <span className="text-gray-700">{user.name}</span>
                  </div>
                  <Link 
                    to="/dashboard" 
                    onClick={() => setIsOpen(false)}
                    className="btn py-3 text-center"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="btn-secondary py-3 flex items-center justify-center"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    onClick={() => setIsOpen(false)}
                    className="btn-secondary py-3 text-center"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    onClick={() => setIsOpen(false)}
                    className="btn py-3 text-center"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;