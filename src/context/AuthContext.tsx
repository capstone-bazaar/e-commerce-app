import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line

interface ContextInterface {
  isAuth: boolean;
  userID: string | null;
  signup: ({ token, user }: { token: string; user: string }) => void;
  login: ({
    token,
    user,
    rememberMe,
  }: {
    token: string;
    user: string;
    rememberMe: boolean;
  }) => void;
  logout: () => void;
  setIsAuth: (value: boolean) => void;
}

/* eslint-disable */
const AuthContext = createContext<ContextInterface>({
  isAuth: false,
  userID: '',
  login: () => {},
  logout: () => {},
  signup: () => {},
  setIsAuth: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean>(
    !!localStorage.getItem('token') || !!sessionStorage.getItem('token')
  );

  const [userID, setUserID] = useState<string | ''>(
    localStorage.getItem('user') || ''
  );

  const navigate = useNavigate();

  const login = async ({
    token,
    user,
    rememberMe,
  }: {
    token: string;
    user: string;
    rememberMe: boolean;
  }) => {
    if (token) {
      setUserID(user);
      localStorage.setItem('user', user);
      if (rememberMe) {
        localStorage.setItem('token', token);
      } else {
        sessionStorage.setItem('token', token);
      }
      setIsAuth(true);
      navigate('/profile', { replace: true });
    }
  };

  const signup = async ({ token, user }: { token: string; user: string }) => {
    if (token) {
      setUserID(user);
      localStorage.setItem('user', user);
      localStorage.setItem('token', token);
      setIsAuth(true);
      navigate('/profile', { replace: true });
    }
  };

  const logout = () => {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }

    if (sessionStorage.getItem('token')) {
      sessionStorage.removeItem('token');
    }
    localStorage.removeItem('user');
    setIsAuth(false);
    return navigate('/', { replace: true });
  };

  return (
    <AuthContext.Provider
      value={{ isAuth, login, logout, signup, setIsAuth, userID }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
