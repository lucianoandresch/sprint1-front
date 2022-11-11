/*
  Component with the header of the web page
*/

import React from 'react';
import logo from '../../assets/images/logo.png';
import '../../styles/navbar.css';

import { FaSignInAlt, FaPen } from 'react-icons/fa';

export const Navbar = () => {
  return (
    <header>
      <div className="page-header">
        <div className="nav-home-icon">
          <a href="/">
            <img src={logo} alt="logo" height={40} />
          </a>
        </div>
        <div className="nav-buttons">
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
        </div>
      </div>
    </header>
  );
};
