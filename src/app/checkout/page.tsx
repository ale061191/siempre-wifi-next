import React, { Suspense } from 'react';
import CheckoutForm from '@/components/CheckoutForm';
import './checkout.css'; // Mantenemos un CSS específico para asegurar estilo perfecto

export default function CheckoutPage() {
  return (
    <main className="checkout-page-container">
      <div className="checkout-content-wrapper">
        <div className="checkout-header">
          <h1 className="checkout-title">
            Finaliza tu compra
          </h1>
          <p className="checkout-subtitle">
            Estás a un paso de obtener internet ilimitado para tu viaje.
          </p>
        </div>

        <Suspense fallback={<div className="checkout-loading">Cargando detalles de tu pedido...</div>}>
          <CheckoutForm />
        </Suspense>
      </div>
    </main>
  );
}
