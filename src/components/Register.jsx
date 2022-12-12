import React from 'react';
import loginImage from '../assets/login_car.png';
import { Navbar } from './widgets/Navbar';
// import { useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

export default function CategoryDetail() {
  // const {id} = useParams();
  // const [lesson, setLesson] = useState(id);
  return (
    <div>
      <Navbar />
      <div className="login-view">
        <h2 className="login-title">Registro</h2>
        <div className="register-div">
          <div>
            <img src={loginImage} alt="login_image" className="login-image" />
          </div>
          <div className="login-form-view register">
            <a href="/registerdriver" className="large-button">
              Registrarse como Chofer
            </a>
            <a href="/registerowner" className="large-button">
              Registrarse como Dueño
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
