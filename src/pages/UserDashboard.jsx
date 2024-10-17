// pages/UserDashboard.jsx
import React from 'react';
import { useAuth } from '../hooks/useAuth';

function UserDashboard() {
  const { user, logout } = useAuth();
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold">Welcome to the Patient Dashboard, {user.name}</h2>
      <button
        onClick={logout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}

export default UserDashboard;
