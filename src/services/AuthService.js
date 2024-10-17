// services/AuthService.js
import jwt from 'jsonwebtoken';

const AuthService = {
  login: async (credentials) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const { username, password, deviceId } = credentials;
        if (
          (username === 'admin' && password === 'admin123') ||
          (deviceId && password === 'patient123')
        ) {
          const user = {
            role: username ? 'admin' : 'patient',
            name: username || 'Patient',
          };
          const token = jwt.sign(user, 'secretKey', { expiresIn: '1h' });
          resolve({ token, user });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  },

  decodeToken: (token) => {
    return jwt.decode(token);
  },
};

export default AuthService;
