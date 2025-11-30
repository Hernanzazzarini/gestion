import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";   // ⬅️ AGREGADO
import { obtenerCapacitaciones, crearCapacitacion } from "../services/capacitacionesService";

export default function Capacitaciones() {
  const navigate = useNavigate();  // ⬅️ AGREGADO

  const [lista, setLista] = useState([]);
  const [formData, setFormData] = useState({
    fecha: "",
    operario: "",
    sector: "",
    nombre_capacitacion: "",
    dictado: "insitu",
    nota: "",
    quien_realizo: ""
  });

  // FILTROS
  const [filtroOperario, setFiltroOperario] = useState("");
  const [filtroSector, setFiltroSector] = useState("");
  const [filtroCapacitacion, setFiltroCapacitacion] = useState("");

  const cargarDatos = async () => {
    try {
      const data = await obtenerCapacitaciones();
      setLista(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crearCapacitacion(formData);
      cargarDatos();

      // Reset del formulario
      setFormData({
        fecha: "",
        operario: "",
        sector: "",
        nombre_capacitacion: "",
        dictado: "insitu",
        nota: "",
        quien_realizo: ""
      });
    } catch (err) {
      console.error(err);
    }
  };

  // FILTRADO
  const listaFiltrada = lista.filter((cap) => {
    return (
      cap.operario.toLowerCase().includes(filtroOperario.toLowerCase()) &&
      cap.sector.toLowerCase().includes(filtroSector.toLowerCase()) &&
      cap.nombre_capacitacion.toLowerCase().includes(filtroCapacitacion.toLowerCase())
    );
  });

  return (
    <div className="container mt-4">
      
      {/* TITULO + BOTON REPORTES */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Gestión de Capacitaciones</h2>

        <button className="btn btn-info" onClick={() => navigate("/reportes")}>
          📊 Ver Reportes
        </button>
      </div>

      {/* FORMULARIO */}
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-3">
          <label className="form-label">Fecha</label>
          <input type="date" name="fecha" className="form-control" value={formData.fecha} onChange={handleChange} />
        </div>

        <div className="col-md-3">
          <label className="form-label">Operario</label>
          <input type="text" name="operario" className="form-control" value={formData.operario} onChange={handleChange} />
        </div>

        <div className="col-md-3">
          <label className="form-label">Sector</label>
          <input type="text" name="sector" className="form-control" value={formData.sector} onChange={handleChange} />
        </div>

        <div className="col-md-4">
          <label className="form-label">Nombre capacitación</label>
          <input type="text" name="nombre_capacitacion" className="form-control" value={formData.nombre_capacitacion} onChange={handleChange} />
        </div>

        <div className="col-md-3">
          <label className="form-label">Dictado</label>
          <select name="dictado" className="form-select" value={formData.dictado} onChange={handleChange}>
            <option value="insitu">In Situ</option>
            <option value="classroom">Classroom</option>
          </select>
        </div>

        <div className="col-md-2">
          <label className="form-label">Nota</label>
          <input type="number" step="0.01" name="nota" className="form-control" value={formData.nota} onChange={handleChange} />
        </div>

        <div className="col-md-3">
          <label className="form-label">Quién realizó la capacitación</label>
          <input
            type="text"
            name="quien_realizo"
            className="form-control"
            value={formData.quien_realizo}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <button className="btn btn-primary mt-2">Guardar</button>
        </div>
      </form>

      {/* FILTROS */}
      <div className="row mt-5 mb-3">
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Filtrar por operario"
            value={filtroOperario}
            onChange={(e) => setFiltroOperario(e.target.value)}
          />
        </div>

        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Filtrar por sector"
            value={filtroSector}
            onChange={(e) => setFiltroSector(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Filtrar por capacitación"
            value={filtroCapacitacion}
            onChange={(e) => setFiltroCapacitacion(e.target.value)}
          />
        </div>
      </div>

      {/* TABLA CON SCROLL */}
      <div
        className="mt-4 shadow-sm"
        style={{
          maxHeight: "380px",
          overflowY: "auto",
          border: "1px solid #dcdcdc",
          borderRadius: "8px",
          padding: "10px",
          background: "white",
        }}
      >
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>Fecha</th>
              <th>Operario</th>
              <th>Sector</th>
              <th>Capacitación</th>
              <th>Dictado</th>
              <th>Nota</th>
              <th>Quién Realizó</th>
            </tr>
          </thead>

          <tbody>
            {listaFiltrada.length > 0 ? (
              listaFiltrada.map((cap) => (
                <tr key={cap.id}>
                  <td>{cap.fecha}</td>
                  <td>{cap.operario}</td>
                  <td>{cap.sector}</td>
                  <td>{cap.nombre_capacitacion}</td>
                  <td>{cap.dictado}</td>
                  <td>{cap.nota}</td>
                  <td>{cap.quien_realizo}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-3">
                  No se encontraron resultados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
