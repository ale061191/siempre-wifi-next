"use client";
import React, { useEffect, useRef } from 'react';
import './Benefits.css';

function Benefits() {
  const benefitsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = '1';
            (entry.target as HTMLElement).style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    benefitsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const benefits = [
    {
      title: 'Conexión Global',
      description: 'Internet 4G LTE en más de 160 países sin cambiar de SIM.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      )
    },
    {
      title: 'Batería de Larga Duración',
      description: 'Hasta 15 horas de uso continuo para que nunca te desconectes.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="1" y="6" width="18" height="12" rx="2" ry="2" />
          <line x1="23" y1="13" x2="23" y2="11" />
          <line x1="5" y1="10" x2="5" y2="14" />
          <line x1="9" y1="10" x2="9" y2="14" />
          <line x1="13" y1="10" x2="13" y2="14" />
        </svg>
      )
    },
    {
      title: 'Comparte con Amigos',
      description: 'Conecta hasta 5 dispositivos simultáneamente.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    {
      title: 'Fácil de Usar',
      description: 'Recibe tu router listo para encender y navegar.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      )
    },
    {
      title: 'Internet Seguro',
      description: 'Conexión privada y segura para proteger tus datos.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      )
    },
    {
      title: 'Sin Contratos',
      description: 'Alquila por los días que necesites, sin compromisos a largo plazo.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 20V10" />
          <path d="M12 20V4" />
          <path d="M6 20v-6" />
        </svg>
      )
    }
  ];

  return (
    <section className="benefits">
      <div className="container">
        <div className="section-header">
          <h2>Todo lo que necesitas para tu viaje</h2>
          <p>Nuestro servicio está diseñado para ofrecerte la mejor experiencia de conexión, dondequiera que vayas.</p>
        </div>
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="benefit-card"
              ref={(el) => { benefitsRef.current[index] = el; }}
            >
              <div className="benefit-icon-circle">
                {benefit.icon}
              </div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Benefits;
