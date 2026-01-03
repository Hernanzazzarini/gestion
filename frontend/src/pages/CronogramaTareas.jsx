import { useEffect, useState } from "react";
import {
  obtenerAreas,
  obtenerResponsables,
  obtenerTareas,
  crearTarea,
  actualizarEstadoTarea
} from "../services/cronogramaService";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import dayjs from "dayjs";

export default function CronogramaTareas() {
  const [areas, setAreas] = useState([]);
  const [responsables, setResponsables] = useState([]);
  const [tareas, setTareas] = useState([]);
  const [filtros, setFiltros] = useState({ responsable: "", area: "" });

  const [form, setForm] = useState({
    responsable: "",
    area: "",
    tarea: "",
    fecha_ejecucion: "",
    fecha_limite: "",
    estado: "EN_PROCESO",
    observaciones: "",
    archivo: null
  });

  useEffect(() => {
    async function fetchData() {
      try {
        setAreas(await obtenerAreas());
        setResponsables(await obtenerResponsables());
        await actualizarTareas();
      } catch (err) {
        console.error(err);
        alert("Error al cargar datos: " + err.message);
      }
    }
    fetchData();
  }, []);

  const actualizarTareas = async () => {
    try {
      const tareasData = await obtenerTareas(filtros);
      setTareas(tareasData);
    } catch (err) {
      console.error(err);
      alert("Error al actualizar tareas: " + err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({ ...prev, [name]: value }));
  };

  const aplicarFiltros = async () => {
    await actualizarTareas();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.tarea || !form.responsable || !form.area || !form.fecha_ejecucion || !form.fecha_limite) {
      return alert("Completa todos los campos obligatorios.");
    }
    const data = new FormData();
    for (let key in form) {
      if (key === "archivo" && form.archivo) data.append(key, form.archivo);
      else data.append(key, form[key]);
    }
    try {
      await crearTarea(data);
      alert("Tarea creada!");
      setForm({
        responsable: "",
        area: "",
        tarea: "",
        fecha_ejecucion: "",
        fecha_limite: "",
        estado: "EN_PROCESO",
        observaciones: "",
        archivo: null
      });
      await actualizarTareas();
    } catch (err) {
      console.error(err);
      alert("Error al crear tarea: " + err.message);
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    const { draggableId, destination } = result;
    try {
      await actualizarEstadoTarea(draggableId, destination.droppableId);
      await actualizarTareas();
    } catch (err) {
      console.error(err);
      alert("No se pudo actualizar el estado: " + err.message);
    }
  };

  const obtenerColor = (tarea) => {
    const hoy = dayjs();
    if (!tarea.fecha_limite) return "bg-light text-dark";

    const limite = dayjs(tarea.fecha_limite);
    const estado = tarea.estado?.toUpperCase();

    if (estado === "FINALIZADA") return "bg-success text-white";
    if (limite.isBefore(hoy, "day")) return "bg-danger text-white"; // Vencida
    if (limite.diff(hoy, "day") <= 2) return "bg-warning text-dark"; // Por vencer
    return "bg-info text-dark"; // Normal
  };

  const tareasEnProceso = tareas.filter(t => t.estado?.toUpperCase() === "EN_PROCESO");
  const tareasFinalizadas = tareas.filter(t => t.estado?.toUpperCase() === "FINALIZADA");

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Cronograma de Tareas Profesional</h2>

      {/* Leyenda de colores */}
      <div className="mb-4">
        <h5>Leyenda de colores</h5>
        <div className="d-flex gap-3 flex-wrap">
          <div className="px-3 py-2 rounded bg-info text-dark">En proceso</div>
          <div className="px-3 py-2 rounded bg-warning text-dark">Por vencer (≤2 días)</div>
          <div className="px-3 py-2 rounded bg-danger text-white">Vencida</div>
          <div className="px-3 py-2 rounded bg-success text-white">Finalizada</div>
        </div>
      </div>

      {/* Filtros */}
      <div className="row mb-3">
        <div className="col-md-3">
          <label>Filtrar por Responsable</label>
          <select name="responsable" value={filtros.responsable} onChange={handleFiltroChange} className="form-select">
            <option value="">Todos</option>
            {responsables.map(r => <option key={r.id} value={r.id}>{r.nombre}</option>)}
          </select>
        </div>
        <div className="col-md-3">
          <label>Filtrar por Área</label>
          <select name="area" value={filtros.area} onChange={handleFiltroChange} className="form-select">
            <option value="">Todas</option>
            {areas.map(a => <option key={a.id} value={a.id}>{a.nombre}</option>)}
          </select>
        </div>
        <div className="col-md-2 d-flex align-items-end">
          <button className="btn btn-secondary" onClick={aplicarFiltros}>Aplicar filtros</button>
        </div>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="mb-5">
        <div className="row g-3">
          <div className="col-md-3">
            <label>Responsable</label>
            <select name="responsable" value={form.responsable} onChange={handleChange} className="form-select" required>
              <option value="">Seleccionar</option>
              {responsables.map(r => <option key={r.id} value={r.id}>{r.nombre}</option>)}
            </select>
          </div>
          <div className="col-md-3">
            <label>Área</label>
            <select name="area" value={form.area} onChange={handleChange} className="form-select" required>
              <option value="">Seleccionar</option>
              {areas.map(a => <option key={a.id} value={a.id}>{a.nombre}</option>)}
            </select>
          </div>
          <div className="col-md-6">
            <label>Tarea</label>
            <input type="text" name="tarea" value={form.tarea} onChange={handleChange} className="form-control" required />
          </div>
          <div className="col-md-3">
            <label>Fecha Ejecución</label>
            <input type="date" name="fecha_ejecucion" value={form.fecha_ejecucion} onChange={handleChange} className="form-control" required />
          </div>
          <div className="col-md-3">
            <label>Fecha Límite</label>
            <input type="date" name="fecha_limite" value={form.fecha_limite} onChange={handleChange} className="form-control" required />
          </div>
          <div className="col-md-3">
            <label>Estado</label>
            <select name="estado" value={form.estado} onChange={handleChange} className="form-select">
              <option value="EN_PROCESO">En proceso</option>
              <option value="FINALIZADA">Finalizada</option>
            </select>
          </div>
          <div className="col-md-3">
            <label>Archivo</label>
            <input type="file" name="archivo" onChange={handleChange} className="form-control" />
          </div>
          <div className="col-12">
            <label>Observaciones</label>
            <textarea name="observaciones" value={form.observaciones} onChange={handleChange} className="form-control"></textarea>
          </div>
          <div className="col-12 text-end mt-2">
            <button type="submit" className="btn btn-primary">Crear Tarea</button>
          </div>
        </div>
      </form>

      {/* Kanban Drag & Drop */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="row">
          {[
            { estado: "EN_PROCESO", titulo: "En proceso", tareas: tareasEnProceso },
            { estado: "FINALIZADA", titulo: "Finalizadas", tareas: tareasFinalizadas }
          ].map(col => (
            <div className="col-md-6" key={col.estado}>
              <h5>{col.titulo}</h5>
              <Droppable droppableId={col.estado}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{ minHeight: "300px", padding: "10px", borderRadius: "5px", backgroundColor: "#f8f9fa" }}
                  >
                    {col.tareas.map((t, index) => (
                      <Draggable key={t.id} draggableId={String(t.id)} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`card mb-2 shadow-sm ${obtenerColor(t)}`}
                          >
                            <div className="card-body">
                              <strong>{t.tarea}</strong><br/>
                              Responsable: {t.responsable_nombre}<br/>
                              Área: {t.area_nombre}<br/>
                              Fecha Ejecución: {t.fecha_ejecucion}<br/>
                              Fecha Límite: {t.fecha_limite} ({dayjs(t.fecha_limite).diff(dayjs(), 'day')} días restantes)<br/>
                              {t.archivo && (
                                <a href={`http://localhost:8000${t.archivo}`} target="_blank" rel="noopener noreferrer">
                                  Descargar archivo
                                </a>
                              )}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
