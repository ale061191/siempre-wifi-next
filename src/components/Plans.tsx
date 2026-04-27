"use client";
import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import './Plans.css';

function Plans() {
  const plansRef = useRef<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // entry.target is an Element; narrow to HTMLElement for style access
            (entry.target as HTMLElement).style.opacity = '1';
            (entry.target as HTMLElement).style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    plansRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const plans = [
    {
      name: 'Básico',
      description: 'Ideal para uso moderado',
      price: 299,
      features: [
        '20 GB de datos',
        'Velocidad hasta 50 Mbps',
        'Llamadas ilimitadas',
        'SMS ilimitados',
        'Redes sociales sin límite'
      ],
      featured: false
    },
    {
      name: 'Pro',
      description: 'Perfecto para uso intensivo',
      price: 499,
      features: [
        '50 GB de datos',
        'Velocidad hasta 100 Mbps',
        'Llamadas ilimitadas',
        'SMS ilimitados',
        'Todas las apps sin límite',
        'Roaming en Latinoamérica'
      ],
      featured: true
    },
    {
      name: 'Ilimitado',
      description: 'Sin preocupaciones',
      price: 699,
      features: [
        'Datos ilimitados',
        'Velocidad hasta 100 Mbps',
        'Llamadas ilimitadas',
        'SMS ilimitados',
        'Todas las apps sin límite',
        'Roaming internacional',
        'Soporte prioritario'
      ],
      featured: false
    }
  ];

  const handlePlanClick = (planName: string, price: number) => {
    // Redirigir al checkout con los parámetros en la URL
    router.push(`/checkout?plan=${encodeURIComponent(planName)}&price=${price}`);
  };

  return (
    <section className="plans" id="planes">
      <div className="container">
        <div className="section-header">
          <h2>Planes diseñados <span className="highlight">para ti</span></h2>
          <p>Sin contratos, sin permanencia, sin complicaciones</p>
        </div>
        <div className="plans-grid">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`plan-card ${plan.featured ? 'featured' : ''}`}
              ref={(el) => { plansRef.current[index] = el; }}
            >
              {plan.featured && <div className="popular-badge">Más popular</div>}
              <div className="plan-header">
                <h3>{plan.name}</h3>
                <p className="plan-description">{plan.description}</p>
              </div>
              <div className="plan-price">
                <span className="currency">$</span>
                <span className="amount">{plan.price}</span>
                <span className="period">/mes</span>
              </div>
              <ul className="plan-features">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>
                    <span className="check">✓</span> {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`plan-button ${plan.featured ? 'primary' : ''}`}
                onClick={() => handlePlanClick(plan.name, plan.price)}
              >
                Contratar plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Plans;
