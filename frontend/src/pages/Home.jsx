import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5">Bienvenido al Sistema</h1>

      <div className="row justify-content-center">

        {/* Card para Gestionar Capacitaciones */}
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm text-center h-100">
            <div className="card-body d-flex flex-column justify-content-center">
              <h5 className="card-title mb-3">Gestionar Capacitaciones</h5>
              <p className="card-text">
                Accede al módulo de capacitaciones para ver, agregar o editar información.
              </p>
              <Link to="/capacitaciones" className="btn btn-primary mt-auto">
                Ir a Capacitaciones
              </Link>
            </div>
          </div>
        </div>

        {/* Card para Reclamos */}
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm text-center h-100">
            <div className="card-body d-flex flex-column justify-content-center">
              <h5 className="card-title mb-3">Reclamos</h5>
              <p className="card-text">
                Accede al módulo de reclamos para ver, registrar y gestionar reclamos.
              </p>
              <Link to="/reclamos" className="btn btn-warning mt-auto">
                Ir a Reclamos
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

