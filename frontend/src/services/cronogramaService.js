const API_URL = "http://localhost:8000/api";

export async function obtenerOperarios() {
  const res = await fetch(`${API_URL}/operarios/`);
  if (!res.ok) throw new Error("Error al obtener operarios");
  return await res.json();
}

export async function obtenerTareas() {
  const res = await fetch(`${API_URL}/tareas/`);
  if (!res.ok) throw new Error("Error al obtener tareas");
  return await res.json();
}

// Crear tarea con archivos
export async function crearTarea(data) {
  const formData = new FormData();

  formData.append("responsable_id", data.responsable_id); // ID del operario
  formData.append("tarea_asignada", data.tarea_asignada);
  formData.append("fecha_ejecucion", data.fecha_ejecucion); // Debe ser YYYY-MM-DD
  formData.append("fecha_limite", data.fecha_limite);
  if (data.fecha_finalizacion) formData.append("fecha_finalizacion", data.fecha_finalizacion);
  formData.append("estado", data.estado);
  formData.append("observaciones", data.observaciones);

  if (data.archivos && data.archivos.length > 0) {
    Array.from(data.archivos).forEach((file) => formData.append("archivos", file));
  }

  const res = await fetch(`${API_URL}/tareas/`, {
    method: "POST",
    body: formData, // IMPORTANTE: NO poner headers con application/json
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(`Error al crear tarea: ${JSON.stringify(errorData)}`);
  }
  return await res.json();
}

// Actualizar tarea (estado, observaciones, fecha_finalizacion)
export async function actualizarTarea(id, data) {
  const formData = new FormData();
  if (data.estado) formData.append("estado", data.estado);
  if (data.fecha_finalizacion) formData.append("fecha_finalizacion", data.fecha_finalizacion);
  if (data.observaciones) formData.append("observaciones", data.observaciones);

  const res = await fetch(`${API_URL}/tareas/${id}/`, {
    method: "PATCH",
    body: formData, // IMPORTANTE: NO usar application/json
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(`Error al actualizar tarea: ${JSON.stringify(errorData)}`);
  }
  return await res.json();
}
