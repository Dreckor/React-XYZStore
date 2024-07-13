import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
  
    if (username === 'admin' && password === 'admin') {
      setUser({ username, role: 'admin' });
    } else if (username === 'user' && password === 'user') {
      setUser({ username, role: 'user' });
    } else {
      alert('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);