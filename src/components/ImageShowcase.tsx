"use client";
import React from 'react';
import './ImageShowcase.css';

function ImageShowcase() {
  return (
    <section className="image-showcase">
      <div className="container">
        <div className="showcase-content">
          <div className="showcase-image">
            <img 
              src="/images/hero-amigos-wifi.jpg" 
              alt="5 amigos conectados a un wifi para todos sus viajes" 
              className="showcase-main-image"
              onError={(e) => {
                // e.target is EventTarget by default; narrow to HTMLImageElement for TS
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ImageShowcase;
