"use client";

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { FaLock, FaCreditCard, FaShieldAlt, FaCheckCircle, FaGlobe, FaCalendarAlt, FaSimCard } from 'react-icons/fa';

export default function CheckoutForm() {
  const searchParams = useSearchParams();
  const destino = searchParams.get('destino') || 'Destino no especificado';
  const sims = searchParams.get('sims') || '1';
  const dias = searchParams.get('dias') || '0';
  const total = searchParams.get('total') || '0';
  const fechaInicio = searchParams.get('fechaInicio') || '';
  const fechaFin = searchParams.get('fechaFin') || '';

  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Form State
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    let v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      v = v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert("Debes aceptar los términos y condiciones para continuar.");
      return;
    }
    if (cardNumber.length < 19 || expiry.length < 5 || cvv.length < 3 || name.length < 2) {
      alert("Por favor, completa todos los campos de la tarjeta correctamente.");
      return;
    }

    setIsProcessing(true);
    
    // Simulate secure bank processing
    setTimeout(() => {
      setIsProcessing(false);
      setSuccess(true);
      // Here you would typically redirect to a /success page or handle token response from BAC
    }, 2500);
  };

  if (success) {
    return (
      <div className="success-modal">
        <div className="success-icon">
          <FaCheckCircle />
        </div>
        <h2>¡Compra exitosa!</h2>
        <p>
          Tu pago ha sido procesado de forma segura a través de nuestra pasarela cifrada. En breve recibirás un correo con las instrucciones para instalar tu eSIM para {destino}.
        </p>
        <button
          onClick={() => window.location.href = '/'}
          className="success-btn"
        >
          Volver al Inicio
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-layout relative z-10">
      
      {/* Columna Izquierda: Formulario de Pago */}
      <div className="checkout-card">
        {/* Encabezado Seguridad */}
        <div className="checkout-card-header">
          <div className="security-badge">
            <div className="security-icon-container">
              <FaShieldAlt />
            </div>
            <div className="security-text">
              <h2>Pago Seguro</h2>
              <p>Cifrado TLS de 256 bits y certificación PCI DSS</p>
            </div>
          </div>
          <div className="bac-badge">
            <FaLock />
            Integrado con BAC
          </div>
        </div>

        {/* Formulario */}
        <div className="checkout-card-body">
          <form onSubmit={handleSubmit}>
            
            {/* Tarjeta y Redes Aceptadas */}
            <div className="form-section-title">
              <h3>Datos de la Tarjeta</h3>
              <div className="card-logos">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="nameOnCard">
                Nombre en la tarjeta
              </label>
              <div className="input-wrapper">
                <FaCreditCard className="checkout-input-icon" />
                <input
                  type="text"
                  id="nameOnCard"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                  placeholder="Ej. Juan Pérez"
                  autoComplete="cc-name"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="cardNumber">
                Número de Tarjeta
              </label>
              <div className="input-wrapper">
                <FaLock className="checkout-input-icon" />
                <input
                  type="text"
                  id="cardNumber"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  maxLength={19}
                  className="form-input mono"
                  placeholder="0000 0000 0000 0000"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  required
                />
              </div>
            </div>

            <div className="form-group row">
              <div className="col">
                <label className="form-label" htmlFor="expiry">
                  Vencimiento
                </label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="expiry"
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    maxLength={5}
                    className="form-input centered"
                    placeholder="MM/AA"
                    inputMode="numeric"
                    autoComplete="cc-exp"
                    required
                  />
                </div>
              </div>
              <div className="col">
                <label className="form-label" htmlFor="cvv">
                  CVV
                </label>
                <div className="input-wrapper">
                  <input
                    type="password"
                    id="cvv"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, ''))}
                    maxLength={4}
                    className="form-input centered"
                    placeholder="•••"
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Terminos y condiciones */}
            <div className="terms-wrapper">
              <label className="terms-label">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="terms-checkbox"
                />
                <div className="terms-text">
                  Acepto los <a href="#">términos y condiciones</a>, las <a href="#">políticas de privacidad</a>, y confirmo que mi dispositivo es <a href="#">compatible con eSIM</a>. Entiendo que los datos serán procesados de forma segura a través de los servidores tokenizados del banco (BAC).
                </div>
              </label>
            </div>

            {/* Botón Submit */}
            <div className="submit-btn-wrapper">
              <button
                type="submit"
                disabled={isProcessing}
                className="submit-btn"
              >
                {isProcessing ? (
                  <>
                    <svg className="spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Procesando pago seguro...
                  </>
                ) : (
                  `Pagar $${total} USD de forma segura`
                )}
              </button>
              <div className="secure-note">
                <FaLock />
                <span>Tu conexión es segura y tus datos no son almacenados en nuestros servidores.</span>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Columna Derecha: Resumen de Pedido */}
      <div className="checkout-card summary-card">
        <div className="checkout-card-body">
          <h3 className="summary-title">Resumen de compra</h3>

          <div className="summary-items">
            <div className="summary-item">
              <div className="item-icon orange">
                <FaGlobe />
              </div>
              <div className="item-details">
                <p className="item-label">Destino</p>
                <p className="item-value">Internet en {destino}</p>
                <p className="item-subtext">Datos Ilimitados</p>
              </div>
            </div>

            <div className="summary-item">
              <div className="item-icon blue">
                <FaCalendarAlt />
              </div>
              <div className="item-details">
                <p className="item-label">Duración del viaje</p>
                <p className="item-value">{dias} Días</p>
                {fechaInicio && fechaFin && (
                  <div className="date-pill">{fechaInicio} <span>→</span> {fechaFin}</div>
                )}
              </div>
            </div>

            <div className="summary-item">
              <div className="item-icon purple">
                <FaSimCard />
              </div>
              <div className="item-details">
                <p className="item-label">Cantidad</p>
                <p className="item-value">{sims} <span style={{fontWeight: 'normal', color: '#6B7280', fontSize: '0.9rem'}}>x eSIM prepago</span></p>
              </div>
            </div>
          </div>

          <div className="totals-section">
            <div className="total-row">
              <span>Subtotal</span>
              <span>${total} USD</span>
            </div>
            <div className="total-row">
              <span>Impuestos y tasas</span>
              <span className="free-badge">Incluidos</span>
            </div>
            <div className="grand-total">
              <span className="grand-total-label">Total a pagar</span>
              <div className="grand-total-value">
                <span className="amount">${total}</span>
                <span className="currency">USD</span>
              </div>
            </div>
          </div>

          <div className="info-box">
            <span className="icon">✓</span>
            <p>Recibirás las instrucciones de instalación en tu correo electrónico en un máximo de <strong>5 minutos</strong>.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
