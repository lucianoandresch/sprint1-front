import './App.css';
import RoutesApp from './Routes';
import { Footer } from './components/widgets/Footer';
import { Navbar } from './components/widgets/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <RoutesApp />
      <Footer />
    </div>
  );
}

export default App;
