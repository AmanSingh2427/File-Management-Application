import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  // Retrieve the user's name from local storage
  const userName = localStorage.getItem('userName');

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName'); // Clear user name on logout
    localStorage.removeItem('userId');

    // Redirect to login page
    navigate('/login');
  };

  return (
    <div className="w-[calc(100%-16rem)] h-16 bg-blue-500 text-white flex items-center justify-between px-6 fixed top-0 left-64 shadow-md">
      {/* Left side: User's name and links */}
      <div className="flex items-center space-x-6">
        <a href="#" className="hover:text-blue-300">Home</a>
        <a href="#" className="hover:text-blue-300">About</a>
        <a href="#" className="hover:text-blue-300">Contact</a>
      </div>

      {/* Center: Username */}
      <div className="flex items-center space-x-4">
        <span className="text-lg font-semibold">{userName}</span>
      </div>

      {/* Right side: Logout button */}
      <div>
        <button
          onClick={handleLogout}
          className="bg-blue-700 px-3 py-1 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
