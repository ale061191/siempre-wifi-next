"use client";
import React from 'react';
import './Testimonials.css';

interface TestimonialAuthor {
  name: string;
  handle: string;
  avatar: string;
}

interface Testimonial {
  author: TestimonialAuthor;
  text: string;
  href?: string;
}

function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      author: {
        name: 'María Contreras',
        handle: '@mariacontreras',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face'
      },
      text: 'Excelente servicio. La velocidad es constante y el soporte siempre responde rápido. Llevo 6 meses y cero problemas.'
    },
    {
      author: {
        name: 'Jorge Ramírez',
        handle: '@jorgeramirez',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      },
      text: 'Cambié de mi operador anterior y fue la mejor decisión. Precio justo, sin sorpresas en la factura y la portabilidad fue súper fácil.'
    },
    {
      author: {
        name: 'Ana Sánchez',
        handle: '@anasanchez',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face'
      },
      text: 'Perfecto para trabajar desde casa. La conexión es estable y puedo hacer videollamadas sin cortes. 100% recomendado.'
    },
    {
      author: {
        name: 'Carlos Mendoza',
        handle: '@carlosmendoza',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
      },
      text: 'La mejor eSIM que he usado. Funciona perfectamente en todos mis viajes internacionales. Muy recomendable.'
    },
    {
      author: {
        name: 'Laura Fernández',
        handle: '@laurafernandez',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
      },
      text: 'Increíble facilidad de uso. En menos de 5 minutos ya tenía internet en mi destino. Sin complicaciones.'
    },
    {
      author: {
        name: 'Roberto Silva',
        handle: '@robertosilva',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      },
      text: 'Excelente relación calidad-precio. Los datos ilimitados realmente son ilimitados. Muy satisfecho con el servicio.'
    }
  ];

  return (
    <section className="testimonials">
      <div className="container">
        <div className="section-header">
          <h2>Lo que dicen <span className="highlight">nuestros clientes</span></h2>
          <p>Más de 10,000 personas confían en nosotros</p>
        </div>

        <div className="testimonials-marquee-wrapper">
          <div className="testimonials-marquee">
            <div className="testimonials-marquee-content">
              {[...Array(4)].map((_, setIndex) => (
                testimonials.map((testimonial, i) => (
                  <div key={`${setIndex}-${i}`} className="testimonial-card-marquee">
                    <div className="testimonial-card-header">
                      <div className="testimonial-avatar">
                        <img src={testimonial.author.avatar} alt={testimonial.author.name} />
                      </div>
                      <div className="testimonial-author-info">
                        <h3 className="testimonial-author-name">{testimonial.author.name}</h3>
                        <p className="testimonial-author-handle">{testimonial.author.handle}</p>
                      </div>
                    </div>
                    <p className="testimonial-card-text">{testimonial.text}</p>
                  </div>
                ))
              ))}
            </div>
          </div>
          <div className="testimonials-gradient-left" />
          <div className="testimonials-gradient-right" />
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
