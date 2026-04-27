"use client";
import React from 'react';
import './TrustIcons.css';

function TrustIcons() {
  return (
    <section className="trust-icons-section">
      <div className="trust-icons-container">
        <div className="trust-icon-item">
          <svg className="trust-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L3 7V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V7L12 2Z" stroke="#F78700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 12L11 14L15 10" stroke="#F78700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="trust-icon-text">Compra Segura</span>
        </div>
        
        <div className="trust-icon-item">
          <svg className="trust-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M1 3H4.27273L6.46545 13.9555C6.54027 14.3321 6.7452 14.6705 7.04436 14.9113C7.34351 15.1522 7.71784 15.2801 8.10182 15.2727H18.0545C18.4385 15.2801 18.8129 15.1522 19.112 14.9113C19.4112 14.6705 19.6161 14.3321 19.6909 13.9555L21 6.09091H5.09091" stroke="#F78700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="8.72727" cy="20.7273" r="1.27273" stroke="#F78700" strokeWidth="2"/>
            <circle cx="18.0545" cy="20.7273" r="1.27273" stroke="#F78700" strokeWidth="2"/>
            <path d="M14 3L16 6L14 9" stroke="#F78700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="trust-icon-text">Envío Gratis</span>
        </div>
        
        <div className="trust-icon-item">
          <svg className="trust-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="#F78700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 12L11 15L16 9" stroke="#F78700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 2V6" stroke="#F78700" strokeWidth="2" strokeLinecap="round"/>
            <path d="M12 18V22" stroke="#F78700" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span className="trust-icon-text">Sin Cargos Ocultos</span>
        </div>
      </div>
    </section>
  );
}

export default TrustIcons;
