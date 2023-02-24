import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line

interface ContextInterface {
  isAuth: boolean;
  login: ({ token }: { token: string }) => void;
  logout: () => void;
}

/* eslint-disable */
const AuthContext = createContext<ContextInterface>({
  isAuth: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean>(
    !!localStorage.getItem('token')
  );

  const navigate = useNavigate();

  const login = async ({ token }: { token: string }) => {
    if (token) {
      localStorage.setItem('token', token);
      setIsAuth(true);
      navigate('/profile', { replace: true });
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuth(false);
    navigate('/', { replace: true });
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
