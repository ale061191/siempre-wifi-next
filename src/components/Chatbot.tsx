"use client";
import { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const FAQS_CONTEXT = `
Eres un asistente virtual de Siempre WiFi, una empresa que ofrece planes de eSIM para viajeros internacionales.

INFORMACIÓN DE LA EMPRESA:
- Nombre: Siempre WiFi
- Servicio: eSIM y SIM física para datos móviles internacionales
- Cobertura: Más de 150 países en todo el mundo
- Planes: Datos ilimitados desde $15 USD por día

PREGUNTAS FRECUENTES (FAQs):

1. ¿Qué es una eSIM?
Una eSIM es una tarjeta SIM digital que te permite activar un plan de datos móviles sin necesidad de una tarjeta SIM física. Se activa directamente desde tu dispositivo compatible.

2. ¿Cómo funciona?
- Compras tu plan en nuestro sitio web
- Recibes un código QR por email
- Escaneas el código QR con tu dispositivo
- Tu eSIM se activa automáticamente cuando llegas a tu destino

3. ¿Mi teléfono es compatible?
La mayoría de los iPhone (XS y posteriores), Samsung Galaxy (S20 y posteriores), Google Pixel (3 y posteriores) y otros smartphones modernos son compatibles. Verifica en la configuración de tu teléfono si tiene opción de eSIM.

4. ¿Cuándo se activa mi plan?
Tu plan se activa automáticamente cuando llegas a tu destino y tu dispositivo se conecta a la red local. No se activa antes de tu viaje.

5. ¿Puedo usar mi número actual?
Sí, tu número actual permanece activo. La eSIM es una línea adicional solo para datos móviles. Puedes recibir llamadas y mensajes en tu número principal.

6. ¿Qué incluyen los planes?
- Datos móviles ilimitados
- Cobertura en el país seleccionado
- Activación instantánea
- Soporte 24/7
- Sin contratos ni compromisos

7. ¿Cuánto cuesta?
Los planes comienzan desde $15 USD por día, dependiendo del destino y la duración de tu viaje.

8. ¿Necesito desinstalar algo después?
No, puedes mantener la eSIM en tu dispositivo o eliminarla fácilmente desde la configuración cuando termines tu viaje.

9. ¿Qué pasa si tengo problemas?
Ofrecemos soporte 24/7 por chat, email y WhatsApp. Nuestro equipo está disponible para ayudarte en cualquier momento.

10. ¿Puedo compartir datos?
Sí, puedes usar tu teléfono como hotspot para compartir datos con otros dispositivos.

DESTINOS POPULARES:
- España, Francia, Italia, Alemania (Europa)
- Estados Unidos, Canadá, México (América del Norte)
- Japón, Corea del Sur, Tailandia (Asia)
- Y más de 150 países adicionales

TONO DE COMUNICACIÓN:
- Amigable y cercano
- Profesional pero no formal
- Usa emojis ocasionalmente (✈️, 📱, 🌍)
- Responde en español claro y conciso
- Si no sabes algo, ofrece contactar al equipo de soporte

INSTRUCCIONES:
- Responde preguntas sobre eSIM, planes, cobertura y activación
- Si te preguntan por un destino específico, confirma que tenemos cobertura
- Si te preguntan por precios, menciona que comienzan desde $15/día
- Siempre ofrece ayuda adicional al final de tu respuesta
- Mantén respuestas cortas (2-3 párrafos máximo)
`;

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! 👋 Soy el asistente virtual de Siempre WiFi. ¿En qué puedo ayudarte hoy?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputValue, context: FAQS_CONTEXT }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Server error response:', response.status, errorData);
        throw new Error('Error en la respuesta del servidor');
      }

      const data = await response.json();
      const botText = data.reply || data.response || 'Hubo un error en la respuesta';

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botText,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo o contacta a nuestro equipo de soporte.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // FAQs y opción fija
  // Opciones importantes y relevantes
  const FAQ_QUICK_REPLIES = [
    '¿Qué es una eSIM?',
    '¿Cómo funciona?',
    '¿Cuánto cuesta?',
    'Ver planes',
    'Países disponibles',
    'Hablar con un asesor'
  ];
  const [quickReplies, setQuickReplies] = useState<string[]>(FAQ_QUICK_REPLIES);

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
    setTimeout(() => sendMessage(), 100);
  };

  // Actualizar opciones según la respuesta del bot
  useEffect(() => {
    if (messages.length > 1) {
      const lastBotMsg = [...messages].reverse().find(m => m.sender === 'bot');
      if (lastBotMsg) {
        const text = lastBotMsg.text.toLowerCase();
        let dynamicReplies = [];
        if (text.includes('eSIM') || text.includes('tarjeta SIM digital')) {
          dynamicReplies = [
            '¿Cómo funciona?',
            '¿Cuánto cuesta?',
            'Ver planes',
            'Países disponibles',
            'Hablar con un asesor'
          ];
        } else if (text.includes('plan') && text.includes('activar')) {
          dynamicReplies = [
            '¿Cuándo se activa mi plan?',
            '¿Qué incluyen los planes?',
            '¿Cuánto cuesta?',
            'Hablar con un asesor'
          ];
        } else if (text.includes('compatible')) {
          dynamicReplies = [
            '¿Mi teléfono es compatible?',
            '¿Cómo funciona?',
            'Hablar con un asesor'
          ];
        } else if (text.includes('precio') || text.includes('$')) {
          dynamicReplies = [
            '¿Cuánto cuesta?',
            'Ver planes',
            'Países disponibles',
            'Hablar con un asesor'
          ];
        } else if (text.includes('soporte') || text.includes('problema')) {
          dynamicReplies = [
            '¿Qué pasa si tengo problemas?',
            'Hablar con un asesor'
          ];
        } else {
          dynamicReplies = FAQ_QUICK_REPLIES;
        }
        // Limitar a máximo 6 opciones y asegurar 'Hablar con un asesor'
        if (!dynamicReplies.includes('Hablar con un asesor')) {
          dynamicReplies.push('Hablar con un asesor');
        }
        setQuickReplies(dynamicReplies.slice(0, 6));
      }
    } else {
      setQuickReplies(FAQ_QUICK_REPLIES);
    }
  }, [messages]);

  const clearHistory = () => {
    setMessages([
      {
        id: '1',
        text: '¡Hola! 👋 Soy el asistente virtual de Siempre WiFi. ¿En qué puedo ayudarte hoy?',
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  };

  return (
    <>
      {/* Badge - Outside FAB */}
      {!isOpen && <span className="chatbot-badge">1</span>}
      
      {/* FAB Button */}
      <button
        className={`chatbot-fab ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abrir chat"
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">
                <span>S</span>
              </div>
              <div className="chatbot-header-text">
                <h3>Siempre WiFi</h3>
                <p>Asistente Virtual • En línea</p>
              </div>
            </div>
            <div className="chatbot-header-actions">
              <button
                className="chatbot-clear"
                onClick={clearHistory}
                aria-label="Nueva conversación"
                title="Nueva conversación"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h14M8 6V4a1 1 0 011-1h2a1 1 0 011 1v2m3 0v10a2 2 0 01-2 2H7a2 2 0 01-2-2V6h10z" />
                </svg>
              </button>
              <button
                className="chatbot-close"
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar chat"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 5L5 15M5 5l10 10" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chatbot-message ${message.sender === 'user' ? 'user' : 'bot'}`}
              >
                {message.sender === 'bot' && (
                  <div className="message-avatar">
                    <span>S</span>
                  </div>
                )}
                <div className="message-bubble">
                  <p>{message.text}</p>
                  <span className="message-time">
                    {message.timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="chatbot-message bot">
                <div className="message-avatar">
                  <span>S</span>
                </div>
                <div className="message-bubble typing">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies SIEMPRE visibles debajo del input */}
          <div className="chatbot-quick-replies">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                className="quick-reply-btn"
                onClick={() => handleQuickReply(reply)}
              >
                {reply}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="chatbot-input-container">
            <input
              ref={inputRef}
              type="text"
              className="chatbot-input"
              placeholder="Escribe tu mensaje..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isTyping}
            />
            <button
              className="chatbot-send"
              onClick={sendMessage}
              disabled={!inputValue.trim() || isTyping}
              aria-label="Enviar mensaje"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 2L9 11M18 2l-6 16-3-7-7-3 16-6z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
