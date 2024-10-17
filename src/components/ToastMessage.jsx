// components/ToastMessage.jsx
import React, { useEffect } from 'react';
import { FaHeartbeat, FaExclamationTriangle } from 'react-icons/fa';

function ToastMessage({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, 2000); // 2 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div
        className={`flex items-center max-w-xs mx-auto p-4 rounded-full text-white shadow-lg ${
          type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}
      >
        <div className="mr-3">
          {type === 'success' ? (
            <FaHeartbeat size={24} />
          ) : (
            <FaExclamationTriangle size={24} />
          )}
        </div>
        <div className="text-sm font-semibold">{message}</div>
      </div>
    </div>
  );
}

export default ToastMessage;
