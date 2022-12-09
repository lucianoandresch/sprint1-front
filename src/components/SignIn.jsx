import loginImage from '../assets/login_car.png';
import { welcome } from '../staticText';

import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Navbar } from './widgets/Navbar';

const initialValues = {
  email: '',
  password: '',
};

export default function SignIn() {
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { currentUser, handleUserLogin } = useAuth();
  //const navigate = useNavigate();

  const handleSubmit = async function handleSubmit(event) {
    setLoading(true);
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...values }),
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}auth/login`,
        requestOptions
      );
      if (response.status !== 200) {
        const error = await response.text();
        console.log(error);
        throw new Error(error);
      }
      const user = await response.json();
      console.log(user);
      handleUserLogin(user);
      console.log(user);
      setLoading(false);
    } catch (error) {
      setValues(initialValues);
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  const handleChange = function handleChange(event) {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };
  if (currentUser) return <Navigate to="/" />;
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <Navbar />
      <div className="login-view">
        {currentUser && <Navigate to="/" />}
        <h2 className="login-title">{welcome}</h2>
        <div className="horizontal-div">
          <div>
            <img src={loginImage} alt="login_image" className="login-image" />
          </div>
          <div className="login-form-view">
            <h4 className="form-title">Iniciar sesión</h4>
            <form onSubmit={handleSubmit}>
              <label>
                <p className="form-label">Email</p>
                <input
                  type="text"
                  value={values.email}
                  onChange={handleChange}
                  name="email"
                  className="form-text-field"
                />
              </label>
              <br />
              <label>
                <p className="form-label">Contraseña</p>
                <input
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  name="password"
                  className="form-text-field"
                />
              </label>
              <br />
              <input type="submit" value="Ingresar" className="form-submit" />
            </form>
          </div>
          {errorMessage}
        </div>
      </div>
    </>
  );
}
