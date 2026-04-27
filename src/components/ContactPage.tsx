"use client";
import React, { useState } from 'react';
import './ContactPage.css';

function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('sending');

        // Simulación de envío (aquí integrarías tu API real)
        setTimeout(() => {
            setFormStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setFormStatus('idle'), 3000);
        }, 1500);
    };

    const contactMethods = [
        {
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 5a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .948.684l1.498 4.493a1 1 0 0 1-.502 1.21l-2.257 1.13a11.042 11.042 0 0 0 5.516 5.516l1.13-2.257a1 1 0 0 1 1.21-.502l4.493 1.498a1 1 0 0 1 .684.949V19a2 2 0 0 1-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            ),
            title: 'Llámanos',
            info: '(506) 4831-5797',
            link: 'tel:+50648315797',
            color: '#F78700'
        },
        {
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" fill="currentColor" stroke="none" />
                </svg>
            ),
            title: 'WhatsApp',
            info: '(506) 4831-7010',
            link: 'https://wa.me/50648317010',
            color: '#25D366'
        },
        {
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                </svg>
            ),
            title: 'Correo',
            info: 'info@siemprewifi.com',
            link: 'mailto:info@siemprewifi.com',
            color: '#F78700'
        },
        {
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                </svg>
            ),
            title: 'Dirección',
            info: 'Alajuela, Costa Rica',
            link: '#',
            color: '#F78700'
        }
    ];

    const socialLinks = [
        {
            name: 'Facebook',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
            ),
            url: '#',
            color: '#1877F2'
        },
        {
            name: 'Instagram',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
            ),
            url: '#',
            color: '#E4405F'
        }
    ];

    return (
        <div className="contact-page">
            {/* Hero Section */}
            <section className="contact-hero">
                <div className="container">
                    <div className="contact-hero-content">
                        <h1 className="contact-hero-title">Contáctenos</h1>
                        <p className="contact-hero-subtitle">
                            Llámanos o envíanos un mensaje a través del formulario de contacto en caso de dudas o comentarios,
                            estaremos a tus órdenes para atender sus inquietudes.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Methods Cards */}
            <section className="contact-methods-section">
                <div className="container">
                    <div className="contact-methods-grid">
                        {contactMethods.map((method, index) => (
                            <a
                                key={index}
                                href={method.link}
                                className="contact-method-card"
                                style={{ '--card-color': method.color } as React.CSSProperties}
                                target={method.link.startsWith('http') ? '_blank' : undefined}
                                rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                            >
                                <div className="contact-method-icon" style={{ color: method.color }}>
                                    {method.icon}
                                </div>
                                <h3 className="contact-method-title">{method.title}</h3>
                                <p className="contact-method-info">{method.info}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="contact-form-section">
                <div className="container">
                    <div className="contact-form-wrapper">
                        <div className="contact-form-header">
                            <h2 className="contact-form-title">Envíanos un mensaje</h2>
                            <p className="contact-form-subtitle">
                                Completa el formulario y nos pondremos en contacto contigo lo antes posible.
                            </p>
                        </div>

                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name" className="form-label">Tu nombre</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="form-input"
                                        placeholder="Ingresa tu nombre completo"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email" className="form-label">Tu correo electrónico</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-input"
                                        placeholder="correo@ejemplo.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject" className="form-label">Asunto</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    className="form-input"
                                    placeholder="¿Sobre qué quieres consultarnos?"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message" className="form-label">Tu mensaje (opcional)</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    className="form-textarea"
                                    placeholder="Cuéntanos más detalles..."
                                    rows={6}
                                    value={formData.message}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="btn-submit"
                                disabled={formStatus === 'sending'}
                            >
                                {formStatus === 'sending' ? (
                                    <>
                                        <span className="btn-spinner"></span>
                                        Enviando...
                                    </>
                                ) : formStatus === 'success' ? (
                                    <>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M16 6L7.5 14.5L4 11" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        ¡Mensaje enviado!
                                    </>
                                ) : (
                                    <>
                                        Enviar mensaje
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M17.5 2.5L7.5 12.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M17.5 2.5L11.25 17.5L7.5 12.5L2.5 8.75L17.5 2.5Z" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </>
                                )}
                            </button>

                            {formStatus === 'success' && (
                                <div className="form-success-message">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                        <polyline points="22 4 12 14.01 9 11.01" />
                                    </svg>
                                    <p>¡Gracias por tu mensaje! Te responderemos pronto.</p>
                                </div>
                            )}

                            {formStatus === 'error' && (
                                <div className="form-error-message">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <line x1="12" y1="8" x2="12" y2="12" />
                                        <line x1="12" y1="16" x2="12.01" y2="16" />
                                    </svg>
                                    <p>Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.</p>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </section>

            {/* Social Media Section */}
            <section className="social-section">
                <div className="container">
                    <div className="social-content">
                        <h2 className="social-title">Síguenos en redes sociales</h2>
                        <p className="social-subtitle">
                            Mantente actualizado con nuestras últimas ofertas y consejos de viaje
                        </p>
                        <div className="social-links">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    className="social-link"
                                    style={{ '--social-color': social.color } as React.CSSProperties}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.name}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ContactPage;
