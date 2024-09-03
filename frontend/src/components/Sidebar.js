import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-64 h-full bg-gray-800 text-white fixed top-0 left-0 shadow-md">
      <ul className="p-4">
        <li className="mb-4 flex items-center">
          <i className="fas fa-tachometer-alt mr-2"></i>
          <a href="#" className="hover:text-blue-400">Dashboard</a>
        </li>
        <li className="mb-4 flex items-center">
          <i className="fas fa-user mr-2"></i>
          <a href="#" className="hover:text-blue-400">Profile</a>
        </li>
        <li className="mb-4 flex items-center">
          <i className="fas fa-cog mr-2"></i>
          <a href="#" className="hover:text-blue-400">Settings</a>
        </li>
        <li className="mb-4 flex items-center">
          <i className="fas fa-sign-out-alt mr-2"></i>
          <a href="#" className="hover:text-blue-400">Logout</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
