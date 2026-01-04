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

// Crear tarea + subir archivos si existen
export async function crearTarea(data) {
  const formData = new FormData();
  formData.append("responsable_id", data.responsable_id);
  formData.append("tarea_asignada", data.tarea_asignada);
  formData.append("fecha_ejecucion", data.fecha_ejecucion);
  formData.append("fecha_limite", data.fecha_limite);
  formData.append("fecha_finalizacion", data.fecha_finalizacion || "");
  formData.append("estado", data.estado);
  formData.append("observaciones", data.observaciones);

  if (data.archivos && data.archivos.length > 0) {
    Array.from(data.archivos).forEach(file => {
      formData.append("archivos", file);
    });
  }

  const res = await fetch(`${API_URL}/tareas/`, {
    method: "POST",
    body: formData
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(`Error al crear tarea: ${JSON.stringify(errorData)}`);
  }

  return await res.json();
}

export async function actualizarTarea(id, data) {
  const res = await fetch(`${API_URL}/tareas/${id}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Error al actualizar tarea");
  return await res.json();
}
