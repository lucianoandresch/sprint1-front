import React from 'react';
import Home from './components/Home';
import SignIn from './components/SignIn';
import Register from './components/Register';
import { BrowserRouter as Router1, Route, Routes } from 'react-router-dom';
import AuthContextProvider from './contexts/AuthContext';

export default function RoutesApp() {
  return (
    <div>
      <Router1>
        <AuthContextProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/signin" element={<SignIn />} />
        </Routes>
        </AuthContextProvider>
      </Router1> 
    </div>
  );
}
