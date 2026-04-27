"use client";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import './GlobeFeature.css';

interface GlobeFeatureProps {
  className?: string;
}

export default function GlobeFeature({ className }: GlobeFeatureProps) {
  return (
    <section className="globe-feature-section">
      <div className="globe-feature-container">
        <div className="globe-feature-content">
          <div className="globe-feature-text">
            <h1 className="globe-feature-title">
              Conecta con el mundo con <span className="globe-feature-highlight">Siempre<span className="globe-feature-wifi">WiFi</span></span>
            </h1>
            <p className="globe-feature-description">
              Activa tu eSIM en segundos y disfruta de datos ilimitados en más de 150 países. 
              Sin contratos, sin sorpresas, solo conexión instantánea donde sea que estés.
            </p>
            <button 
              className="globe-feature-cta"
              onClick={() => {
                const plansSection = document.querySelector('.destinations-grid');
                if (plansSection) {
                  plansSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              <span className="btn-text">Explorar destinos</span>
              <span className="btn-icon-wrapper">
                <svg className="btn-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
          </div>
          <div className="globe-feature-visual">
            <Globe />
          </div>
        </div>
      </div>
    </section>
  );
}

function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const size = 600;
    canvas.width = size;
    canvas.height = size;

    let rotation = 0;

    // Markers for popular destinations (with correct coordinates)
    const markers = [
      { lat: 40.4168, lon: -3.7038, name: 'España' },
      { lat: 37.0902, lon: -95.7129, name: 'Estados Unidos' },
      { lat: 31.7917, lon: -7.0926, name: 'Marruecos' },
      { lat: 36.2048, lon: 138.2529, name: 'Japón' },
      { lat: 35.8617, lon: 104.1954, name: 'China' },
      { lat: 23.6345, lon: -102.5528, name: 'México' },
      { lat: 38.9637, lon: 35.2433, name: 'Turquía' },
      { lat: -14.2350, lon: -51.9253, name: 'Brasil' },
    ];

    // Simplified continent outlines (lat, lon ranges)
    const continentData = [
      // North America
      ...generateContinentPoints(15, 72, -170, -50, 0.8),
      // South America
      ...generateContinentPoints(-55, 12, -82, -35, 0.75),
      // Europe
      ...generateContinentPoints(36, 71, -10, 40, 0.85),
      // Africa
      ...generateContinentPoints(-35, 37, -18, 52, 0.8),
      // Asia
      ...generateContinentPoints(-10, 75, 26, 180, 0.7),
      // Australia
      ...generateContinentPoints(-45, -10, 112, 155, 0.85),
    ];

    function generateContinentPoints(latMin: number, latMax: number, lonMin: number, lonMax: number, density: number) {
      const points = [];
      for (let lat = latMin; lat <= latMax; lat += 3) {
        for (let lon = lonMin; lon <= lonMax; lon += 3) {
          if (Math.random() < density) {
            points.push({ lat, lon });
          }
        }
      }
      return points;
    }

    let animationFrameId: number;

    function drawGlobe() {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 200;

      // Draw globe glow
      const glowGradient = ctx.createRadialGradient(centerX, centerY, radius * 0.7, centerX, centerY, radius * 1.3);
      glowGradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
      glowGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)');
      glowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.3, 0, Math.PI * 2);
      ctx.fillStyle = glowGradient;
      ctx.fill();

      // Draw outer glow ring (bright border)
      const outerGlowGradient = ctx.createRadialGradient(centerX, centerY, radius * 0.95, centerX, centerY, radius * 1.15);
      outerGlowGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
      outerGlowGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.8)');
      outerGlowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.15, 0, Math.PI * 2);
      ctx.fillStyle = outerGlowGradient;
      ctx.fill();

      // Draw globe background with gradient
      const gradient = ctx.createRadialGradient(centerX - 50, centerY - 50, radius * 0.3, centerX, centerY, radius);
      gradient.addColorStop(0, '#FFFFFF');
      gradient.addColorStop(0.7, '#F3F4F6');
      gradient.addColorStop(1, '#D1D5DB');
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw continent dots (black/gray pattern)
      continentData.forEach(point => {
        const adjustedLon = (point.lon + rotation * 50) % 360;
        const phi = (90 - point.lat) * (Math.PI / 180);
        const theta = (adjustedLon + 180) * (Math.PI / 180);
        
        const x = centerX + radius * Math.sin(phi) * Math.cos(theta);
        const y = centerY + radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);
        
        if (z > 0) {
          const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
          if (distance < radius) {
            const size = 1.2 * (1 - distance / radius * 0.3);
            const opacity = 0.7 * (1 - distance / radius * 0.5);
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(55, 65, 81, ${opacity})`;
            ctx.fill();
          }
        }
      });

      // Draw orange markers for destinations
      markers.forEach(marker => {
        const lon = (marker.lon + rotation * 50) % 360;
        const lat = marker.lat;
        
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lon + 180) * (Math.PI / 180);
        
        const x = centerX + radius * Math.sin(phi) * Math.cos(theta);
        const y = centerY + radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);
        
        if (z > 0) {
          // Outer glow
          ctx.beginPath();
          ctx.arc(x, y, 12, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(247, 135, 0, 0.15)';
          ctx.fill();
          
          // Middle glow
          ctx.beginPath();
          ctx.arc(x, y, 8, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(247, 135, 0, 0.3)';
          ctx.fill();
          
          // Core marker
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, Math.PI * 2);
          ctx.fillStyle = '#F78700';
          ctx.fill();
          
          // White center highlight
          ctx.beginPath();
          ctx.arc(x - 1, y - 1, 2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
          ctx.fill();
        }
      });

      rotation += 0.002;
      animationFrameId = requestAnimationFrame(drawGlobe);
    }

    drawGlobe();
    const timeoutId = setTimeout(() => setIsLoaded(true), 100);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="globe-container">
      <canvas 
        ref={canvasRef} 
        className={`globe-canvas ${isLoaded ? 'globe-loaded' : ''}`}
      />
    </div>
  );
}
