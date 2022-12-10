import React, { useState } from 'react';
import { Navbar } from './widgets/Navbar';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  birthdate: '',
  rut: '',
  background: '',
  userType: 'owner',
};

export default function RegisterOwner(args) {
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async function handleSubmit(event) {
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...values }),
    };
    fetch(`${process.env.REACT_APP_API_URL}users`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          setError(true);
          return {};
        }
        window.location.reload(false);
        return response.json();
      })
      .catch((err) => {
        setError(true);
        console.log(err);
        setValues(initialValues);
      })
      .finally(() => setLoading(false));
  };
  const handleChange = function handleChange(event) {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <Navbar />
      <div className="titulo">
        <h2>Registrarse como owner</h2>
        <form onSubmit={handleSubmit}>
          <div>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="firstName">firstName:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
            />
          </div>
          <div>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="lastName">lastName:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
            />
          </div>
          <div>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="email">email:</label>
            <input
              type="text"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
          </div>
          <div>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="password">password:</label>
            <input
              type="text"
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
          </div>
          <div>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="rut">rut:</label>
            <input
              type="text"
              id="rut"
              name="rut"
              value={values.rut}
              onChange={handleChange}
            />
          </div>
          <div>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="birthdate">birthdate</label>
            <input
              type="text"
              id="birthdate"
              name="birthdate"
              value={values.birthdate}
              onChange={handleChange}
            />
          </div>
          <div>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="background">background:</label>
            <input
              type="text"
              id="background"
              name="background"
              value={values.background}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Crear</button>
          {error && <p>Algo malo sucedió. Probar nuevamente.</p>}
        </form>
      </div>
    </>
  );
}
