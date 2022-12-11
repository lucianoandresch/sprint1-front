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
          setRequests(json.data);
          console.log('REQUESTZ', requestz);
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
    },
    {
      id: 342,
      description: 'Para un auto Suzuki rosa, se solicita llevarlo a revisión',
      payed: false,
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
    return (
      <div className="row">
        <p className="items-margin">Solicitud #{request.id}</p>
        <p className="pending-msg items-margin">(PENDIENTE)</p>
      </div>
    );
  };

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
        <p className="description-container">{`Se necesita llevar a revisión técnica mi auto
        ${request.carModel}(${request.car}), estoy dispuesto(a) a pagar $${request.price},
        necesito que se cumpla esta solicitud a más tardar ${request.expirationDate}, y que
        se retire en la dirección ${request.address}.`}</p>
        <p className="description-container">
          NOTA: {request.extraRequeriments}.
        </p>
      </Collapsible>
    </div>
  ));

  const acceptedTrigger = (request) => {
    const payConfirmedButton = request.payed ? (
      <p className="accepted-msg">(Pago confirmado)</p>
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

  const allRequestsTrigger = (request) => {
    return (
      <div className="row-group">
        <p className="items-margin">Solicitud #{request.id}</p>
        <button className="blue-button items-margin"> Postular</button>
      </div>
    );
  };

  const allRequests = pendingRequests.map((request) => (
    <div className="blue-container">
      <Collapsible
        trigger={
          <div className="row">
            {allRequestsTrigger(request)}
            {detailDropDown}
          </div>
        }
        triggerWhenOpen={
          <div className="row">
            {allRequestsTrigger(request)}
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
          <h2 className="green-title">Solicitudes</h2>
          {allRequests}
        </div>
      </div>
    </>
  );
}
