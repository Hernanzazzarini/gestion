import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Capacitaciones from './pages/Capacitaciones';
import ReportesPage from "./pages/ReportesPage";
import Reclamos from "./pages/Reclamos";
import ReporteReclamos from "./pages/ReporteReclamos";
import Proveedores from "./pages/Proveedores";


function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/capacitaciones" element={<Capacitaciones />} />
        <Route path="/reportes" element={<ReportesPage />} />
        <Route path="/reclamos" element={<Reclamos />} /> 
        <Route path="/reporte-reclamos" element={<ReporteReclamos />} />
        <Route path="/proveedores" element={<Proveedores />} />
       

      </Routes>

      <Footer />
    </>
  );
}

export default App;



