import React from 'react';
import '../styles/requests.css';
import Collapsible from 'react-collapsible';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { Navbar } from './widgets/Navbar';

export default function RequestOwner() {
  const pendingRequests = [
    {
      id: 341,
      description:
        'Para un auto Suzuki blanco, se solicita llevarlo a revisión',
      payed: true,
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

  return (
    <>
      <Navbar />
      <div className="view-container">
        <h1 className="title">SOLICITUDES</h1>
        <div className="green-container">
          <h2 className="green-title">Solicitudes Pendientes</h2>
          {pending}
          <h2 className="green-title">Solicitudes Aceptadas</h2>
          {accepted}
        </div>
      </div>
    </>
  );
}
