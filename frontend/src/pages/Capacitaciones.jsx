import { useEffect, useState } from "react";
import { obtenerCapacitaciones, crearCapacitacion } from "../services/capacitacionesService";

export default function Capacitaciones() {
  const [lista, setLista] = useState([]);
  const [formData, setFormData] = useState({
    fecha: "",
    operario: "",
    sector: "",
    nombre_capacitacion: "",
    dictado: "insitu",
    nota: "",
  });

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
      cargarDatos(); // refresca la tabla
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Gestión de Capacitaciones</h2>

      {/* FORMULARIO */}
      <form className="row g-3 mt-3" onSubmit={handleSubmit}>
        <div className="col-md-3">
          <label className="form-label">Fecha</label>
          <input type="date" name="fecha" className="form-control" onChange={handleChange}/>
        </div>

        <div className="col-md-3">
          <label className="form-label">Operario</label>
          <input type="text" name="operario" className="form-control" onChange={handleChange}/>
        </div>

        <div className="col-md-3">
          <label className="form-label">Sector</label>
          <input type="text" name="sector" className="form-control" onChange={handleChange}/>
        </div>

        <div className="col-md-4">
          <label className="form-label">Nombre capacitación</label>
          <input type="text" name="nombre_capacitacion" className="form-control" onChange={handleChange}/>
        </div>

        <div className="col-md-3">
          <label className="form-label">Dictado</label>
          <select name="dictado" className="form-select" onChange={handleChange}>
            <option value="insitu">In Situ</option>
            <option value="classroom">Classroom</option>
          </select>
        </div>

        <div className="col-md-2">
          <label className="form-label">Nota</label>
          <input type="number" step="0.01" name="nota" className="form-control" onChange={handleChange}/>
        </div>

        <div className="col-12">
          <button className="btn btn-primary">Guardar</button>
        </div>
      </form>

      {/* TABLA */}
      <table className="table table-striped mt-5">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Operario</th>
            <th>Sector</th>
            <th>Capacitación</th>
            <th>Dictado</th>
            <th>Nota</th>
          </tr>
        </thead>

        <tbody>
          {lista.map((cap) => (
            <tr key={cap.id}>
              <td>{cap.fecha}</td>
              <td>{cap.operario}</td>
              <td>{cap.sector}</td>
              <td>{cap.nombre_capacitacion}</td>
              <td>{cap.dictado}</td>
              <td>{cap.nota}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
