import React, { useEffect, useState } from 'react';
import Collapsible from 'react-collapsible';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import '../styles/requests.css';
import { Navbar } from './widgets/Navbar';

export default function RequestOwner() {
  const { currentUser } = useAuth();
  const [requestz, setRequests] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: currentUser?.token,
      },
    };

    try {
      fetch(`${process.env.REACT_APP_API_URL}car/requests`, requestOptions)
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
  const pendingRequests = [
    {
      id: 341,
      description:
        'Para un auto Suzuki blanco, se solicita llevarlo a revisión',
      payed: true,
      car: 'XY1960',
      price: 45000,
      carModel: 'Suzuki blanco',
      extraRequeriments: 'Tener cuidado con la pintura',
      expirationDate: '2023/03/02',
      address: 'Psje. Universidad 7569',
    },
    {
      id: 342,
      description: 'Para un auto Suzuki rosa, se solicita llevarlo a revisión',
      payed: false,
      applications: [
        { name: 'Juan', accountId: 2 },
        { name: 'Lucas', accountId: 3 },
      ],
    },
  ];
  const detailDropUp = (
    <div className="row">
      <p> Ver detalles </p>
      <FaChevronUp />
    </div>
  );
  const detailDropDown = (
    <div className="row">
      <p className="items-margin"> Ver detalles </p>
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

  const pending = pendingRequests.map((request) => (
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
          <p className="description-container">{request.description}</p>
          {request.applications ? applicationsList(request.applications) : ''}
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

  const accepted = pendingRequests.map((request) => (
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
        <p className="description-container">{request.description}</p>
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
