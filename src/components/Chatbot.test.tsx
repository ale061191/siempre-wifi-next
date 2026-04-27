"use client";

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Chatbot from './Chatbot';

describe('Chatbot', () => {
  it('muestra el mensaje de bienvenida al abrir el chat', () => {
    render(<Chatbot />);
    // Simular click en el botón flotante para abrir el chat
    const fabButton = screen.getByRole('button', { name: /abrir chat/i });
    fireEvent.click(fabButton);
    // Buscar el mensaje de bienvenida
    const mensaje = screen.getByText('¡Hola! 👋 Soy el asistente virtual de Siempre WiFi. ¿En qué puedo ayudarte hoy?');
    expect(mensaje).toBeInTheDocument();
  });
});
