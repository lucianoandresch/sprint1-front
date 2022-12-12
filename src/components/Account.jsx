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
        <h2 className="login-title">Mi Perfil</h2>
      </div>
    </div>
  );
}
