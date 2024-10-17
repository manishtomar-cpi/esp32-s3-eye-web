import React, { useState, useEffect } from 'react';
import HeartbeatSpinner from './HeartbeatSpinner';
import ToastMessage from './ToastMessage';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { FaUserMd, FaUserInjured } from 'react-icons/fa';

function LoginForm() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    deviceId: '',
    role: 'patient',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRoleChange = (role) => {
    setCredentials({
      username: '',
      password: '',
      deviceId: '',
      role,
    });
    setErrors({});
  };

  const validateForm = () => {
    const errors = {};
    if (credentials.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long.';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);
    setToast({ message: '', type: '' });

    try {
      await login(credentials);
      setToast({ message: 'Login Successful!', type: 'success' });
      setTimeout(() => {
        navigate(credentials.role === 'admin' ? '/admin-dashboard' : '/user-dashboard');
      }, 1000);
    } catch (error) {
      setToast({ message: error.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (toast.message) {
      const timer = setTimeout(() => {
        setToast({ message: '', type: '' });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      {toast.message && <ToastMessage message={toast.message} type={toast.type} />}
      <div className="bg-white shadow-lg rounded-xl p-8 w-96"> 
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>

          {/* Role Selection Buttons */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex rounded-md shadow">
              <button
                type="button"
                onClick={() => handleRoleChange('patient')}
                className={`${
                  credentials.role === 'patient'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700'
                } px-4 py-2 border border-blue-500 rounded-l-md focus:outline-none`}
              >
                Patient
              </button>
              <button
                type="button"
                onClick={() => handleRoleChange('admin')}
                className={`${
                  credentials.role === 'admin'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700'
                } px-4 py-2 border border-blue-500 rounded-r-md focus:outline-none`}
              >
                Admin
              </button>
            </div>
          </div>

          {/* Conditional Inputs */}
          {credentials.role === 'admin' ? (
            <div>
              <input
                type="text"
                placeholder="Username"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value, deviceId: '' })
                }
                required
                className="w-full p-3 border-b-2 border-gray-300 focus:outline-none focus:border-blue-400 transition-colors"
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
            </div>
          ) : (
            <div>
              <input
                type="text"
                placeholder="Device ID"
                value={credentials.deviceId}
                onChange={(e) =>
                  setCredentials({ ...credentials, deviceId: e.target.value, username: '' })
                }
                required
                className="w-full p-3 border-b-2 border-gray-300 focus:outline-none focus:border-blue-400 transition-colors"
              />
              {errors.deviceId && <p className="text-red-500 text-sm">{errors.deviceId}</p>}
            </div>
          )}

          <div>
            <input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
              className="w-full p-3 border-b-2 border-gray-300 focus:outline-none focus:border-blue-400 transition-colors"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center p-3 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
          >
            {loading ? <HeartbeatSpinner /> : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;


