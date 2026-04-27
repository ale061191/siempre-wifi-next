"use client";
import React, { useState } from 'react';
import './FAQ.css';

function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: '¿Cómo funciona la activación?',
      answer: 'Una vez completado el pago, recibirás un correo con las instrucciones. Si elegiste eSIM, la activación es inmediata. Si elegiste SIM física, te llegará en 24-48 horas por mensajería.'
    },
    {
      question: '¿Puedo conservar mi número actual?',
      answer: 'Sí, ofrecemos portabilidad gratuita. Solo necesitas tu NIP de portabilidad de tu operador actual. El proceso toma entre 24-48 horas.'
    },
    {
      question: '¿Hay penalización por cancelar?',
      answer: 'No, nuestros planes son sin permanencia. Puedes cancelar cuando quieras sin cargos adicionales. Solo pagas por el mes en curso.'
    },
    {
      question: '¿Qué pasa si me quedo sin datos?',
      answer: 'Puedes comprar paquetes adicionales desde $99 por 5GB. También puedes cambiar a un plan superior en cualquier momento sin costo.'
    },
    {
      question: '¿Tienen cobertura en mi zona?',
      answer: 'Utilizamos la red de los principales operadores del país. Puedes verificar la cobertura en tu código postal desde nuestra sección de Cobertura o contactando a soporte.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq">
      <div className="container">
        <div className="section-header">
          <h2>Preguntas <span className="highlight">frecuentes</span></h2>
          <p>Resolvemos tus dudas</p>
        </div>
        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            >
              <div className="faq-question" onClick={() => toggleFAQ(index)}>
                <h3>{faq.question}</h3>
                <span className="faq-icon">+</span>
              </div>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
