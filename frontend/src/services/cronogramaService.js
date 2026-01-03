const API_URL = "http://localhost:8000/api/appcrontareas";

// Obtener áreas
export async function obtenerAreas() {
  const res = await fetch(`${API_URL}/areas/`);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || "Error al obtener áreas");
  }
  return res.json();
}

// Obtener responsables
export async function obtenerResponsables() {
  const res = await fetch(`${API_URL}/responsables/`);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || "Error al obtener responsables");
  }
  return res.json();
}

// Obtener tareas, opcionalmente con filtros
export async function obtenerTareas(filtros = {}) {
  let query = new URLSearchParams(filtros).toString();
  const res = await fetch(`${API_URL}/tareas/?${query}`);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || "Error al obtener tareas");
  }
  return res.json();
}

// Crear tarea (FormData)
export async function crearTarea(formData) {
  const res = await fetch(`${API_URL}/tareas/`, {
    method: "POST",
    body: formData // FormData no necesita headers
  });

  if (!res.ok) {
    // Obtener el error real de Django
    const errorData = await res.json().catch(() => ({}));
    throw new Error(JSON.stringify(errorData)); 
  }

  return res.json();
}

// Actualizar solo estado de la tarea (Drag & Drop)
export async function actualizarEstadoTarea(tareaId, nuevoEstado) {
  const res = await fetch(`${API_URL}/tareas/${tareaId}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ estado: nuevoEstado })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(JSON.stringify(errorData));
  }

  return res.json();
}
