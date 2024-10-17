// utils/localStorageUtils.js

const USER_KEY = 'app_user';

export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const setUserInLocalStorage = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem(USER_KEY);
};
