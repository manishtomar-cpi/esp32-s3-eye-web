// utils/jwtUtils.js
import Cookies from 'js-cookie';

export const getToken = () => Cookies.get('token');

export const setToken = (token) => Cookies.set('token', token);

export const removeToken = () => Cookies.remove('token');
