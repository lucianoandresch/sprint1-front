import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';

export default function DriverRegisterRequests() {
  const { currentUser } = useAuth();
  //const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [requestz, setRequests] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `${currentUser?.token}`,
      },
    };

    try {
      fetch(`${process.env.REACT_APP_API_URL}driver/requests`, requestOptions)
        .then((response) => {
          if (response.status !== 200) {
            console.log(response);
            //setMessage(response.text().message);
            return [];
          }
          return response.json();
        })
        .then((json) => {
          console.log('RESPUESTA', json);
          setRequests(json.data);
          console.log('data', json.data);
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
        Authorization: `Bearer ${'currentUser?.access_token'}`,
      },
      body: JSON.stringify({ accept: 'true', driver_request_id: values }),
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}driver/accept`,
        requestOptions
      );
      if (response.status !== 201) {
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
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${'currentUser?.access_token'}`,
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

  return (
    <div>
      <div>
        <h2>Requests</h2>
      </div>
      <div>
        {requestz.map((req) => (
          <div key={req.id}>
            {console.log(req)}
            {req.firstName}
            {req.lastName}
            {req.email}
            {req.rut}
            {req.backgorund}
            {req.birthDate}
            {req.id}
            <form onSubmit={() => handleAccept(req.id)}>
              <input type="submit" value="Aceptar" className="form-submit" />
            </form>
            <form onSubmit={() => handleReject(req.id)}>
              <input type="submit" value="Rechazar" className="form-submit" />
            </form>
          </div>
        ))}
        {message}
      </div>
    </div>
  );
}
