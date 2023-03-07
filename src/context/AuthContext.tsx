import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line

interface ContextInterface {
  isAuth: boolean;
  signup: ({ token }: { token: string }) => void;
  login: ({
    token,
    rememberMe,
  }: {
    token: string;
    rememberMe: boolean;
  }) => void;
  logout: () => void;
}

/* eslint-disable */
const AuthContext = createContext<ContextInterface>({
  isAuth: false,
  login: () => {},
  logout: () => {},
  signup: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean>(
    !!localStorage.getItem('token') || !!sessionStorage.getItem('token')
  );

  const navigate = useNavigate();

  const login = async ({
    token,
    rememberMe,
  }: {
    token: string;
    rememberMe: boolean;
  }) => {
    if (token) {
      if (rememberMe) {
        localStorage.setItem('token', token);
      } else {
        sessionStorage.setItem('token', token);
      }
      setIsAuth(true);
      navigate('/profile', { replace: true });
    }
  };

  const signup = async ({ token }: { token: string }) => {
    if (token) {
      localStorage.setItem('token', token);
      setIsAuth(true);
      navigate('/profile', { replace: true });
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    setIsAuth(false);
    navigate('/', { replace: true });
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
