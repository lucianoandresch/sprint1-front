import React, { useEffect, useState } from 'react';
import Collapsible from 'react-collapsible';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import '../styles/requests.css';
import { Navbar } from './widgets/Navbar';

export default function RequestOwner() {
  const { currentUser } = useAuth();
  const [requestz, setRequests] = useState([]);
  const [applications, setApplications] = useState([]);

  const fetchRequests = (async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: currentUser?.token,
      },
    };

    try {
      fetch(`${process.env.REACT_APP_API_URL}owner/car_requests`, requestOptions)
        .then((response) => {
          if (response.status !== 200) {
            return [];
          }
          return response.json();
        })
        .then((json) => {
          console.log('JSON', json);
          setRequests(json.data);
          console.log('REQUESTS', requestz);
        });
    } catch (error) {
      console.log(error);
    }
  });

  const fetchApplications = (async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: currentUser?.token,
      },
    };

    try {
      fetch(`${process.env.REACT_APP_API_URL}owner/postulations`, requestOptions)
        .then((response) => {
          if (response.status !== 200) {
            return [];
          }
          return response.json();
        })
        .then((json) => {
          console.log('JSON', json);
          setApplications(json.data);
          console.log('APPLICATIONS', applications);
        });
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    fetchRequests()
    fetchApplications()
    // eslint-disable-next-line
  }, []);

  const handleRequest = async (values, statusRequest) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: currentUser?.token,
      },
      body: JSON.stringify({ postulation_id: values, status: statusRequest }),
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}postulation/update`,
        requestOptions
      );
      if (response.status !== 201) {
        console.log(response.status);
        const error = await response.text();
        throw new Error(error);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const detailDropUp = (
    <div className="row">
      <p> Ver detalles </p>
      <FaChevronUp />
    </div>
  );
  const detailDropDown = (
    <div className="row">
      <p className="items-margin"> | Ver detalles </p>
      <FaChevronDown />
    </div>
  );

  const pendingTrigger = (request) => {
    const pendingApplications = request.applications ? (
      <p>Actualmente hay {request.applications.length} postulantes</p>
    ) : (
      <p>Actualmente no hay postulantes</p>
    );
    return (
      <div className="row">
        <p className="items-margin">Solicitud #{request.id}</p>
        <p className="pending-msg items-margin">(PENDIENTE)</p>
        {pendingApplications}
      </div>
    );
  };

  const applicationsList = (applications) => {
    const items = applications.map((item) => (
      <div className="blue-container applications">
        <p className="items-margin">{item.name}</p>
        <div className="row-group">
          <button className="green-button items-margin">Ver perfil</button>
          <button className="blue-button items-margin">Aceptar</button>
          <button className="red-button items-margin">Rechazar</button>
        </div>
      </div>
    ));
    return (
      <div className="column">
        <h3>Postulantes</h3>
        {items}
      </div>
    );
  };

  const pendingApps = applications.filter((item) => {
    return (
      item.user_id === currentUser.id
    );
  });

  const pending = requestz.map((request) => (
    <div className="blue-container">
      <Collapsible
        trigger={
          <div className="row">
            {pendingTrigger(request)}
            {detailDropDown}
          </div>
        }
        triggerWhenOpen={
          <div className="row">
            {pendingTrigger(request)}
            {detailDropUp}
          </div>
        }
      >
        <div>
          <p className="description-container"> Para un auto {request.carModel} se solicita llevarlo a revisión.</p>
          <p className="description-container">{request.extraRequeriments}</p>
          <p className="description-container"> Se necesita que se haga antes de {request.expirationDate}</p>
          {applications ? applicationsList(applications) : ''}
        </div>
      </Collapsible>
    </div>
  ));

  const acceptedTrigger = (request) => {
    const payConfirmedButton = request.payed ? (
      <p className="accepted-msg">Pago confirmado</p>
    ) : (
      <button className="blue-button items-margin"> Confirmar pago</button>
    );
    return (
      <div className="row">
        <p className="items-margin">Solicitud #{request.id}</p>
        <p className="accepted-msg items-margin">(ACEPTADA)</p>
        {payConfirmedButton}
      </div>
    );
  };

  const acceptedRequests = requestz.filter((item) => {
    return (
      item.status !== 'aceptada' ||
      item.status !== 'pagada' ||
      item.status !== 'completada'
    );
  });

  const accepted = acceptedRequests.map((request) => (
    <div className="blue-container">
      <Collapsible
        trigger={
          <div className="row">
            {acceptedTrigger(request)}
            {detailDropDown}
          </div>
        }
        triggerWhenOpen={
          <div className="row">
            {acceptedTrigger(request)}
            {detailDropUp}
          </div>
        }
      >
        <p className="description-container">{request.price}</p>
      </Collapsible>
    </div>
  ));

  const newRequestButton = (
    <a href="/newrequest">
      <div className="blue-button new-button">
        <p className="nav-button-text">Nueva solicitud</p>
      </div>
    </a>
  );

  return (
    <>
      <Navbar />
      <div className="view-container">
        <h1 className="title">SOLICITUDES</h1>
        {newRequestButton}
        <div className="register-div column">
          <h2 className="green-title">Solicitudes Pendientes</h2>
          {pending}
          <h2 className="green-title">Solicitudes Aceptadas</h2>
          {accepted}
        </div>
      </div>
      <div className="empty-div-footer"></div>
    </>
  );
}
