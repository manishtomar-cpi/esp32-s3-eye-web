// components/Sidebar.jsx
import React, { useState } from 'react';
import {
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaImages,
  FaSearch,
  FaTachometerAlt,
} from 'react-icons/fa';

function Sidebar({ onLogout, onViewDashboard, onViewImages, onSearch }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (action) => {
    if (action === 'dashboard') {
      if (onViewDashboard) onViewDashboard();
    } else if (action === 'jpeg') {
      if (onViewImages) onViewImages('jpeg');
    } else if (action === 'raw') {
      if (onViewImages) onViewImages('raw');
    } else if (action === 'search') {
      if (onSearch) onSearch();
    }
    if (window.innerWidth <= 768) setIsOpen(false); // Close sidebar on mobile after selection
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden p-4 text-blue-500 fixed top-0 right-0 z-50"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Overlay for Mobile Sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-white shadow-lg p-4 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-200 ease-in-out md:relative md:translate-x-0 md:w-64 z-50`}
      >
        {/* Header */}
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

        {/* Navigation */}
        <nav className="space-y-4">
          <button
            onClick={() => handleNavigation('dashboard')}
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-500"
          >
            <FaTachometerAlt className="text-blue-500" />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => handleNavigation('jpeg')}
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-500"
          >
            <FaImages className="text-green-500" />
            <span>View JPEG Images</span>
          </button>
          <button
            onClick={() => handleNavigation('raw')}
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-500"
          >
            <FaImages className="text-blue-500" />
            <span>View RAW Images</span>
          </button>
          <button
            onClick={() => handleNavigation('search')}
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-500"
          >
            <FaSearch className="text-purple-500" />
            <span>Search Images</span>
          </button>
        </nav>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="mt-6 flex items-center space-x-2 text-red-500 hover:text-red-600"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </>
  );
}

export default Sidebar;
