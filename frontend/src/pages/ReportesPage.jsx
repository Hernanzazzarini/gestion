import { useEffect, useState } from "react";
import { obtenerCapacitaciones } from "../services/capacitacionesService";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function ReportesPage() {
  const [capacitaciones, setCapacitaciones] = useState([]);

  const cargarDatos = async () => {
    try {
      const data = await obtenerCapacitaciones();
      setCapacitaciones(data);
    } catch (error) {
      console.error("Error cargando capacitaciones", error);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  // ---------------------------------------
  // 📌 1. Cantidad de capacitaciones por operario
  // ---------------------------------------
  const conteoPorOperario = {};

  capacitaciones.forEach((item) => {
    const operario = item.operario || item.personal;
    if (!conteoPorOperario[operario]) {
      conteoPorOperario[operario] = 0;
    }
    conteoPorOperario[operario]++;
  });

  const operarios = Object.keys(conteoPorOperario);
  const cantidades = Object.values(conteoPorOperario);

  const dataBar = {
    labels: operarios,
    datasets: [
      {
        label: "Cantidad de capacitaciones",
        data: cantidades,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  // ---------------------------------------
  // 📌 2. Mejores operarios según promedio real de notas
  // ---------------------------------------
  const promedios = {};

  capacitaciones.forEach((item) => {
    const operario = item.operario || item.personal;
    const nota = Number(item.nota);
    if (!operario || (!nota && nota !== 0)) return;

    if (!promedios[operario]) {
      promedios[operario] = { suma: 0, cantidad: 0 };
    }

    promedios[operario].suma += nota;
    promedios[operario].cantidad += 1;
  });

  const resultadosPromedio = Object.entries(promedios).map(
    ([operario, datos]) => ({
      operario,
      promedio: datos.cantidad > 0 ? datos.suma / datos.cantidad : 0,
    })
  );

  resultadosPromedio.sort((a, b) => b.promedio - a.promedio);

  // Definir umbral mínimo para mostrar operarios
  const umbralMinimo = 9; // Mostrar solo operarios con promedio 9 o mayor
  const mejoresOperarios = resultadosPromedio.filter(item => item.promedio >= umbralMinimo);

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4">Reportes y Estadísticas</h2>

      {/* TARJETAS RESUMEN */}
      <div className="row mb-4">
        <div className="col-md-12">
          <h5 className="fw-bold">🏆 Mejores Operarios (Promedio de notas)</h5>
          {mejoresOperarios.length > 0 ? (
            mejoresOperarios.map((item) => (
              <div
                key={item.operario}
                className="card shadow-sm p-3 mb-2"
                style={{ borderLeft: "5px solid #0d6efd" }}
              >
                <p className="mt-2 mb-0 fs-5">
                  <strong>{item.operario}</strong>
                </p>
                <small className="text-muted">
                  Promedio: {item.promedio.toFixed(2)}
                </small>
              </div>
            ))
          ) : (
            <p className="text-muted">No hay operarios con un promedio de 9 o más.</p>
          )}
        </div>
      </div>

      {/* GRÁFICO */}
      <div className="card p-4 shadow-sm">
        <h5 className="text-center fw-bold">📊 Cantidad de capacitaciones por operario</h5>
        <Bar data={dataBar} />
      </div>
    </div>
  );
}