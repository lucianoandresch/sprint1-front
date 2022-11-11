/*
  Component with the footer of the web page
*/

import React from 'react';
import { names, groupName } from '../../assets/staticText';
import '../../styles/footer.css';

export const Footer = () => {
  return (
    <div className="footer-container">
      <p className="names-text">{names}</p>
      <p className="group6-text">{groupName}</p>
    </div>
  );
};
