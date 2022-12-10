import React, { useState } from 'react';
import { Navbar } from './widgets/Navbar';
import loginImage from '../assets/login_car.png';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  birthdate: '',
  rut: '',
  background: '',
  userType: 'driver',
};

export default function RegisterDriver(args) {
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
    fetch(`${process.env.REACT_APP_API_URL}driver/register`, requestOptions)
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
      <div>
        <div className="login-view">
          <h2 className="login-title">CHOFER</h2>
          <div className="register-div">
            <div className="column left-align">
              <div className="row space-between">
                <h2 className="blue-subtitle">Registro</h2>
              </div>
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="row space-between">
                    <label>
                      <p className="form-label">Nombre</p>
                      <input
                        className="form-text-field"
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      <p className="form-label">Apellido</p>
                      <input
                        className="form-text-field"
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                  <div className="row">
                    <label>
                      <p className="form-label">Email</p>
                      <input
                        type="text"
                        value={values.email}
                        onChange={handleChange}
                        name="email"
                        id="email"
                        className="form-text-field"
                      />
                    </label>
                    <label>
                      <p className="form-label">Contraseña</p>
                      <input
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        id="password"
                        name="password"
                        className="form-text-field"
                      />
                    </label>
                  </div>
                  <div className="row">
                    <label>
                      <p className="form-label">RUT</p>
                      <input
                        className="form-text-field"
                        type="text"
                        id="rut"
                        name="rut"
                        value={values.rut}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      <p className="form-label">Fecha de nacimiento</p>
                      <input
                        className="form-text-field"
                        type="date"
                        id="birthdate"
                        name="birthdate"
                        value={values.birthdate}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                  <div className="row">
                    <label>
                      <p className="form-label">Documentos</p>
                      <input
                        className="form-text-field"
                        type="text"
                        id="background"
                        name="background"
                        value={values.background}
                        onChange={handleChange}
                      />
                    </label>
                    <button className="secondary-button">
                      Adjuntar archivo
                    </button>
                  </div>
                  <button type="submit" className="form-submit">
                    Registrarse
                  </button>
                  {error && <p>Algo malo sucedió. Probar nuevamente.</p>}
                </form>
              </div>
            </div>
            <div className="form-bottom-right-image">
              <img
                src={loginImage}
                alt="login_image"
                className="form-corner-image"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
