// hooks/useAuth.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getUserFromLocalStorage,
  setUserInLocalStorage,
  removeUserFromLocalStorage,
} from '../utils/localStorageUtils';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getUserFromLocalStorage());

  const login = async (credentials) => {
    const userData = await simulateLogin(credentials);
    setUser(userData);
    setUserInLocalStorage(userData);
  };

  const logout = () => {
    removeUserFromLocalStorage();
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

// Simulated login function with updated credentials and validation
async function simulateLogin(credentials) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const { username, password, deviceId, role } = credentials;
      if (role === 'admin' && username === 'admin' && password === 'admin123') {
        resolve({ role: 'admin', name: 'Admin User' });
      } else if (role === 'patient' && deviceId === 'device_id' && password === '123456') {
        resolve({ role: 'patient', name: 'Patient User' });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
}
