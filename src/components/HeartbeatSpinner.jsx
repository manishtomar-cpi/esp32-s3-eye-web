// components/HeartbeatSpinner.jsx
import React from 'react';
import { FaHeartbeat } from 'react-icons/fa';

function HeartbeatSpinner() {
  return (
    <FaHeartbeat className="animate-pulse text-white text-2xl" />
  );
}

export default HeartbeatSpinner;
