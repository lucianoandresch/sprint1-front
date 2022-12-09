import React from 'react';
import Driver from './RegisterDriver';
import Owner from './RegisterOwner';
import { Navbar } from './widgets/Navbar';
// import { useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

export default function CategoryDetail() {
  // const {id} = useParams();
  // const [lesson, setLesson] = useState(id);
  return (
    <div>
      <Navbar />
      <Driver />
      <Owner />
    </div>
  );
}
