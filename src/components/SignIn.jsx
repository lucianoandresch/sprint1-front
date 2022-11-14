import loginImage from '../assets/login_car.png';
import { welcome } from '../staticText';
import { FaEye } from 'react-icons/fa';

export default function SignIn() {
  return (
    <div className="login-view">
      <h2 className="login-title">{welcome}</h2>
      <div className="green-container">
        <div>
          <img src={loginImage} alt="login_image" className="login-image" />
        </div>
        <div className="login-form-view">
          <h4 className="form-title">Iniciar sesión</h4>
          <form>
            <label>
              <p className="form-label">Nombre</p>
              <input type="text" name="name" className="form-text-field" />
            </label>
            <br />
            <label>
              <p className="form-label">Contraseña</p>
              <input type="password" name="pass" className="form-text-field" />
            </label>
            <br />
            <input type="submit" value="Ingresar" className="form-submit" />
          </form>
        </div>
      </div>
      <FaEye />
    </div>
  );
}
