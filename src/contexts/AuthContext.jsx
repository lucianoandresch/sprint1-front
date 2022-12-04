import React, { createContext, useEffect, useCallback } from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';

let logoutTimer;

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, storeUser, clearStoredUser] = useLocalStorage('user');
  const [sessionExpDate, storeSessionExpDate, clearSessionExpDate] =
    useLocalStorage('sessionExpiration');
  const navigate = useNavigate();

  const handleUserLogin = (user) => {
    const expiration = new Date(jwtDecode(user.token).exp * 1000);
    storeUser(user);
    storeSessionExpDate(expiration);
  };

  const handleUserLogout = () => {
    console.log('ENTRA A LOGOUT');
    clearStoredUser();
    clearSessionExpDate();
    navigate('/home');
  };

  const handleAutomaticLogout = useCallback(() => {
    clearStoredUser();
    clearSessionExpDate();
    navigate('/home');
  }, [clearSessionExpDate, clearStoredUser, navigate]);

  useEffect(() => {
    console.log('context', currentUser);
    if (currentUser && sessionExpDate) {
      const remainingTime =
        new Date(sessionExpDate).getTime() - new Date().getTime();
      logoutTimer = setTimeout(handleAutomaticLogout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [currentUser, sessionExpDate, handleAutomaticLogout]);

  return (
    <AuthContext.Provider
      value={{ currentUser, handleUserLogin, handleUserLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
