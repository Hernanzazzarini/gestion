import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Capacitaciones from './pages/Capacitaciones';

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/capacitaciones" element={<Capacitaciones />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;



