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

  const handleAccept = async (values) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: currentUser?.token,
      },
      body: JSON.stringify({ car_request_id: values }),
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}postulation`,
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

  const pendingTrigger = (request) => {
    return (
      <div className="row">
        <p className="items-margin">Solicitud #{request.id}</p>
        <p className="pending-msg items-margin">(PENDIENTE)</p>
      </div>
    );
  };

  const pendingRequests = requestz.filter((item) => {
    return item.status === 'pendiente';
  });

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

  const acceptedRequests = requestz.filter((item) => {
    return (
      item.status === 'aceptada' ||
      item.status === 'pagada' ||
      item.status === 'completada'
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

  const driverRequest = requestz.filter((item) => {
    return (
      item.status !== 'aceptada' ||
      item.status !== 'pagada' ||
      item.status !== 'completada'
    );
  });

  const allRequestsTrigger = (request) => {
    return (
      <div className="row-group">
        <p className="items-margin">Solicitud #{request.id}</p>
        <button
          className="blue-button items-margin"
          onClick={() => handleAccept(request.id)}
        >
          Postular
        </button>
      </div>
    );
  };

  const allRequests = driverRequest.map((request) => (
    <div className="blue-container" id={request.id}>
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
