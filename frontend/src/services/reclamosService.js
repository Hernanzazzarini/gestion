const API_URL = "http://127.0.0.1:8000/api/reclamos/reclamos/";

// Obtener todos
export async function obtenerReclamos() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error obteniendo reclamos");
  return await res.json();
}

// Crear reclamo
export async function crearReclamo(formData) {
  const res = await fetch(API_URL, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const txt = await res.text();
    console.error("Error desde Django:", txt);
    throw new Error("Error al crear reclamo");
  }

  return await res.json();
}

// Borrar reclamo
export async function borrarReclamo(id) {
  const res = await fetch(`${API_URL}${id}/`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Error al borrar reclamo");
}

// Actualizar reclamo completo
export async function actualizarReclamo(id, formData) {
  const res = await fetch(`${API_URL}${id}/`, {
    method: "PUT",
    body: formData,
  });

  if (!res.ok) throw new Error("Error actualizando reclamo");
  return await res.json();
}

// Actualizar solo estado
export async function actualizarEstado(id, estado) {
  const res = await fetch(`${API_URL}${id}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ estado }),
  });

  if (!res.ok) {
    const txt = await res.text();
    console.error("ERROR PATCH:", txt);
    throw new Error("No se pudo actualizar el estado");
  }

  return await res.json();
}
