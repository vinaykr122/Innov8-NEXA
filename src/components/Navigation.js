import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from './NEXAlogo.png';
import { useAuth } from '../components/AuthContext'; // Import useAuth hook

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get the current location/path
  const { isAuthenticated, logout } = useAuth(); // Get authentication status and logout function

  const handleSignIn = () => {
    navigate('/AuthPage');
  };

  const handleLogout = () => {
    logout(); // Call logout function from context
    navigate('/AuthPage'); // Redirect to AuthPage after logout
  };

  // Determine if the current path is the Sign In page
  const isAuthPage = location.pathname === '/AuthPage';

  return (
    <div className="w-full h-[8vh] fixed top-0 left-0 flex items-center justify-between bg-white z-50">
      <div className='pl-8'>
        <img src={logo} alt="logo" className="w-32 h-auto" />
      </div>
      <div className='pr-10 flex flex-col gap-2'>
        {/* Conditionally render the Sign In or Log Out button based on authentication status */}
        {!isAuthPage && (
          !isAuthenticated ? (
            <button
              className="h-10 bg-blue-600 text-white p-3 rounded-lg cursor-pointer flex items-center"
              onClick={handleSignIn}
            >
              Sign In
            </button>
          ) : (
            <button
              className="h-10 bg-red-600 text-white p-3 rounded-lg cursor-pointer flex items-center"
              onClick={handleLogout}
            >
              Log Out
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default Navigation;
