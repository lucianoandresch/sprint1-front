import React, { useState } from 'react';
const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  //birthdate
  rut: '',
  background: '',
  userType: 'driver',
};

export default function Newcat(args) {
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // const {fatherid} = args;

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
      // .then((data) => {
      // new Deserializer({ keyForAttribute: 'camelCase' })
      // .deserialize(data, (_error, prop) => setProperties((prevState) => [...prevState, prop]));
      // })
      .catch((err) => {
        setError(true);
        console.log(err);
        setValues(initialValues);
      })
      .finally(() => setLoading(false));
  };
  // values.father_id = fatherid;
  const handleChange = function handleChange(event) {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };
  // let isDisabled = true;
  /* if (values.name && values.description) {
      isDisabled = false;
    }*/
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className="titulo">
      <h2>Registrarse como driver</h2>
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
  );
}
