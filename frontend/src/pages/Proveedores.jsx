import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  obtenerTiposProveedor,
  obtenerProveedores,
  crearProveedor,
  eliminarProveedor,
  subirDocumentoProveedor,
  eliminarDocumento,
} from "../services/proveedoresService";
import { colorPorVencimiento } from "../services/proveedoresUtils";

export default function Proveedores() {
  const [proveedores, setProveedores] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [filtroTipo, setFiltroTipo] = useState("");

  const [formProveedor, setFormProveedor] = useState({
    nombre: "",
    tipo_id: "",
    ciudad: "",
    provincia: "",
    telefono: "",
    email: "",
  });

  const [proveedorActivo, setProveedorActivo] = useState(null);
  const [formDocumento, setFormDocumento] = useState({
    nombre: "",
    fecha_emision: "",
    fecha_vencimiento: "",
    archivo: null,
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    setTipos(await obtenerTiposProveedor());
    setProveedores(await obtenerProveedores());
  };

  /* --- CRUD PROVEEDOR --- */
  const handleChangeProveedor = (e) =>
    setFormProveedor({ ...formProveedor, [e.target.name]: e.target.value });

  const handleSubmitProveedor = async (e) => {
    e.preventDefault();
    await crearProveedor(formProveedor);
    setFormProveedor({ nombre: "", tipo_id: "", ciudad: "", provincia: "", telefono: "", email: "" });
    cargarDatos();
    Swal.fire("OK", "Proveedor creado", "success");
  };

  const handleEliminarProveedor = async (id) => {
    if (!window.confirm("¿Eliminar proveedor?")) return;
    await eliminarProveedor(id);
    cargarDatos();
  };

  /* --- DOCUMENTOS --- */
  const handleDocumentoChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "archivo") setFormDocumento({ ...formDocumento, archivo: files[0] });
    else setFormDocumento({ ...formDocumento, [name]: value });
  };

  const handleSubirDocumento = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("proveedor", proveedorActivo.id);
    fd.append("nombre", formDocumento.nombre);
    fd.append("fecha_emision", formDocumento.fecha_emision);
    fd.append("fecha_vencimiento", formDocumento.fecha_vencimiento);
    fd.append("archivo", formDocumento.archivo);

    await subirDocumentoProveedor(fd);
    setFormDocumento({ nombre: "", fecha_emision: "", fecha_vencimiento: "", archivo: null });
    setProveedorActivo(null);
    cargarDatos();
    Swal.fire("OK", "Documento agregado", "success");
  };

  const handleEliminarDocumento = async (id) => {
    if (!window.confirm("Eliminar documento?")) return;
    await eliminarDocumento(id);
    cargarDatos();
  };

  /* --- FILTRO POR TIPO --- */
  const proveedoresFiltrados = filtroTipo
    ? proveedores.filter((p) => p.tipo.id === parseInt(filtroTipo))
    : proveedores;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Proveedores</h2>

      {/* FORMULARIO PROVEEDOR */}
      <form onSubmit={handleSubmitProveedor} className="card p-3 mb-4">
        <input name="nombre" className="form-control mb-2" placeholder="Nombre" value={formProveedor.nombre} onChange={handleChangeProveedor} required />
        <select name="tipo_id" className="form-select mb-2" value={formProveedor.tipo_id} onChange={handleChangeProveedor} required>
          <option value="">Tipo proveedor</option>
          {tipos.map((t) => (
            <option key={t.id} value={t.id}>{t.nombre}</option>
          ))}
        </select>
        <input name="ciudad" className="form-control mb-2" placeholder="Ciudad" value={formProveedor.ciudad} onChange={handleChangeProveedor} />
        <input name="provincia" className="form-control mb-2" placeholder="Provincia" value={formProveedor.provincia} onChange={handleChangeProveedor} />
        <input name="telefono" className="form-control mb-2" placeholder="Teléfono" value={formProveedor.telefono} onChange={handleChangeProveedor} />
        <input name="email" className="form-control mb-2" placeholder="Email" value={formProveedor.email} onChange={handleChangeProveedor} />
        <button className="btn btn-success">Guardar proveedor</button>
      </form>

      {/* FILTRO */}
      <select className="form-select mb-3" onChange={(e) => setFiltroTipo(e.target.value)}>
        <option value="">Todos los tipos</option>
        {tipos.map((t) => (
          <option key={t.id} value={t.id}>{t.nombre}</option>
        ))}
      </select>

      {/* LEYENDA COLORES */}
      <div className="mb-2">
        <strong>Leyenda colores documentos:</strong>
        <ul className="list-inline mt-1 mb-1">
          <li className="list-inline-item badge bg-success me-2">Verde: Vigente</li>
          <li className="list-inline-item badge bg-warning me-2">Amarillo: Vence en 30 días</li>
          <li className="list-inline-item badge bg-danger me-2">Rojo: Vencido</li>
        </ul>
      </div>

      {/* TABLA PROVEEDORES */}
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Ciudad</th>
            <th>Provincia</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Documentos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proveedoresFiltrados.map((p) => (
            <tr key={p.id}>
              <td>{p.nombre}</td>
              <td>{p.tipo.nombre}</td>
              <td>{p.ciudad}</td>
              <td>{p.provincia}</td>
              <td>{p.telefono}</td>
              <td>{p.email}</td>
              <td>
                <ul className="list-unstyled">
                  {p.documentos.map((d) => (
                    <li key={d.id} className={colorPorVencimiento(d.fecha_vencimiento)}>
                      <a href={d.archivo} target="_blank" rel="noreferrer">{d.nombre}</a>
                      <span className="ms-2">Vence: {d.fecha_vencimiento}</span>
                      <button className="btn btn-sm btn-danger ms-2" onClick={() => handleEliminarDocumento(d.id)}>🗑</button>
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <button className="btn btn-sm btn-secondary" onClick={() => setProveedorActivo(p)}>+ Documento</button>
                <button className="btn btn-sm btn-danger ms-2" onClick={() => handleEliminarProveedor(p.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* FORMULARIO DOCUMENTO */}
      {proveedorActivo && (
        <form onSubmit={handleSubirDocumento} className="card p-3 mt-3">
          <h5>Agregar documento a {proveedorActivo.nombre}</h5>
          <input name="nombre" className="form-control mb-2" placeholder="Nombre del documento" value={formDocumento.nombre} onChange={handleDocumentoChange} required />
          <label>Fecha emisión</label>
          <input type="date" name="fecha_emision" className="form-control mb-2" value={formDocumento.fecha_emision} onChange={handleDocumentoChange} required />
          <label>Fecha vencimiento</label>
          <input type="date" name="fecha_vencimiento" className="form-control mb-2" value={formDocumento.fecha_vencimiento} onChange={handleDocumentoChange} required />
          <input type="file" name="archivo" className="form-control mb-2" onChange={handleDocumentoChange} required />
          <button className="btn btn-primary">Guardar documento</button>
        </form>
      )}
    </div>
  );
}
