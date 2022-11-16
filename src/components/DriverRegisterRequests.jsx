import React, { useEffect, useState } from 'react';
import { Deserializer } from 'jsonapi-serializer';

export default function DriverRegisterRequests() {
  const requests = [
    ['Luciano', 'luciano@gmail.com', 1],
    ['Lucas', 'lucas@gmail.com', 2],
    ['Monica', 'monica@gmail.com', 3],
  ];
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [requestz, setRequests] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${'currentUser?.access_token'}`,
      },
    };

    fetch(`${process.env.REACT_APP_API_URL}/api//`, requestOptions)
      .then((response) => {
        if (response.status !== 200) {
          setMessage(response.text().message);
          return [];
        }
        return response.json();
      })
      .then((data) => {
        new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(
          data,
          (_error, requestz) => setRequests(requestz)
        );
      });
  }, []);

  const handleAccept = async (values) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${'currentUser?.access_token'}`,
      },
      body: JSON.stringify(values),
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api//`,
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
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${'currentUser?.access_token'}`,
      },
      body: JSON.stringify(values),
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api//`,
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

  return (
    <div>
      <div>
        <h2>Requests</h2>
      </div>
      <div>
        {requests.map((req) => (
          <div>
            {req[0]}, {req[1]}, {req[2]}
            <button type="submit" onClick={handleAccept(req)}>
              Accept
            </button>
            <button type="submit" onClick={handleReject(req)}>
              Reject
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
