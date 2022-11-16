import React, {
    createContext, useEffect, useCallback, useState
  } from 'react';
  import jwtDecode from 'jwt-decode';
  import { useNavigate } from 'react-router-dom';
  // import useLocalStorage from '../hooks/useLocalStorage';
  
  let logoutTimer;
  
  export const AuthContext = createContext();
  
  const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [sessionExpDate, setSessionExpDate] = useState();
    const navigate = useNavigate();
  
    const handleUserLogin = (user) => {
      const expiration = new Date(jwtDecode(user.token).exp * 1000);
      setCurrentUser(user);
      setSessionExpDate(expiration);
    };
  
    const handleUserLogout = () => {
      setCurrentUser(null);
      setSessionExpDate();
    };
  
    const handleAutomaticLogout = useCallback(() => {
      setCurrentUser(null);
      setSessionExpDate();
      navigate('/home');
    }, []);
  
    useEffect(() => {
      if (currentUser && sessionExpDate) {
        const remainingTime = new Date(sessionExpDate).getTime() - new Date().getTime();
        logoutTimer = setTimeout(handleAutomaticLogout, remainingTime);
      } else {
        clearTimeout(logoutTimer);
      }
    }, [currentUser, sessionExpDate, handleAutomaticLogout]);
  
    return (
      <AuthContext.Provider value={{ currentUser, handleUserLogin, handleUserLogout }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export default AuthContextProvider;