// export const saveToken = (token) => localStorage.setItem("token", token);
// export const getToken = () => localStorage.getItem("token");
// export const logout = () => localStorage.removeItem("token");
// export const isLoggedIn = () => !!getToken();

// src/utils/auth.js

export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const saveUserData = (userData) => {
  sessionStorage.setItem("username", userData.username);
  sessionStorage.setItem("userId", userData.id);
  sessionStorage.setItem("email", userData.email);
};

export const getUserData = () => {
  return {
    username: sessionStorage.getItem("username"),
    userId: sessionStorage.getItem("userId"),
    email: sessionStorage.getItem("email"),
  };
};

export const isLoggedIn = () => {
  return !!getToken();
};

export const logout = () => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("username");
  sessionStorage.removeItem("userId");
  sessionStorage.removeItem("email");
};