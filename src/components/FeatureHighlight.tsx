"use client";
import './FeatureHighlight.css';

function FeatureHighlight() {
  return (
    <section className="feature-highlight" id="cobertura">
      <div className="container">
        <div className="feature-content">
          <div className="feature-text">
            <h2>
              Conectividad global <span className="highlight">al alcance de tu mano</span>
            </h2>
            <p className="feature-description">
              Lleva tu conexión a cualquier parte del mundo. Con Siempre WiFi, tus viajes nunca estarán desconectados.
            </p>
            <ul className="feature-list">
              <li>
                <span className="feature-check">✓</span>
                <span>Roaming internacional en más de 150 países</span>
              </li>
              <li>
                <span className="feature-check">✓</span>
                <span>Activación automática al llegar a tu destino</span>
              </li>
              <li>
                <span className="feature-check">✓</span>
                <span>Sin cargos ocultos por uso en el extranjero</span>
              </li>
              <li>
                <span className="feature-check">✓</span>
                <span>Comparte tu conexión con hasta 5 dispositivos</span>
              </li>
            </ul>
            <button className="btn-primary" onClick={() => {
              const plansSection = document.getElementById('planes');
              if (plansSection) plansSection.scrollIntoView({ behavior: 'smooth' });
            }}>
              Explorar planes internacionales
            </button>
          </div>
          <div className="feature-image">
            <img 
              src="/images/conectividad-global.jpg" 
              alt="Conectividad global al alcance de tu mano - Siempre WiFi" 
              className="feature-main-image"
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = 'none';
                console.log('Imagen feature no encontrada. Por favor, guarda conectividad-global.jpg en public/images/');
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeatureHighlight;
