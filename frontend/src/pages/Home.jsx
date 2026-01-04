import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <div className="bg-dark text-light py-5 mb-5">
        <div className="container text-center">
          <h1 className="display-5 fw-bold mb-3">
            Sistema de Gestión Integral
          </h1>
          <p className="lead mb-4">
            Administra capacitaciones, reclamos, proveedores y tareas desde un solo lugar
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/capacitaciones" className="btn btn-primary btn-lg">
              Capacitaciones
            </Link>
            <Link to="/reclamos" className="btn btn-warning btn-lg">
              Reclamos
            </Link>
            <Link to="/proveedores" className="btn btn-success btn-lg">
              Proveedores
            </Link>
            <Link to="/cronograma" className="btn btn-info btn-lg">
              Cronograma
            </Link>
          </div>
        </div>
      </div>

      {/* SECCIÓN CARDS */}
      <div className="container mb-5">
        <div className="row g-4">

          {/* Capacitaciones */}
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 shadow-sm border-0 card-hover">
              <div className="card-body text-center">
                <div className="fs-1 mb-3 text-primary">🎓</div>
                <h5 className="card-title fw-bold">Capacitaciones</h5>
                <p className="card-text">
                  Gestión completa del historial de capacitaciones del personal.
                </p>
              </div>
              <div className="card-footer bg-transparent border-0 text-center pb-4">
                <Link to="/capacitaciones" className="btn btn-outline-primary">
                  Ingresar
                </Link>
              </div>
            </div>
          </div>

          {/* Reclamos */}
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 shadow-sm border-0 card-hover">
              <div className="card-body text-center">
                <div className="fs-1 mb-3 text-warning">📢</div>
                <h5 className="card-title fw-bold">Reclamos</h5>
                <p className="card-text">
                  Registro, seguimiento y control de reclamos internos.
                </p>
              </div>
              <div className="card-footer bg-transparent border-0 text-center pb-4">
                <Link to="/reclamos" className="btn btn-outline-warning">
                  Ingresar
                </Link>
              </div>
            </div>
          </div>

          {/* Proveedores */}
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 shadow-sm border-0 card-hover">
              <div className="card-body text-center">
                <div className="fs-1 mb-3 text-success">🏭</div>
                <h5 className="card-title fw-bold">Proveedores</h5>
                <p className="card-text">
                  Control de proveedores, documentos y vencimientos.
                </p>
              </div>
              <div className="card-footer bg-transparent border-0 text-center pb-4">
                <Link to="/proveedores" className="btn btn-outline-success">
                  Ingresar
                </Link>
              </div>
            </div>
          </div>

          {/* Cronograma */}
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 shadow-sm border-0 card-hover">
              <div className="card-body text-center">
                <div className="fs-1 mb-3 text-info">📅</div>
                <h5 className="card-title fw-bold">Cronograma</h5>
                <p className="card-text">
                  Asignación y seguimiento de tareas por operario.
                </p>
              </div>
              <div className="card-footer bg-transparent border-0 text-center pb-4">
                <Link to="/cronograma" className="btn btn-outline-info">
                  Ingresar
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* FOOTER SIMPLE */}
      <footer className="bg-light py-3 border-top">
        <div className="container text-center text-muted">
          <small>
            © {new Date().getFullYear()} Sistema Gestión V2 · Desarrollado con React & Django
          </small>
        </div>
      </footer>

      {/* ESTILOS */}
      <style>{`
        .card-hover {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.15);
        }
      `}</style>
    </>
  );
}
