"use client";
import React from 'react';
import Link from 'next/link';
import './AboutPage.css';

const AboutPage: React.FC = () => {
    return (
        <div className="about-page">
            {/* Hero con imagen de fondo y overlay */}
            <section className="about-hero">
                <div className="about-hero-overlay" />
                <img
                    src="/images/hero-amigos-wifi.jpg"
                    alt="SiempreWiFi - Viaja conectado"
                    className="about-hero-image"
                />
                <div className="about-hero-content container">
                    <h1 className="about-hero-title">Quiénes Somos</h1>
                </div>
            </section>

            {/* Intro breve + CTA */}
            <section className="about-intro">
                <div className="container intro-container">
                    <p className="about-intro-text">
                        Somos la empresa de internet para viajar que te acompaña en tus aventuras por el mundo.
                    </p>
                    <Link href="/destinos">
                        <button className="btn-primary">
                            Reserva ya
                        </button>
                    </Link>
                </div>
            </section>

            {/* Misión y Visión */}
            <section className="about-mission-vision">
                <div className="container mv-grid">
                    <div className="mv-card">
                        <h3 className="mv-title">Misión</h3>
                        <p className="mv-text">
                            Brindar soluciones de internet para viajar por el mundo, de la manera más sencilla, práctica y segura.
                        </p>
                    </div>
                    <div className="mv-card">
                        <h3 className="mv-title">Visión</h3>
                        <p className="mv-text">
                            Llevar nuestra inspiración a más turistas, respaldados por la satisfacción general de nuestros clientes.
                        </p>
                    </div>
                </div>
            </section>

            {/* Valores / Iconografía con diseño de "How It Works" */}
            <section className="about-values how-it-works">
                <div className="container">
                    <div className="steps-container">
                        <div className="step-item" style={{ opacity: 1, transform: 'none' }}>
                            <div className="step-icon-wrapper">
                                <div className="step-icon-circle">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M11 3a7 7 0 0 0-7 7c0 2.2 1 4.2 2.7 5.5l-.7 3.5 3.5-.7A7 7 0 1 0 11 3z" />
                                    </svg>
                                </div>
                            </div>
                            <h3>Innovación</h3>
                            <p>
                                Transformamos ideas en soluciones simples que mejoran cada viaje y nos mantienen a la vanguardia.
                            </p>
                        </div>

                        <div className="step-item" style={{ opacity: 1, transform: 'none' }}>
                            <div className="step-icon-wrapper">
                                <div className="step-icon-circle">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                    </svg>
                                </div>
                            </div>
                            <h3>Trabajo en Equipo</h3>
                            <p>
                                Colaboramos con transparencia y respeto para lograr mejores resultados para nuestros viajeros.
                            </p>
                        </div>

                        <div className="step-item" style={{ opacity: 1, transform: 'none' }}>
                            <div className="step-icon-wrapper">
                                <div className="step-icon-circle">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M12 17l-5 3 1.9-5.5L4 10h5l3-6 3 6h5l-4.9 4.5L17 20z" />
                                    </svg>
                                </div>
                            </div>
                            <h3>Excelencia</h3>
                            <p>
                                Cuidamos cada detalle y superamos expectativas en cada entrega y experiencia de servicio.
                            </p>
                        </div>

                        <div className="step-item" style={{ opacity: 1, transform: 'none' }}>
                            <div className="step-icon-wrapper">
                                <div className="step-icon-circle">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M3 22l8-8" />
                                        <path d="M3 22h6v-6" />
                                        <path d="M14 3l7 7" />
                                        <path d="M14 3v6h6" />
                                    </svg>
                                </div>
                            </div>
                            <h3>Liderazgo</h3>
                            <p>
                                Tomamos la iniciativa y guiamos con responsabilidad para avanzar con claridad y propósito.
                            </p>
                        </div>

                        <div className="step-item" style={{ opacity: 1, transform: 'none' }}>
                            <div className="step-icon-wrapper">
                                <div className="step-icon-circle">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M12 22s8-4 8-10V7l-8-5-8 5v5c0 6 8 10 8 10z" />
                                        <path d="M9.5 12l1.5 1.5 3.5-3.5" />
                                    </svg>
                                </div>
                            </div>
                            <h3>Confianza</h3>
                            <p>
                                Actuamos con honestidad y cumplimos nuestros compromisos, construyendo relaciones duraderas.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA oscuro */}
            <section className="about-cta-dark">
                <div className="container">
                    <h3 className="cta-dark-title">¿Planeando viajar?</h3>
                    <div className="cta-buttons">
                        <Link href="/contacto">
                            <button className="btn-secondary large">
                                Contáctanos
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
