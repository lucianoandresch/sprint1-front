import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { Navbar } from './widgets/Navbar';
import '../styles/requests.css';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import Collapsible from 'react-collapsible';

export default function DriverRegisterRequests() {
  const { currentUser } = useAuth();
  //const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [requestz, setRequests] = useState([]);
  console.log('USER-BLA', currentUser?.token);

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: currentUser?.token,
      },
    };

    try {
      fetch(`${process.env.REACT_APP_API_URL}driver/requests`, requestOptions)
        .then((response) => {
          if (response.status !== 200) {
            console.log(response.status, response);
            //setMessage(response.text().message);
            return [];
          }
          return response.json();
        })
        .then((json) => {
          setRequests(json.data);
          console.log('requestz', requestz);
        });
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line
  }, []);

  const handleAccept = async (values) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: currentUser?.token,
      },
      body: JSON.stringify({ accept: 'true', driver_request_id: values }),
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}driver/accept`,
        requestOptions
      );
      if (response.status !== 201) {
        console.log(response.status);
        const error = await response.text();
        throw new Error(error);
      }
      setMessage('Request accepted');
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleReject = async (values) => {
    console.log('ENTRA A RECHAZAR');
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: currentUser?.token,
      },
      body: JSON.stringify({ accept: 'false', driver_request_id: values }),
    };
    try {
      console.log('ENTRA A RECHAZAR');
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}driver/accept`,
        requestOptions
      );
      if (response.status !== 201) {
        const error = await response.text();
        throw new Error(error);
      }
      setMessage('Request accepted');
      console.log('STATUS', response.status);
    } catch (error) {
      console.log(error);
      setMessage(error.message);
    }
  };

  const detailDropUp = (
    <div className="row">
      <p> Ocultar detalles </p>
      <FaChevronUp />
    </div>
  );
  const detailDropDown = (
    <div className="row">
      <p className="items-margin"> Ver detalles </p>
      <FaChevronDown />
    </div>
  );

  const requestDetail = (req) => (
    <div className="description-container">
      <p>{`El usuario ${req.firstName} ${req.lastName}(RUT ${req.rut}) de email ${req.email}, fecha de nacimiento ${req.birthDate} quiere registrarse como conductor`}</p>
      <p>Sus antecedentes se pueden ver en el siguiente archivo:</p>
      <p>{req.background}</p>
    </div>
  );

  const allRequestsTrigger = (req) => {
    return (
      <div className="row-group">
        <p className="items-margin">Solicitud #{req.id}</p>
        <button
          className="blue-button items-margin"
          onClick={() => handleAccept(req.id)}
        >
          Aceptar
        </button>
        <button
          className="red-button items-margin"
          onClick={() => handleReject(req.id)}
        >
          Rechazar
        </button>
      </div>
    );
  };

  const allRequests = requestz.map((req) => (
    <div key={req.id} className="blue-container">
      <Collapsible
        trigger={
          <div className="row">
            {allRequestsTrigger(req)}
            {detailDropDown}
          </div>
        }
        triggerWhenOpen={
          <div className="row">
            {allRequestsTrigger(req)}
            {detailDropUp}
          </div>
        }
      >
        {requestDetail(req)}
      </Collapsible>
    </div>
  ));

  return (
    <>
      <Navbar />
      <div className="view-container">
        <h1 className="title">POSTULACIONES</h1>
        <div className="green-container">
          <h2 className="green-title">Postulaciones pendientes</h2>
          {allRequests}
          {message}
        </div>
      </div>
    </>
  );
}
