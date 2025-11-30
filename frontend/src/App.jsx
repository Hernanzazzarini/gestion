import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Capacitaciones from './pages/Capacitaciones';
import ReportesPage from "./pages/ReportesPage";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/capacitaciones" element={<Capacitaciones />} />
        <Route path="/reportes" element={<ReportesPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;



