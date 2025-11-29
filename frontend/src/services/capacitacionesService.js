const API_URL = "http://127.0.0.1:8000/api/capacitaciones/";

export async function obtenerCapacitaciones() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener capacitaciones");
  return res.json();
}

export async function crearCapacitacion(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear capacitación");
  return res.json();
}
