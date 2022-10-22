/*
  Component with the footer of the web page
*/

import React from 'react';
import '../App.css';
import { names } from '../staticText';
import { groupName } from '../staticText';

export const Footer = () => {
  return (
    <div className="footer-container">
      <p className="names-text">{names}</p>
      <p className="group6-text">{groupName}</p>
    </div>
  );
};
