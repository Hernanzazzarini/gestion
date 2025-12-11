import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  obtenerReclamos,
  crearReclamo,
  borrarReclamo,
  actualizarEstado,
} from "../services/reclamosService";

export default function Reclamos() {
  const [reclamos, setReclamos] = useState([]);
  const [form, setForm] = useState({
    fecha: "",
    tipo: "",
    codigo: "",
    cliente: "",
    destinatario: "",
    lote_reclamado: "",
    motivo: "",
    descripcion_reclamo: "",
    gravedad: "",
    comentarios: "",
    estado: "",
    año_lote_reclamado: "",
  });

  const [archivo, setArchivo] = useState(null);

  useEffect(() => {
    cargarReclamos();
  }, []);

  async function cargarReclamos() {
    try {
      const data = await obtenerReclamos();
      setReclamos(data);
    } catch (e) {
      console.error("Error cargando reclamos:", e);
      Swal.fire("Error", "No se pudieron cargar los reclamos", "error");
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // ✔ FORMULARIO - GUARDAR RECLAMO
  async function handleSubmit(e) {
    e.preventDefault();

    const fd = new FormData();
    Object.keys(form).forEach((key) => fd.append(key, form[key]));
    if (archivo) fd.append("archivo_adjunto", archivo);

    try {
      await crearReclamo(fd);

      Swal.fire({
        title: "¡Reclamo guardado!",
        text: "El reclamo fue registrado correctamente",
        icon: "success",
        confirmButtonColor: "#198754",
      });

      cargarReclamos();

      // limpiar form
      setForm({
        fecha: "",
        tipo: "",
        codigo: "",
        cliente: "",
        destinatario: "",
        lote_reclamado: "",
        motivo: "",
        descripcion_reclamo: "",
        gravedad: "",
        comentarios: "",
        estado: "",
        año_lote_reclamado: "",
      });

      setArchivo(null);
      document.getElementById("inputArchivo").value = "";

    } catch (e) {
      console.error("ERROR:", e);
      Swal.fire("Error", "No se pudo guardar el reclamo", "error");
    }
  }

  // ✔ ELIMINAR
  async function eliminar(id) {
    const confirm = await Swal.fire({
      title: "¿Eliminar reclamo?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    await borrarReclamo(id);
    cargarReclamos();

    Swal.fire("Eliminado", "El reclamo fue eliminado", "success");
  }

  // ✔ DESCARGAR ARCHIVO (FUNCIONAL)
  async function descargarArchivo(ruta) {
    try {
      const url = `http://127.0.0.1:8000${ruta}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("No se pudo descargar");

      const blob = await response.blob();
      const blobURL = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobURL;
      a.download = ruta.split("/").pop();
      document.body.appendChild(a);
      a.click();
      a.remove();

      URL.revokeObjectURL(blobURL);

    } catch (error) {
      console.error("Error al descargar:", error);
      Swal.fire("Error", "No se pudo descargar el archivo", "error");
    }
  }

  return (
    <div className="container mt-4">
      <h2>Gestión de Reclamos</h2>

      {/* FORMULARIO */}
      <form onSubmit={handleSubmit} className="row g-3 mt-3">

        <div className="col-md-4">
          <label>Fecha</label>
          <input type="date" name="fecha" className="form-control"
            value={form.fecha} onChange={handleChange} required />
        </div>

        <div className="col-md-4">
          <label>Tipo</label>
          <select name="tipo" className="form-control"
            value={form.tipo} onChange={handleChange}>
            <option value="">Seleccione</option>
            <option value="FORMAL">Formal</option>
            <option value="NO_FORMAL">No Formal</option>
          </select>
        </div>

        <div className="col-md-4">
          <label>Código</label>
          <input type="text" name="codigo" className="form-control"
            value={form.codigo} onChange={handleChange} />
        </div>

        <div className="col-md-4">
          <label>Cliente</label>
          <input type="text" name="cliente" className="form-control"
            value={form.cliente} onChange={handleChange} />
        </div>

        <div className="col-md-4">
          <label>Destinatario</label>
          <select name="destinatario" className="form-control"
            value={form.destinatario} onChange={handleChange}>
            <option value="">Seleccione</option>
            <option value="BLANCHED">Blanched</option>
            <option value="SUPER_CLEAN">Super Clean</option>
            <option value="LOGISTICA">Logística</option>
            <option value="CRUDO">Crudo</option>
            <option value="TOSTADO">Tostado</option>
            <option value="PASTA">Pasta</option>
          </select>
        </div>

        <div className="col-md-4">
          <label>Lote reclamado</label>
          <input type="text" name="lote_reclamado" className="form-control"
            value={form.lote_reclamado} onChange={handleChange} />
        </div>

        <div className="col-md-4">
          <label>Año lote reclamado</label>
          <input type="number" name="año_lote_reclamado" className="form-control"
            value={form.año_lote_reclamado} onChange={handleChange} />
        </div>

        <div className="col-md-4">
          <label>Motivo</label>
          <input type="text" name="motivo" className="form-control"
            value={form.motivo} onChange={handleChange} />
        </div>

        <div className="col-md-12">
          <label>Descripción reclamo</label>
          <textarea name="descripcion_reclamo" className="form-control"
            rows="2" value={form.descripcion_reclamo} onChange={handleChange} />
        </div>

        <div className="col-md-4">
          <label>Gravedad</label>
          <select name="gravedad" className="form-control"
            value={form.gravedad} onChange={handleChange}>
            <option value="">Seleccione</option>
            <option value="BAJA">BAJA</option>
            <option value="MEDIA">MEDIA</option>
            <option value="ALTA">ALTA</option>
          </select>
        </div>

        <div className="col-md-4">
          <label>Estado</label>
          <select name="estado" className="form-control"
            value={form.estado} onChange={handleChange}>
            <option value="">Seleccione</option>
            <option value="ABIERTO">ABIERTO</option>
            <option value="CERRADO">CERRADO</option>
          </select>
        </div>

        <div className="col-md-4">
          <label>Comentarios</label>
          <input type="text" name="comentarios" className="form-control"
            value={form.comentarios} onChange={handleChange} />
        </div>

        <div className="col-md-12">
          <label>Archivo adjunto</label>
          <input
            id="inputArchivo"
            type="file"
            className="form-control"
            onChange={(e) => setArchivo(e.target.files[0])}
          />
        </div>

        <div className="col-md-12">
          <button className="btn btn-success w-100 mt-3">
            Guardar Reclamo
          </button>
        </div>
      </form>

      <hr />

      {/* TABLA */}
      <h3>Listado de Reclamos</h3>

      <table className="table table-bordered table-striped mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Tipo</th>
            <th>Código</th>
            <th>Cliente</th>
            <th>Destinatario</th>
            <th>Lote</th>
            <th>Año</th>
            <th>Motivo</th>
            <th>Descripción</th>
            <th>Gravedad</th>
            <th>Comentarios</th>
            <th>Estado</th>
            <th>Archivo</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {reclamos.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.fecha}</td>
              <td>{r.tipo}</td>
              <td>{r.codigo}</td>
              <td>{r.cliente}</td>
              <td>{r.destinatario}</td>
              <td>{r.lote_reclamado}</td>
              <td>{r.año_lote_reclamado}</td>
              <td>{r.motivo}</td>
              <td>{r.descripcion_reclamo}</td>
              <td>{r.gravedad}</td>
              <td>{r.comentarios}</td>

              <td>
                <select
                  value={r.estado}
                  onChange={async (e) => {
                    await actualizarEstado(r.id, e.target.value);
                    cargarReclamos();
                  }}
                  className="form-select form-select-sm"
                >
                  <option value="ABIERTO">ABIERTO</option>
                  <option value="CERRADO">CERRADO</option>
                </select>
              </td>

              <td>
                {r.archivo_adjunto ? (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => descargarArchivo(r.archivo_adjunto)}
                  >
                    Descargar
                  </button>
                ) : (
                  "Sin archivo"
                )}
              </td>

              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => eliminar(r.id)}
                >
                  Eliminar
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  );
}
