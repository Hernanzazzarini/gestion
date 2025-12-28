const API_URL = "http://127.0.0.1:8000/api";

/* TIPOS DE PROVEEDOR */
export const obtenerTiposProveedor = async () => {
  const res = await fetch(`${API_URL}/tipos-proveedor/`);
  return res.json();
};

/* PROVEEDORES */
export const obtenerProveedores = async () => {
  const res = await fetch(`${API_URL}/proveedores/`);
  return res.json();
};

export const crearProveedor = async (data) => {
  const res = await fetch(`${API_URL}/proveedores/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const editarProveedor = async (id, data) => {
  const res = await fetch(`${API_URL}/proveedores/${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const eliminarProveedor = async (id) => {
  await fetch(`${API_URL}/proveedores/${id}/`, {
    method: "DELETE",
  });
};

/* DOCUMENTOS */
export const subirDocumentoProveedor = async (formData) => {
  const res = await fetch(`${API_URL}/documentos-proveedor/`, {
    method: "POST",
    body: formData,
  });
  return res.json();
};

export const eliminarDocumento = async (id) => {
  await fetch(`${API_URL}/documentos-proveedor/${id}/`, {
    method: "DELETE",
  });
};
