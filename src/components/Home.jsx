import React from 'react';
import landing from '../assets/images/landing.jpeg';
import '../styles/home.css';
import useAuth from '../hooks/useAuth';
export default function Home() {
  const {currentUser, handleUserLogout} = useAuth();
  return (
    <div>
      { currentUser ? (
      <>
        <h3>Logged</h3> 
        <h3>{currentUser.firstName}</h3> 
      </>
      ): (
      <>
        <h2>Not Logged</h2>
        <div className="home-container">
          <img src={landing} alt="landing_image" className="home-landing-image" />
          <div className="home-row">
            <i className="home-message">
              “Los tramites de tu auto ya no son un problema”
            </i>
            <h1 className="home-line">-</h1>
            <h1 className="home-group6"> Grupo 6</h1>
          </div>
        </div>
      </>
        )}
    </div>
  );
}
