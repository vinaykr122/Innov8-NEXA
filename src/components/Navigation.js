import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from './NEXAlogo.png';

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get the current location/path

  const handleClick = () => {
    navigate('/AuthPage');
  };

  // Determine if the current path is the Sign In page
  const isSignInPage = location.pathname === '/AuthPage';

  return (
    <div className="w-full h-[8vh] fixed top-0 left-0 flex items-center justify-between bg-white z-50">
      <div className='pl-8'>
        <img src={logo} alt="logo" className="w-32 h-auto" />
      </div>
      <div className='pr-10 flex flex-col gap-2'>
        {/* Conditionally render the Sign In button based on the current path */}
        {!isSignInPage && (
          <button
            className="h-10 bg-blue-600 text-white p-3 rounded-lg cursor-pointer flex items-center"
            onClick={handleClick}
          >
            Sign In
          </button>
        )}
        {/* Uncomment this button if you need a Sign Up button */}
        {/* <button className="h-10 bg-blue-600 text-white p-3 rounded-lg cursor-pointer flex items-center">Sign Up</button> */}
      </div>
    </div>
  );
}

export default Navigation;
