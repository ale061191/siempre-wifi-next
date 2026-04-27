"use client";
import React from 'react';
import './CTA.css';

function CTA() {
  const scrollToPlans = () => {
    const plansSection = document.getElementById('planes');
    if (plansSection) {
      plansSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleContactClick = () => {
    alert('¡Gracias por tu interés! Pronto te contactaremos.');
  };

  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-content">
          <h2>¿Listo para la mejor conexión?</h2>
          <p>Únete a miles de usuarios satisfechos. Sin contratos, sin permanencia.</p>
          <div className="cta-buttons">
            <button className="btn-primary large" onClick={scrollToPlans}>
              Ver planes disponibles
            </button>
            <button className="btn-secondary large" onClick={handleContactClick}>
              Hablar con un asesor
            </button>
          </div>
          <p className="cta-note">✓ Activación en minutos  ✓ Soporte 24/7  ✓ Garantía de satisfacción</p>
        </div>
      </div>
    </section>
  );
}

export default CTA;
