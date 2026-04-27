"use client";
import React from 'react';
import { motion } from 'framer-motion';
import './HowItWorks.css';

type Step = {
  title: string;
  description: string;
  icon?: React.ReactNode;
  cta?: {
    label: string;
    href?: string;
  };
};

type HowItWorksProps = {
  steps?: Step[];
  variant?: 'original' | 'cards';
};

function HowItWorks({ steps: stepsProp, variant = 'original' }: HowItWorksProps) {
  // Pasos por defecto del diseño original (guía de estilos)
  const defaultStepsOriginal: Step[] = [
    {
      title: 'Elige tu destino y plan',
      description: 'Selecciona el país o plan de datos que mejor se adapte a tu viaje.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      )
    },
    {
      title: 'Recibe tu eSIM por email',
      description: 'En segundos recibirás la eSIM con un código QR e instrucciones.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      )
    },
    {
      title: 'Escanea el código QR',
      description: 'Activa tu eSIM escaneando el código QR desde tu teléfono.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      )
    },
    {
      title: '¡Aterriza y conéctate!',
      description: 'Tu eSIM se conectará automáticamente sin configuraciones.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
        </svg>
      )
    }
  ];

  // Pasos por defecto del diseño tipo tarjetas (cards) inspirado en la referencia
  const defaultStepsCards: Step[] = [
    {
      title: 'Selecciona destino y duración',
      description:
        'Selecciona el destino y el número de días para tu viaje y obtén tu eSIM con datos. Recuerda verificar si tu dispositivo es compatible.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      cta: { label: 'Verificar compatibilidad', href: '#compatibilidad' }
    },
    {
      title: 'Instala tu eSIM antes del viaje',
      description:
        'Instálala automáticamente desde la app o usa el código QR o códigos manuales enviados a tu correo.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      )
    },
    {
      title: 'Enciende tu eSIM al llegar',
      description:
        'Una vez en tu destino, enciende tu eSIM de SiempreWiFi y disfruta de los datos de tu plan.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      )
    },
    {
      title: 'Controla tu plan fácilmente',
      description:
        'Gestiona tu plan desde nuestra app o el Centro SiempreWiFi: datos, vigencia, recargas y más.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 12h18M12 3v18" />
        </svg>
      )
    }
  ];

  const steps: Step[] = stepsProp && stepsProp.length
    ? stepsProp
    : (variant === 'cards' ? defaultStepsCards : defaultStepsOriginal);

  return (
    <section className={`how-it-works ${variant === 'cards' ? 'variant-cards' : ''}`}>
      <div className="container">
        <div className="section-header">
          <h2>Conectarte es así de fácil</h2>
          <p>En solo 4 simples pasos estarás conectado en cualquier parte del mundo.</p>
        </div>
        <div className="steps-container">
          {steps.map((step, index) =>
            variant === 'cards' ? (
              <motion.div
                key={index}
                className="step-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
              >
                <div className="step-media">
                  <div className="step-icon-circle">{step.icon}</div>
                </div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  {index === 0 && step.cta && (
                    <a className="compat-button" href={step.cta.href || '#'}>
                      {step.cta.label}
                    </a>
                  )}
                </div>
                <div className="step-number-badge">{`${String(index + 1).padStart(2, '0')}.`}</div>
              </motion.div>
            ) : (
              <motion.div
                key={index}
                className="step-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
              >
                <div className="step-icon-wrapper">
                  <div className="step-icon-circle">{step.icon}</div>
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
