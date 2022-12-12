import React from 'react';
import Home from './components/Home';
import SignIn from './components/SignIn';
import Register from './components/Register';
import DriverRegisterRequests from './components/DriverRegisterRequests';
import { BrowserRouter as Router1, Route, Routes } from 'react-router-dom';
import AuthContextProvider from './contexts/AuthContext';
import RequestOwner from './components/RequestOwner';
import RequestDriver from './components/RequestDriver';
import RegisterDriver from './components/RegisterDriver';
import RegisterOwner from './components/RegisterOwner';
import NewRequest from './components/newRequest';
import Perfil from './components/Account';

export default function RoutesApp() {
  return (
    <div>
      <Router1>
        <AuthContextProvider>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/registerdriver" element={<RegisterDriver />} />
            <Route exact path="/registerowner" element={<RegisterOwner />} />
            <Route exact path="/signin" element={<SignIn />} />
            <Route
              exact
              path="/DriverRegisterRequests"
              element={<DriverRegisterRequests />}
            />
            <Route exact path="/account" element={<Perfil />} />
            <Route exact path="/requestowner" element={<RequestOwner />} />
            <Route exact path="/requestdriver" element={<RequestDriver />} />
            <Route exact path="/newrequest" element={<NewRequest />} />
          </Routes>
        </AuthContextProvider>
      </Router1>
    </div>
  );
}
