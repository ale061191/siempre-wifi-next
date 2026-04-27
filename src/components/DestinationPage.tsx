"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import './DestinationPage.css';
import Navbar from './Navbar';
import Footer from './Footer';

function DestinationPage() {
  const [selectedPlan, setSelectedPlan] = useState('7days');
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const destination = {
    name: 'Caribe',
    country: 'Región Caribe',
    image: '/images/caribe-destination.jpg',
    rating: 4.8,
    reviews: 1234,
    description: 'Disfruta de conexión ilimitada en las paradisíacas playas del Caribe'
  };

  const plans = [
    { id: '7days', days: 7, data: '10 GB', price: 32.00, pricePerDay: 4.57 },
    { id: '15days', days: 15, data: '20 GB', price: 52.00, pricePerDay: 3.47 },
    { id: '30days', days: 30, data: '50 GB', price: 89.00, pricePerDay: 2.97 }
  ];

  const router = useRouter();

  const handleBuyPlan = () => {
    const selectedPlanDetails = plans.find(p => p.id === selectedPlan);
    if (selectedPlanDetails) {
      router.push(`/checkout?plan=${encodeURIComponent(destination.name + ' - ' + selectedPlanDetails.days + ' días (' + selectedPlanDetails.data + ')')}&price=${selectedPlanDetails.price}`);
    }
  };

  const features = [
    { icon: '📱', title: 'Activación instantánea', description: 'Tu eSIM se activa en minutos' },
    { icon: '🌐', title: 'Cobertura total', description: 'En toda la región del Caribe' },
    { icon: '💳', title: 'Sin costos ocultos', description: 'Precio final, sin sorpresas' },
    { icon: '🔄', title: 'Recarga cuando quieras', description: 'Añade más datos si lo necesitas' }
  ];

  const benefits = [
    { icon: '✓', text: 'Internet 4G LTE de alta velocidad' },
    { icon: '✓', text: 'Sin contratos ni compromisos' },
    { icon: '✓', text: 'Mantén tu número de WhatsApp' },
    { icon: '✓', text: 'Soporte 24/7 en español' },
    { icon: '✓', text: 'Instalación en menos de 5 minutos' },
    { icon: '✓', text: 'Compatible con iPhone y Android' }
  ];

  const howItWorks = [
    { 
      number: '1', 
      title: 'Compra tu eSIM', 
      description: 'Selecciona tu plan y completa la compra en menos de 2 minutos',
      icon: '🛒'
    },
    { 
      number: '2', 
      title: 'Recibe tu código QR', 
      description: 'Te enviamos el código QR por email al instante',
      icon: '📧'
    },
    { 
      number: '3', 
      title: 'Escanea y activa', 
      description: 'Escanea el QR desde tu celular y listo',
      icon: '📱'
    },
    { 
      number: '4', 
      title: '¡Conéctate!', 
      description: 'Disfruta de internet desde que llegues a tu destino',
      icon: '🌍'
    }
  ];

  const coverage = [
    'Antigua y Barbuda', 'Aruba', 'Bahamas', 'Barbados', 'Bonaire', 
    'Curazao', 'Dominica', 'Granada', 'Guadalupe', 'Jamaica', 
    'Martinica', 'Puerto Rico', 'República Dominicana', 'San Martín', 
    'Trinidad y Tobago', 'Islas Caimán', 'Islas Vírgenes'
  ];

  const faqs = [
    {
      question: '¿Qué es una eSIM?',
      answer: 'Una eSIM es una SIM digital que te permite activar un plan de datos sin necesidad de una tarjeta SIM física. Funciona directamente desde tu dispositivo.'
    },
    {
      question: '¿Mi teléfono es compatible?',
      answer: 'La mayoría de los iPhone desde el XS en adelante y muchos Android modernos son compatibles. Verifica en la configuración de tu teléfono si tiene la opción de eSIM.'
    },
    {
      question: '¿Cuándo se activa mi eSIM?',
      answer: 'Tu eSIM se activa automáticamente cuando llegues a tu destino y enciendas los datos móviles. No se activa antes de tu viaje.'
    },
    {
      question: '¿Puedo usar WhatsApp con mi número actual?',
      answer: 'Sí, puedes seguir usando WhatsApp con tu número habitual sin problemas. La eSIM solo proporciona datos de internet.'
    },
    {
      question: '¿Qué pasa si se me acaban los datos?',
      answer: 'Puedes recargar tu eSIM en cualquier momento desde nuestra app o sitio web. La recarga es instantánea.'
    },
    {
      question: '¿Necesito quitar mi SIM física?',
      answer: 'No, puedes mantener tu SIM física insertada. Tu teléfono puede usar ambas simultáneamente.'
    },
    {
      question: '¿Hay límite de velocidad?',
      answer: 'Ofrecemos velocidad 4G LTE sin límites. La velocidad dependerá de la cobertura local en cada momento.'
    },
    {
      question: '¿Puedo compartir internet (hotspot)?',
      answer: 'Sí, puedes usar tu teléfono como hotspot y compartir internet con otros dispositivos.'
    }
  ];

  const displayedFaqs = showAllFaqs ? faqs : faqs.slice(0, 4);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="destination-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="destination-hero">
        <div className="container">
          <div className="hero-content-dest">
            <div className="hero-image-dest">
              <img src={destination.image} alt={destination.name} />
              <div className="image-badge">
                <span className="badge-icon">⭐</span>
                <span className="badge-text">{destination.rating}</span>
                <span className="badge-reviews">({destination.reviews} reseñas)</span>
              </div>
            </div>
            
            <div className="hero-info-dest">
              <div className="breadcrumb">
                <Link href="/">Inicio</Link> › <Link href="/destinos">Destinos</Link> › <span>{destination.name}</span>
              </div>
              
              <h1>eSIM en {destination.name}</h1>
              <p className="hero-description">{destination.description}</p>
              
              <div className="plan-selector">
                <h3>Selecciona tu plan</h3>
                <div className="plan-options">
                  {plans.map((plan) => (
                    <button
                      key={plan.id}
                      className={`plan-option ${selectedPlan === plan.id ? 'active' : ''}`}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      <span className="plan-days">{plan.days} días</span>
                      <span className="plan-data">{plan.data}</span>
                    </button>
                  ))}
                </div>
                
                {plans.filter(p => p.id === selectedPlan).map((plan) => (
                  <div key={plan.id} className="plan-details">
                    <div className="plan-price">
                      <span className="price-amount">${plan.price.toFixed(2)} USD</span>
                      <span className="price-detail">${plan.pricePerDay.toFixed(2)}/día</span>
                    </div>
                    <button className="btn-buy-now" onClick={handleBuyPlan}>
                      <span className="btn-text">Comprar ahora</span>
                      <span className="btn-icon-wrapper">
                        <svg className="btn-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </button>
                    <p className="delivery-info">📧 Entrega instantánea por email</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="container">
          <h2>Conexión rápida y confiable</h2>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-item">
                <span className="benefit-icon">{benefit.icon}</span>
                <span className="benefit-text">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section-dest">
        <div className="container">
          <h2>¿Cómo funciona tu eSIM de SiempreWiFi para {destination.name}?</h2>
          <div className="features-grid-dest">
            {features.map((feature, index) => (
              <div key={index} className="feature-card-dest">
                <div className="feature-icon-dest">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-dest">
        <div className="container">
          <h2>Instala tu eSIM en 4 simples pasos</h2>
          <div className="steps-grid">
            {howItWorks.map((step, index) => (
              <div key={index} className="step-card">
                <div className="step-number">{step.number}</div>
                <div className="step-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Section */}
      <section className="coverage-section">
        <div className="container">
          <h2>Cobertura en toda la región</h2>
          <p className="coverage-subtitle">Tu eSIM funciona en todos estos destinos del Caribe</p>
          <div className="coverage-grid">
            {coverage.map((country, index) => (
              <div key={index} className="coverage-item">
                <span className="coverage-icon">🌍</span>
                <span className="coverage-name">{country}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section-dest">
        <div className="container">
          <h2>Preguntas frecuentes</h2>
          <div className="faq-list">
            {displayedFaqs.map((faq, index) => (
              <div key={index} className={`faq-item ${openFaq === index ? 'open' : ''}`}>
                <button className="faq-question" onClick={() => toggleFaq(index)}>
                  <span>{faq.question}</span>
                  <span className="faq-icon">{openFaq === index ? '−' : '+'}</span>
                </button>
                {openFaq === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          {!showAllFaqs && (
            <button className="btn-show-more" onClick={() => setShowAllFaqs(true)}>
              Ver más preguntas
            </button>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section-dest">
        <div className="container">
          <div className="cta-content-dest">
            <h2>¿Listo para viajar conectado?</h2>
            <p>Compra tu eSIM ahora y recíbela al instante</p>
            <button className="btn-cta-large" onClick={handleBuyPlan}>
              <span className="btn-text">Comprar eSIM para {destination.name}</span>
              <span className="btn-icon-wrapper">
                <svg className="btn-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default DestinationPage;
