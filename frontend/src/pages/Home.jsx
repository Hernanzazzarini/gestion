import heroImg from "../assets/hero.jpg";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <header className="bg-light pt-5 pb-5">
        <div className="container-fluid">
          <div className="row align-items-center flex-column-reverse flex-lg-row">
            
            {/* Texto */}
            <div className="col-12 col-lg-6 text-center text-lg-start mt-4 mt-lg-0">
              <h1 className="display-5 fw-bold">
                Sistema de Gestion de documentos.
              </h1>
              <p className="lead mt-3">
                Administra de forma sencilla y eficiente todos los documentos y capacitaciones de tu empresa.
              </p>
              <a href="/capacitaciones" className="btn btn-primary btn-lg mt-3">
                Gestionar Capacitaciones
              </a>
            </div>

            {/* Imagen */}
            <div className="col-12 col-lg-6 text-center p-0">
              <img 
                src={heroImg} 
                alt="Gestión" 
                className="img-fluid w-100"
                style={{ maxHeight: "420px", objectFit: "cover" }}
              />
            </div>

          </div>
        </div>
      </header>

      {/* TARJETAS */}
      <section className="container-fluid mt-5 mb-5">
        <div className="row justify-content-center gap-3">
          
          <div className="col-12 col-md-3">
            <div className="card shadow border-0 text-center p-3">
              <h5 className="fw-bold">✔ Fácil de usar</h5>
              <p>Interfaz limpia para que todo tu equipo trabaje sin dificultades.</p>
            </div>
          </div>

          <div className="col-12 col-md-3">
            <div className="card shadow border-0 text-center p-3">
              <h5 className="fw-bold">🔒 Seguro</h5>
              <p>Lleve el seguimiento de todas las capacitaciones.</p>
            </div>
          </div>

          <div className="col-12 col-md-3">
            <div className="card shadow border-0 text-center p-3">
              <h5 className="fw-bold">📊 Reportes</h5>
              <p>Visualización clara del estado de las capacitaciones.</p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
