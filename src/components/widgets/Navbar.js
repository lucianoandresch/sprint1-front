/*
  Component with the header of the web page
*/

import React from 'react';
import logo from '../../assets/images/logo.png';
import '../../styles/navbar.css';
import { FaSignInAlt, FaPen } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';

export const Navbar = () => {
  const { currentUser, handleUserLogout } = useAuth() || {};
  console.log('NABAR', currentUser);
  const notLogged = (
    <>
      <a href="/register">
        <div className="nav-button">
          <p className="nav-button-text">Registrarse</p>
          <FaPen />
        </div>
      </a>
      <a href="/signin">
        <div className="nav-button">
          <p className="nav-button-text">Iniciar sesión</p>
          <FaSignInAlt />
        </div>
      </a>
    </>
  );
  const logged = (
    <>
      <a href="/driverRegisterRequests">
        <div className="nav-button">
          <p className="nav-button-text">Postulaciones</p>
          <FaSignInAlt />
        </div>
      </a>
      <a href="/">
        <div className="nav-button">
          <button
            type="submit"
            className="nav-button-text"
            onClick={() => handleUserLogout()}
          >
            Salir
          </button>
          <FaSignInAlt />
        </div>
      </a>
    </>
  );

  return (
    <header>
      <div className="page-header">
        <div className="nav-home-icon">
          <a href="/">
            <img src={logo} alt="logo" height={40} />
          </a>
        </div>
        <div className="nav-buttons">
          {notLogged}
          {logged}
        </div>
      </div>
    </header>
  );
};
