import React, { useState } from 'react';
import loginImage from '../assets/login_car.png';
import useAuth from '../hooks/useAuth';
import { Navbar } from './widgets/Navbar';

const initialValues = {
  car: '',
  price: '',
  carModel: '',
  extraRequeriments: '',
  expirationDate: '',
  address: '',
};

export default function NewRequest(args) {
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { currentUser } = useAuth();

  const handleSubmit = async function handleSubmit(event) {
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: currentUser?.token,
      },
      body: JSON.stringify({ ...values }),
    };
    fetch(`${process.env.REACT_APP_API_URL}car/request`, requestOptions)
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
          <h2 className="login-title">SOLICITUDES DUEÑO</h2>
          <div className="register-div">
            <div className="column left-align">
              <div>
                <h2 className="blue-subtitle">Crear Solicitud</h2>
                <form onSubmit={handleSubmit}>
                  <div className="row space-between">
                    <label>
                      <p className="register-label">Patente auto</p>
                      <input
                        className="form-text-field"
                        type="text"
                        id="car"
                        name="car"
                        value={values.car}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      <p className="register-label">Dirección</p>
                      <input
                        className="form-text-field"
                        type="text"
                        id="address"
                        name="address"
                        value={values.address}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                  <div className="row space-between">
                    <label>
                      <p className="register-label">Modelo auto</p>
                      <input
                        type="text"
                        value={values.carModel}
                        onChange={handleChange}
                        name="carModel"
                        id="carModel"
                        className="form-text-field"
                      />
                    </label>
                    <label>
                      <p className="register-label">Pago</p>
                      <input
                        type="number"
                        value={values.price}
                        onChange={handleChange}
                        id="price"
                        name="price"
                        className="form-text-field"
                      />
                    </label>
                  </div>
                  <div className="row space-between">
                    <label>
                      <p className="register-label">Fecha expiración</p>
                      <input
                        className="form-text-field"
                        type="date"
                        id="expirationDate"
                        name="expirationDate"
                        value={values.expirationDate}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      <p className="register-label">Requerimientos extra</p>
                      <input
                        className="form-text-field"
                        type="text"
                        id="extraRequeriments"
                        name="extraRequeriments"
                        value={values.extraRequeriments}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                  <button type="submit" className="form-submit">
                    Enviar
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
