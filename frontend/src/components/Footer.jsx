export default function Footer() {
    return (
      <footer className="footer-section">
        <div className="container">
  
          <div className="row gy-4">
  
            {/* Logo y descripción */}
            <div className="col-md-4">
              <h4 className="footer-logo">Gestión Docs</h4>
              <p className="footer-text">
                Sistema empresarial para la administración y seguimiento
                de documentación interna y capacitaciones.
              </p>
            </div>
  
            {/* Navegación */}
            <div className="col-md-4">
              <h5 className="footer-title">Navegación</h5>
              <ul className="footer-links">
                <li><a href="/">Home</a></li>
                <li><a href="/capacitaciones">Capacitaciones</a></li>
              </ul>
            </div>
  
            {/* Contacto */}
            <div className="col-md-4">
              <h5 className="footer-title">Contacto</h5>
              <p className="footer-text">📞 +54 11 5555-5555</p>
              <p className="footer-text">📧 info@gestiondocs.com</p>
            </div>
  
          </div>
  
          <hr className="footer-divider" />
  
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Gestión de documentos — Todos los derechos reservados-Dev ZazzariniH</p>
          </div>
  
        </div>
      </footer>
    );
  }
  