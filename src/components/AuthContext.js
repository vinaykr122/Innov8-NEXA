// src/contexts/AuthContext.js
import React, { createContext, useState, useContext } from 'react';

// Create a Context for authentication
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    // Simulate a login
    setIsAuthenticated(true);
    // Set a token in localStorage
    localStorage.setItem('authToken', 'your_token_here');
  };

  const logout = () => {
    // Simulate a logout
    setIsAuthenticated(false);
    // Remove token from localStorage
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
