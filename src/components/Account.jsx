import React, { useEffect, useState } from 'react';
import Collapsible from 'react-collapsible';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import '../styles/requests.css';
import { Navbar } from './widgets/Navbar';

export default function RequestOwner() {
  const { currentUser } = useAuth();
  const [requestz, setRequests] = useState([]);
  console.log(currentUser.userId);

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: currentUser?.token,
      },
    };

    try {
      fetch(`${process.env.REACT_APP_API_URL}users/${currentUser.userId}`, requestOptions)
        .then((response) => {
          if (response.status !== 200) {
            return [];
          }
          return response.json();
        })
        .then((json) => {
          console.log('JSON', json);
          console.log('REQUESTS', requestz);
          setRequests(json.data);
        });
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Navbar />
      <div className="view-container">
        <h1 className="title">Mi Perfil</h1>
        <h5>Primer Nombre: {requestz.firstName}</h5>
        <h5>Apellido: {requestz.lastName}</h5>
        <h5>Antecedentes: {requestz.background}</h5>
        <h5>Email: {requestz.email}</h5>
        <h5>Rating: {requestz.rating}</h5>
      </div>
      <div className="empty-div-footer"></div>
    </>
  );
}
