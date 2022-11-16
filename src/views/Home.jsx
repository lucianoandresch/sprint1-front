import React from 'react';
import landing from '../assets/landing.jpeg';
export default function Home() {
  return (
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
  );
}
