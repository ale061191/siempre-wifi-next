"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './Hero.css';
import { getCountryCode } from '../utils/countryFlags';
import { MONTH_NAMES_ES } from '../utils/dates';
import { PRICE_PER_DAY_USD } from '../utils/pricing';

const regionalPlans = [
  'África', 'América Central', 'América Latina', 'Asia', 'Balcanes', 'Caribe',
  'Escandinavia', 'Europa', 'Global', 'Medio Oriente', 'Oceanía'
];

const countries = [
  'Albania', 'Alemania', 'Andorra', 'Arabia Saudita', 'Argelia', 'Argentina', 'Armenia',
  'Aruba', 'Australia', 'Austria', 'Azerbaiyán', 'Bahamas', 'Bahréin', 'Bangladesh',
  'Barbados', 'Bélgica', 'Belice', 'Benín', 'Bermudas', 'Bielorrusia', 'Bolivia',
  'Bosnia y Herzegovina', 'Botsuana', 'Brasil', 'Brunei', 'Bulgaria', 'Burkina Faso',
  'Camboya', 'Camerún', 'Canadá', 'Catar', 'Chad', 'Chile', 'China', 'Chipre', 'Colombia',
  'Corea del Sur', 'Costa de Marfil', 'Costa Rica', 'Croacia', 'Curazao', 'Dinamarca',
  'Dominica', 'Ecuador', 'Egipto', 'El Salvador', 'Emiratos Árabes', 'Eslovaquia',
  'Eslovenia', 'España', 'Estados Unidos', 'Estonia', 'Fiji', 'Filipinas', 'Finlandia',
  'Francia', 'Gabón', 'Georgia', 'Ghana', 'Gibraltar', 'Granada', 'Grecia', 'Guadalupe',
  'Guam', 'Guatemala', 'Guyana', 'Haití', 'Honduras', 'Hong Kong', 'Hungría', 'India',
  'Indonesia', 'Irán', 'Irlanda', 'Islandia', 'Israel', 'Italia', 'Jamaica', 'Japón',
  'Jordania', 'Kazajistán', 'Kenia', 'Kuwait', 'Laos', 'Letonia', 'Líbano', 'Liechtenstein',
  'Lituania', 'Luxemburgo', 'Macao', 'Madagascar', 'Malasia', 'Maldivas', 'Malta',
  'Marruecos', 'Martinica', 'Mauricio', 'México', 'Mónaco', 'Mongolia', 'Montenegro',
  'Mozambique', 'Myanmar', 'Nepal', 'Nicaragua', 'Noruega', 'Nueva Zelanda', 'Omán',
  'Países Bajos', 'Pakistán', 'Panamá', 'Perú', 'Polonia', 'Portugal', 'Puerto Rico',
  'Reino Unido', 'República Checa', 'República Dominicana', 'Rumania', 'Rusia', 'Senegal',
  'Serbia', 'Seychelles', 'Singapur', 'Sri Lanka', 'Sudáfrica', 'Suecia', 'Suiza',
  'Tailandia', 'Taiwán', 'Tanzania', 'Trinidad y Tobago', 'Túnez', 'Turquía', 'Ucrania',
  'Uganda', 'Uruguay', 'Vietnam'
];

const cities = [
  'Abu Dabi', 'Ámsterdam', 'Antalya', 'Atenas', 'Bali', 'Bangkok', 'Barcelona', 'Berlín',
  'Bombay', 'Boston', 'Budapest', 'Cancún', 'Chicago', 'Dubái', 'Dublín', 'El Cairo',
  'Estambul', 'Florida', 'Hawaii', 'Honolulu', 'Ibiza', 'Las Vegas', 'Lisboa', 'Londres',
  'Los Ángeles', 'Madrid', 'Mallorca', 'Manila', 'Marrakech', 'Melbourne', 'Miami',
  'Milán', 'Montreal', 'Moscú', 'Nueva York', 'Osaka', 'París', 'Pekín', 'Phuket',
  'Praga', 'Punta Cana', 'Roma', 'San Francisco', 'Seattle', 'Seúl', 'Shanghái',
  'Sídney', 'Tenerife', 'Tokio', 'Toronto', 'Vancouver', 'Viena', 'Washington D.C.', 'Yakarta'
];

const allDestinations = [...regionalPlans, ...countries, ...cities];

function Hero() {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredDestinations, setFilteredDestinations] = useState<string[]>([]);

  const [showCalendar, setShowCalendar] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // Funciones de formato y cálculos de fechas
  const getSelectedDatesText = () => {
    if (!startDate) return '';
    if (!endDate) return `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}`;

    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    // Si los días son 0 o negativos, no mostrar nada (volver al placeholder)
    if (days <= 0) return '';

    const startDay = startDate.getDate();
    const startMonth = MONTH_NAMES_ES[startDate.getMonth()];
    const endDay = endDate.getDate();
    const endMonth = MONTH_NAMES_ES[endDate.getMonth()];

    return `${startDay} ${startMonth} → ${endDay} ${endMonth} (${days} día${days !== 1 ? 's' : ''})`;
  };

  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [simType, setSimType] = useState<string>('esim');
  const [showSimModal, setShowSimModal] = useState<boolean>(false);
  const changeMonth = (increment: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + increment, 1));
  };

  // Meses en Español compartidos desde utils

  const scrollToPlans = () => {
    const plansSection = document.getElementById('planes');
    if (plansSection) {
      plansSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setSelectedIndex(-1);

    if (query.length === 0) {
      setFilteredDestinations([]);
      setShowSuggestions(false);
    } else {
      const filtered = allDestinations.filter(dest =>
        dest.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8);
      setFilteredDestinations(filtered);
      setShowSuggestions(true);
    }
  };

  const handleSelectDestination = (destination: string) => {
    setSearchQuery(destination);
    setShowSuggestions(false);
    setSelectedIndex(-1);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    let startingDayOfWeek = firstDay.getDay(); // 0 = Sunday, 1 = Monday...
    startingDayOfWeek = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1; // Ajustar para que Lunes sea 0

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const handleDateClick = (date: Date) => {
    if (isDateDisabled(date)) return;

    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else {
      if (date < startDate) {
        setEndDate(startDate);
        setStartDate(date);
      } else {
        setEndDate(date);
        setShowCalendar(false);
      }
    }
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isDateInRange = (date: Date) => {
    if (!startDate || !endDate) return false;
    return date > startDate && date < endDate;
  };

  const isDateSelected = (date: Date) => {
    return (
      (startDate && date.getTime() === startDate.getTime()) ||
      (endDate && date.getTime() === endDate.getTime())
    );
  };

  const handlePlanSelect = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!searchQuery) {
      alert("Por favor ingresa un destino primero");
      return;
    }
    
    let planParam = encodeURIComponent(searchQuery);
    if (startDate && endDate) {
      const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      planParam += ` - ${days} días`;
    }
    router.push(`/checkout?plan=${planParam}`);
  };

  return (
    <section className="hero" id="inicio">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Viaja conectado a más de <span className="highlight">160 países</span> sin cambiar de SIM
            </h1>
            <p className="hero-subtitle">
              Internet 4G LTE ilimitado desde el momento que aterrizas. Sin sorpresas, sin roaming.
            </p>

            <div className="hero-rating">
              <div className="stars">★★★★★</div>
              <span className="rating-text">4.8/5 - Más de 15,000 viajeros conectados</span>
            </div>

            <div className="hero-cta">
              <button className="btn-primary" onClick={scrollToPlans}>
                Ver Planes y Precios
              </button>
              <button className="btn-secondary-outline" onClick={scrollToPlans}>
                Cómo Funciona
              </button>
            </div>

            <div className="hero-features">
              <div className="feature-item">
                <span className="check-icon">✓</span>
                <span>Activación Instantánea</span>
              </div>
              <div className="feature-item">
                <span className="check-icon">✓</span>
                <span>Sin Contratos</span>
              </div>
              <div className="feature-item">
                <span className="check-icon">✓</span>
                <span>Soporte 24/7</span>
              </div>
            </div>

            <div className="hero-search">
              <h3>Encuentra tu plan ideal</h3>
              <div className="search-inputs">
                <div className="input-group-wrapper">
                  <div className="input-group">
                    <svg className="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M2 10H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M10 2C12.5013 4.73835 13.9228 8.29203 14 12C13.9228 15.708 12.5013 19.2616 10 22C7.49872 19.2616 6.07725 15.708 6 12C6.07725 8.29203 7.49872 4.73835 10 2V2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <input
                      type="text"
                      placeholder="¿A dónde viajas?"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      onFocus={() => searchQuery && setShowSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                      onKeyDown={(e) => {
                        if (!showSuggestions || filteredDestinations.length === 0) return;
                        if (e.key === 'ArrowDown') {
                          setSelectedIndex((prev) => (prev < filteredDestinations.length - 1 ? prev + 1 : 0));
                          e.preventDefault();
                        } else if (e.key === 'ArrowUp') {
                          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredDestinations.length - 1));
                          e.preventDefault();
                        } else if (e.key === 'Enter' && selectedIndex >= 0) {
                          handleSelectDestination(filteredDestinations[selectedIndex]);
                          e.preventDefault();
                        }
                      }}
                    />
                  </div>
                  {showSuggestions && filteredDestinations.length > 0 && (
                    <div className="suggestions-dropdown">
                      {filteredDestinations.map((destination, index) => {
                        const countryCode = getCountryCode(destination);
                        const isSelected = index === selectedIndex;
                        return (
                          <div
                            key={index}
                            className={`suggestion-item${isSelected ? ' selected' : ''}`}
                            style={isSelected ? { background: '#ffe7c2' } : {}}
                            onMouseEnter={() => setSelectedIndex(index)}
                            onClick={() => handleSelectDestination(destination)}
                          >
                            <span className="suggestion-icon">
                              {countryCode ? (
                                <span className={`fi fi-${countryCode}`}></span>
                              ) : (
                                <span>🌍</span>
                              )}
                            </span>
                            {destination}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className="input-group-wrapper">
                  <div className="input-group" onClick={() => setShowCalendar(true)}>
                    <svg className="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M6 2V5M14 2V5M3 8H17M4 4H16C16.5523 4 17 4.44772 17 5V17C17 17.5523 16.5523 18 16 18H4C3.44772 18 3 17.5523 3 17V5C3 4.44772 3.44772 4 4 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="date-text-hero">
                      {startDate && endDate ? (
                        <>
                          <span>{startDate.getDate()} {MONTH_NAMES_ES[startDate.getMonth()]}</span>
                          <span className="date-separator">→</span>
                          <span>{endDate.getDate()} {MONTH_NAMES_ES[endDate.getMonth()]}</span>
                          <span className="days-count">({Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} días)</span>
                        </>
                      ) : (
                        <span className="placeholder-text">¿Por cuántos días?</span>
                      )}
                    </div>
                  </div>
                  {showCalendar && (
                    <div
                      className="calendar-dropdown"
                      onClick={(e) => e.stopPropagation()}
                      onMouseDown={(e) => e.stopPropagation()}
                    >
                      <button
                        className="calendar-close-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowCalendar(false);
                        }}
                        title="Cerrar calendario"
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M15 5L5 15M5 5l10 10" />
                        </svg>
                      </button>
                      <h4 className="calendar-title">Elige la fecha de tu plan</h4>
                      <div className="calendar-info">
                        <span className="info-icon">⚠️</span>
                        <span className="info-text">
                          Tu plan comenzará una vez que llegues a tu destino y actives tu eSIM.
                        </span>
                      </div>
                      <div className="calendar-navigation">
                        <button onClick={() => changeMonth(-1)} className="calendar-nav">‹</button>
                        <button onClick={() => changeMonth(1)} className="calendar-nav">›</button>
                      </div>
                      <div className="calendar-months-container">
                        {/* Primer mes */}
                        <div className="calendar-month-wrapper">
                          <div className="calendar-header">
                            <span className="calendar-month">
                              {MONTH_NAMES_ES[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                            </span>
                          </div>
                          <div className="calendar-weekdays">
                            <div>Do</div>
                            <div>Lu</div>
                            <div>Ma</div>
                            <div>Mi</div>
                            <div>Ju</div>
                            <div>Vi</div>
                            <div>Sá</div>
                          </div>
                          <div className="calendar-days">
                            {(() => {
                              const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);
                              const days = [];

                              for (let i = 0; i < startingDayOfWeek; i++) {
                                days.push(<div key={`m1-empty-${i}`} className="calendar-day empty"></div>);
                              }

                              for (let day = 1; day <= daysInMonth; day++) {
                                const date = new Date(year, month, day);
                                const disabled = isDateDisabled(date);
                                const selected = isDateSelected(date);
                                const inRange = isDateInRange(date);

                                days.push(
                                  <div
                                    key={`m1-${day}`}
                                    className={`calendar-day ${disabled ? 'disabled' : ''} ${selected ? 'selected' : ''} ${inRange ? 'in-range' : ''}`}
                                    onClick={() => handleDateClick(date)}
                                  >
                                    {day}
                                  </div>
                                );
                              }

                              return days;
                            })()}
                          </div>
                        </div>

                        {/* Segundo mes */}
                        <div className="calendar-month-wrapper">
                          <div className="calendar-header">
                            <span className="calendar-month">
                              {MONTH_NAMES_ES[new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1).getMonth()]} {new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1).getFullYear()}
                            </span>
                          </div>
                          <div className="calendar-weekdays">
                            <div>Do</div>
                            <div>Lu</div>
                            <div>Ma</div>
                            <div>Mi</div>
                            <div>Ju</div>
                            <div>Vi</div>
                            <div>Sá</div>
                          </div>
                          <div className="calendar-days">
                            {(() => {
                              const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
                              const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(nextMonth);
                              const days = [];

                              for (let i = 0; i < startingDayOfWeek; i++) {
                                days.push(<div key={`m2-empty-${i}`} className="calendar-day empty"></div>);
                              }

                              for (let day = 1; day <= daysInMonth; day++) {
                                const date = new Date(year, month, day);
                                const disabled = isDateDisabled(date);
                                const selected = isDateSelected(date);
                                const inRange = isDateInRange(date);

                                days.push(
                                  <div
                                    key={`m2-${day}`}
                                    className={`calendar-day ${disabled ? 'disabled' : ''} ${selected ? 'selected' : ''} ${inRange ? 'in-range' : ''}`}
                                    onClick={() => handleDateClick(date)}
                                  >
                                    {day}
                                  </div>
                                );
                              }

                              return days;
                            })()}
                          </div>
                        </div>
                      </div>
                      {searchQuery && startDate && endDate && Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) > 0 && (
                        <div className="calendar-summary">
                          <div className="summary-content">
                            <div className="summary-header">
                              <span className="summary-title">Plan de {Math.ceil((endDate!.getTime() - startDate!.getTime()) / (1000 * 60 * 60 * 24))} días</span>
                              <div className="sim-type-badges">
                                <button
                                  className="sim-badge"
                                  onClick={(e) => { e.stopPropagation(); setSimType('fisica'); setShowSimModal(true); }}
                                  title="Información sobre SIM Física"
                                >
                                  <span className="badge-icon">📱</span>
                                  <span className="badge-text">SIM Física</span>
                                </button>
                                <button
                                  className="sim-badge"
                                  onClick={(e) => { e.stopPropagation(); setSimType('esim'); setShowSimModal(true); }}
                                  title="Información sobre eSIM"
                                >
                                  <span className="badge-icon">📲</span>
                                  <span className="badge-text">eSIM</span>
                                </button>
                              </div>
                            </div>
                            <div className="summary-dates">
                              <span className="summary-date">
                                {startDate.getDate()}-{startDate.getMonth() + 1}-{startDate.getFullYear().toString().slice(-2)}
                              </span>
                              <span className="summary-separator">→</span>
                              <span className="summary-date">
                                {endDate.getDate()}-{endDate.getMonth() + 1}-{endDate.getFullYear().toString().slice(-2)}
                              </span>
                            </div>
                            <div className="summary-price">
                              <span className="price-label">Total:</span>
                              <span className="price-amount">${(() => {
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
                                return (days * PRICE_PER_DAY_USD).toFixed(2);
                              })()} USD</span>
                              <span className="price-detail">${PRICE_PER_DAY_USD}/día</span>
                            </div>
                            {simType && (
                              <div className="summary-sim-selection">
                                <span className="sim-selection-icon">{simType === 'fisica' ? '📱' : '📲'}</span>
                                <span className="sim-selection-text">{simType === 'fisica' ? 'SIM Física' : 'eSIM'}</span>
                              </div>
                            )}
                          </div>
                          <button className="btn-apply-animated" onClick={() => {
                            const days = startDate && endDate ? Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) : 0;
                            const pricePerDay = 15;
                            const totalPrice = days * pricePerDay;

                            // We can pass the data via URL search params for the next page to read
                            const queryParams = new URLSearchParams({
                                startDate: startDate!.toISOString(),
                                endDate: endDate!.toISOString(),
                                days: days.toString(),
                                price: totalPrice.toString()
                            });

                            router.push(`/destinos/${encodeURIComponent(searchQuery.toLowerCase())}?${queryParams.toString()}`);
                          }}>
                            <span className="btn-text">Aplicar</span>
                            <span className="btn-icon-wrapper">
                              <svg className="btn-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="hero-image">
            <div className="hero-visual-new">
              <img
                src="/images/conectividad-global.jpg"
                alt="Conectividad global Siempre WiFi"
                className="hero-main-image-new"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal de información SIM */}
      {showSimModal && (
        <div className="sim-modal-overlay" onClick={() => setShowSimModal(false)}>
          <div className="sim-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="sim-modal-close" onClick={() => setShowSimModal(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {simType === 'fisica' ? (
              <>
                <div className="sim-modal-header">
                  <span className="sim-modal-icon">📱</span>
                  <h3 className="sim-modal-title">SIM Física</h3>
                </div>
                <div className="sim-modal-body">
                  <p className="sim-modal-description">
                    Tarjeta SIM tradicional que se inserta físicamente en tu dispositivo móvil.
                  </p>

                  <div className="sim-modal-section">
                    <h4 className="sim-section-title">✅ Ventajas</h4>
                    <ul className="sim-modal-list">
                      <li>Compatible con todos los dispositivos móviles</li>
                      <li>Fácil de intercambiar entre dispositivos</li>
                      <li>No requiere configuración técnica</li>
                      <li>Ideal para dispositivos antiguos</li>
                    </ul>
                  </div>

                  <div className="sim-modal-section">
                    <h4 className="sim-section-title">📦 Entrega</h4>
                    <ul className="sim-modal-list">
                      <li>Envío a domicilio (3-5 días hábiles)</li>
                      <li>Activación al insertar la tarjeta</li>
                      <li>Incluye adaptadores para todos los tamaños</li>
                    </ul>
                  </div>

                  <div className="sim-modal-section">
                    <h4 className="sim-section-title">🔧 Cómo funciona</h4>
                    <ol className="sim-modal-steps">
                      <li>Recibe tu SIM por correo</li>
                      <li>Inserta la tarjeta en tu dispositivo</li>
                      <li>Enciende tu teléfono en el destino</li>
                      <li>¡Listo! Conexión automática</li>
                    </ol>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="sim-modal-header">
                  <span className="sim-modal-icon">📲</span>
                  <h3 className="sim-modal-title">eSIM (SIM Digital)</h3>
                </div>
                <div className="sim-modal-body">
                  <p className="sim-modal-description">
                    SIM digital integrada en tu dispositivo. Activación instantánea sin tarjeta física.
                  </p>

                  <div className="sim-modal-section">
                    <h4 className="sim-section-title">✅ Ventajas</h4>
                    <ul className="sim-modal-list">
                      <li>Activación instantánea por email</li>
                      <li>No necesitas esperar envío físico</li>
                      <li>Perfecto para viajes de última hora</li>
                      <li>Más ecológico (sin plástico)</li>
                      <li>Mantén tu SIM principal activa</li>
                    </ul>
                  </div>

                  <div className="sim-modal-section">
                    <h4 className="sim-section-title">📱 Compatibilidad</h4>
                    <ul className="sim-modal-list">
                      <li>iPhone XS / XR o superior</li>
                      <li>Samsung Galaxy S20 o superior</li>
                      <li>Google Pixel 3 o superior</li>
                      <li>Huawei P40 o superior</li>
                    </ul>
                    <p className="sim-modal-note">
                      <strong>Nota:</strong> Verifica que tu dispositivo sea compatible con eSIM antes de comprar.
                    </p>
                  </div>

                  <div className="sim-modal-section">
                    <h4 className="sim-section-title">🔧 Cómo funciona</h4>
                    <ol className="sim-modal-steps">
                      <li>Recibe el código QR por email</li>
                      <li>Escanea el QR desde tu dispositivo</li>
                      <li>Activa la eSIM en configuración</li>
                      <li>¡Listo! Conexión inmediata</li>
                    </ol>
                  </div>
                </div>
              </>
            )}

            <div className="sim-modal-footer">
              <button
                className="btn-modal-select"
                onClick={() => {
                  setSimType(simType);
                  setShowSimModal(false);
                }}
              >
                Seleccionar {simType === 'fisica' ? 'SIM Física' : 'eSIM'}
              </button>
              <button className="btn-modal-close" onClick={() => setShowSimModal(false)}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Hero;
