import { useEffect, useState } from "react";
import { obtenerOperarios, obtenerTareas, crearTarea, actualizarTarea } from "../services/cronogramaService";

export default function Cronograma() {
  const [operarios, setOperarios] = useState([]);
  const [tareas, setTareas] = useState([]);
  const [form, setForm] = useState({
    responsable_id: "",
    tarea_asignada: "",
    fecha_ejecucion: "",
    fecha_limite: "",
    fecha_finalizacion: "",
    estado: "EN_PROCESO",
    observaciones: "",
    archivos: []
  });
  const [filtroResponsable, setFiltroResponsable] = useState("");
  const [tareaEditar, setTareaEditar] = useState(null);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    setOperarios(await obtenerOperarios());
    setTareas(await obtenerTareas());
  };

  const hoy = new Date();
  const diasHastaVencimiento = (fechaLimite) => {
    const limite = new Date(fechaLimite);
    const diff = limite - hoy;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const getEstadoColor = (tarea) => {
    const dias = diasHastaVencimiento(tarea.fecha_limite);
    if (tarea.estado === "FINALIZADA") return "bg-success";
    if (dias < 0) return "bg-danger";
    if (dias === 0) return "bg-warning text-dark";
    if (dias <= 15) return "bg-info";
    return "bg-primary";
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "archivos") setForm({ ...form, archivos: files });
    else setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crearTarea(form);
      await cargarDatos();
      e.target.reset();
      setForm({
        responsable_id: "",
        tarea_asignada: "",
        fecha_ejecucion: "",
        fecha_limite: "",
        fecha_finalizacion: "",
        estado: "EN_PROCESO",
        observaciones: "",
        archivos: []
      });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEditarSubmit = async (e) => {
    e.preventDefault();
    try {
      await actualizarTarea(tareaEditar.id, {
        estado: tareaEditar.estado,
        fecha_finalizacion: tareaEditar.fecha_finalizacion,
        observaciones: tareaEditar.observaciones
      });
      setTareaEditar(null);
      cargarDatos();
    } catch (err) {
      alert(err.message);
    }
  };

  const tareasFiltradas = filtroResponsable
    ? tareas.filter(t => t.responsable?.id === parseInt(filtroResponsable))
    : tareas;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Cronograma de Tareas</h2>

      {/* FILTRO POR RESPONSABLE */}
      <div className="card card-body mb-4">
        <label className="form-label">Filtrar por Responsable</label>
        <select
          className="form-select"
          value={filtroResponsable}
          onChange={e => setFiltroResponsable(e.target.value)}
        >
          <option value="">Todos</option>
          {operarios.map(o => (
            <option key={o.id} value={o.id}>{o.nombre}</option>
          ))}
        </select>
      </div>

      {/* FORMULARIO CREAR TAREA */}
      <form className="card card-body mb-4" onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Responsable</label>
            <select className="form-select" name="responsable_id" required onChange={handleChange}>
              <option value="">Seleccionar</option>
              {operarios.map(o => <option key={o.id} value={o.id}>{o.nombre}</option>)}
            </select>
          </div>
          <div className="col-md-8">
            <label className="form-label">Tarea</label>
            <input className="form-control" name="tarea_asignada" required onChange={handleChange} />
          </div>
          <div className="col-md-3">
            <label className="form-label">Fecha ejecución</label>
            <input type="date" className="form-control" name="fecha_ejecucion" required onChange={handleChange} />
          </div>
          <div className="col-md-3">
            <label className="form-label">Fecha límite</label>
            <input type="date" className="form-control" name="fecha_limite" required onChange={handleChange} />
          </div>
          <div className="col-md-3">
            <label className="form-label">Fecha finalización</label>
            <input type="date" className="form-control" name="fecha_finalizacion" onChange={handleChange} />
          </div>
          <div className="col-md-3">
            <label className="form-label">Estado</label>
            <select className="form-select" name="estado" onChange={handleChange}>
              <option value="EN_PROCESO">En proceso</option>
              <option value="FINALIZADA">Finalizada</option>
            </select>
          </div>
          <div className="col-md-12">
            <label className="form-label">Observaciones</label>
            <textarea className="form-control" name="observaciones" onChange={handleChange} />
          </div>
          <div className="col-md-12">
            <label className="form-label">Archivos</label>
            <input type="file" className="form-control" name="archivos" multiple onChange={handleChange} />
          </div>
          <div className="col-md-12 text-end">
            <button className="btn btn-primary">Crear Tarea</button>
          </div>
        </div>
      </form>

      {/* TABLA DE TAREAS */}
      <div className="table-responsive mb-4">
        <table className="table table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th>Responsable</th>
              <th>Tarea</th>
              <th>Fecha ejecución</th>
              <th>Fecha límite</th>
              <th>Estado</th>
              <th>Observaciones</th>
              <th>Archivos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tareasFiltradas.map(t => (
              <tr key={t.id}>
                <td>{t.responsable?.nombre}</td>
                <td>{t.tarea_asignada}</td>
                <td>{t.fecha_ejecucion}</td>
                <td>{t.fecha_limite}</td>
                <td>
                  <span className={`badge ${getEstadoColor(t)}`}>{t.estado}</span>
                </td>
                <td>{t.observaciones}</td>
                <td>
                  {t.archivos?.map(a => (
                    <a key={a.id} href={a.archivo_url} target="_blank" className="me-1">📄</a>
                  ))}
                </td>
                <td>
                  <button className="btn btn-sm btn-success" onClick={() => setTareaEditar(t)}>Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL EDITAR TAREA */}
      {tareaEditar && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog">
            <form className="modal-content" onSubmit={handleEditarSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">Editar Tarea</h5>
                <button type="button" className="btn-close" onClick={() => setTareaEditar(null)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Estado</label>
                  <select className="form-select" value={tareaEditar.estado} onChange={e => setTareaEditar({...tareaEditar, estado: e.target.value})}>
                    <option value="EN_PROCESO">En proceso</option>
                    <option value="FINALIZADA">Finalizada</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Fecha finalización</label>
                  <input type="date" className="form-control" value={tareaEditar.fecha_finalizacion || ""} onChange={e => setTareaEditar({...tareaEditar, fecha_finalizacion: e.target.value})} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Observaciones</label>
                  <textarea className="form-control" value={tareaEditar.observaciones || ""} onChange={e => setTareaEditar({...tareaEditar, observaciones: e.target.value})}></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setTareaEditar(null)}>Cerrar</button>
                <button type="submit" className="btn btn-primary">Guardar cambios</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
