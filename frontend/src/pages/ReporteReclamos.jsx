import { useEffect, useState } from "react";
import { obtenerReclamos } from "../services/reclamosService";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function ReporteReclamos() {
  const [reclamos, setReclamos] = useState([]);

  useEffect(() => {
    cargar();
  }, []);

  async function cargar() {
    const data = await obtenerReclamos();
    setReclamos(data);
  }

  function agrupar(campo) {
    const resultado = {};
    reclamos.forEach((r) => {
      const key = r[campo] || "Sin dato";
      resultado[key] = (resultado[key] || 0) + 1;
    });
    return resultado;
  }

  function chartData(obj) {
    const colores = [
      "#FF6384",
      "#36A2EB",
      "#FFCE56",
      "#4BC0C0",
      "#9966FF",
      "#FF9F40",
      "#8B0000",
      "#00FF7F",
      "#FFD700",
      "#FF69B4",
    ];

    return {
      labels: Object.keys(obj),
      datasets: [
        {
          label: "Cantidad",
          data: Object.values(obj),
          backgroundColor: Object.keys(obj).map((_, i) => colores[i % colores.length]),
          borderColor: "#fff",
          borderWidth: 1,
        },
      ],
    };
  }

  function pieChartData(obj) {
    const colores = [
      "#FF6384",
      "#36A2EB",
      "#FFCE56",
      "#4BC0C0",
      "#9966FF",
      "#FF9F40",
      "#8B0000",
      "#00FF7F",
    ];

    return {
      labels: Object.keys(obj),
      datasets: [
        {
          data: Object.values(obj),
          backgroundColor: Object.keys(obj).map((_, i) => colores[i % colores.length]),
        },
      ],
    };
  }

  const porCliente = chartData(agrupar("cliente"));
  const porDestinatario = chartData(agrupar("destinatario"));
  const porMotivo = chartData(agrupar("motivo"));
  const porGravedad = pieChartData(agrupar("gravedad"));
  const porAnio = chartData(agrupar("año_lote_reclamado"));

  return (
    <div className="container mt-4">
      <h2>Dashboard de Reclamos</h2>

      <div className="row mt-4">
        <div className="col-md-6 mb-4">
          <div className="card p-3">
            <h5>Reclamos por Cliente</h5>
            <Bar data={porCliente} />
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card p-3">
            <h5>Reclamos por Destinatario</h5>
            <Bar data={porDestinatario} />
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card p-3">
            <h5>Reclamos por Motivo</h5>
            <Bar data={porMotivo} />
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card p-3">
            <h5>Reclamos por Gravedad</h5>
            <Pie data={porGravedad} />
          </div>
        </div>

        <div className="col-md-12 mb-4">
          <div className="card p-3">
            <h5>Reclamos por Año de Lote</h5>
            <Bar data={porAnio} />
          </div>
        </div>
      </div>
    </div>
  );
}


