// src/services/cronogramaService.js
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

export async function crearTarea(data) {
  const res = await fetch(`${API_URL}/tareas/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Error al crear tarea");
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

export async function subirArchivos(tareaId, archivos) {
  const formData = new FormData();
  for (let i = 0; i < archivos.length; i++) {
    formData.append("archivos", archivos[i]);
  }
  const res = await fetch(`${API_URL}/tareas/${tareaId}/archivos/`, {
    method: "POST",
    body: formData
  });
  if (!res.ok) throw new Error("Error al subir archivos");
  return await res.json();
}

