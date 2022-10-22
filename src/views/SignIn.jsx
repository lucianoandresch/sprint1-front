import { primaryBlue } from '../styles/variables';
import loginImage from '../assets/login_car.png';
import { welcome } from '../staticText';

export default function SignIn() {
  return (
    <div style={{ alignItems: 'center', textAlign: 'center' }}>
      <h2
        style={{
          color: primaryBlue,
          textAlign: 'center',
          fontWeight: '800',
        }}
      >
        {welcome}
      </h2>
      <div className="green-container">
        <div>
          <img src={loginImage} alt="login_image" style={{ width: '50%' }} />
        </div>
        <form>
          <label>
            Name:
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}
