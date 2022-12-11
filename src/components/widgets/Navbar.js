/*
  Component with the header of the web page
*/

import React from 'react';
import logo from '../../assets/images/logo.png';
import '../../styles/navbar.css';
import {
  FaSignInAlt,
  FaPen,
  FaCarAlt,
  FaUserCircle,
  FaClipboardList,
} from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';

export const Navbar = () => {
  const { currentUser, handleUserLogout } = useAuth() || {};
  if (currentUser) {
    console.log('NAVBAR', currentUser);
  }
  const notLogged = !currentUser && (
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
  const adminLogged = currentUser ? (
    currentUser.userType === 'admin' && (
      <>
        <a href="/driverRegisterRequests">
          <div className="nav-button">
            <p className="nav-button-text">Postulaciones</p>
            <FaCarAlt />
          </div>
        </a>
      </>
    )
  ) : (
    <></>
  );
  const driverLogged = currentUser ? (
    currentUser.userType === 'driver' && (
      <>
        <a href="/requestdriver">
          <div className="nav-button">
            <p className="nav-button-text">Solicitudes</p>
            <FaClipboardList />
          </div>
        </a>
        <a href="/profiledriver">
          <div className="nav-button">
            <p className="nav-button-text">Perfil</p>
            <FaUserCircle />
          </div>
        </a>
      </>
    )
  ) : (
    <></>
  );
  const ownerLogged = currentUser ? (
    currentUser.userType === 'owner' && (
      <>
        <a href="/requestowner">
          <div className="nav-button">
            <p className="nav-button-text">Solicitudes</p>
            <FaClipboardList />
          </div>
        </a>
        <a href="/profileowner">
          <div className="nav-button">
            <p className="nav-button-text">Perfil</p>
            <FaUserCircle />
          </div>
        </a>
      </>
    )
  ) : (
    <></>
  );
  const logged = currentUser && (
    <>
      <a href="/" onClick={() => handleUserLogout()}>
        <div className="nav-button">
          <p className="nav-button-text">Salir</p>
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
          {adminLogged}
          {driverLogged}
          {ownerLogged}
          {logged}
        </div>
      </div>
    </header>
  );
};
