# 🚀 Resumen de Migración: Siempre WiFi (Vite ➡️ Next.js 15)

Este documento contiene el contexto histórico y técnico de la migración de la aplicación **Siempre WiFi** desde una Single Page Application (SPA) creada con React y Vite, hacia una arquitectura moderna renderizada en el servidor usando **Next.js 15 (App Router)**.

---

## 🛠️ ¿Qué hicimos? (Trabajo Completado)

1. **Inicialización del Proyecto:** 
   - Se creó este nuevo repositorio en `C:\Users\Usuario\Documents\siempre-wifi-next` utilizando `npx create-next-app@latest` (Next.js 15, TypeScript, Tailwind).
   - Se instalaron dependencias clave: `framer-motion`, `@google/generative-ai` y `react-icons`.

2. **Migración de Código Base y Assets:**
   - Se copiaron todas las imágenes, logos e íconos desde la carpeta `public/` de Vite a la carpeta `public/` de Next.js.
   - Se trajeron los archivos `App.css` y `index.css` globales.
   - Se migraron las carpetas de `components/`, `types/` y `utils/` intactas.

3. **Refactorización Arquitectónica (App Router):**
   - **Enrutamiento:** Se eliminó el router personalizado basado en estado (`window.navigateTo...` en `App.tsx`) y se reemplazó por el enrutamiento nativo basado en archivos de Next.js (`src/app/page.tsx`, `src/app/destinos/page.tsx`, etc.).
   - **Componentes de Cliente:** Se inyectó la directiva `"use client"` de forma automatizada en todos los componentes heredados de React que manejan estados (`useState`, `useEffect`) e interactividad del DOM.

4. **Seguridad y Backend (Chatbot con Gemini 2.5 Flash):**
   - Anteriormente, el chatbot llamaba a la API de Gemini desde el navegador web (lo cual expone la API Key).
   - Creamos una ruta de API backend segura en `src/app/api/chat/route.ts`.
   - Se creó el archivo `.env.local` con la clave `GEMINI_API_KEY` para que solo el servidor de Next.js tenga acceso a ella.

5. **Easter Egg Mantenido:**
   - La funcionalidad de teclear `siemprewifiui` para abrir la Guía de Estilos fue preservada mediante un componente envoltorio llamado `StyleGuideHandler.tsx` en el layout principal.

---

## 🎯 Próximos Pasos (Pendientes)

Cuando retomes el trabajo en este proyecto, estos son los pasos a seguir:

1. **Revisión Visual Local (`http://localhost:3000`):**
   - Navegar por todas las vistas (Inicio, Destinos, Nosotros, Contacto, Detalle de Destino) para confirmar que los componentes de Vite se renderizan igual de bien en Next.js.
   
2. **Auditoría de Consola y Errores de Hidratación:**
   - Es muy común que al pasar código de cliente (SPA) a servidor (Next.js) surjan advertencias de "Hydration Mismatch" (diferencias entre lo que renderiza el servidor y el cliente). Revisar la consola del navegador (F12) y la terminal para pulir estos detalles.
   - Corregir importaciones de imágenes relativas (ej: si algún componente usa `<img>` con rutas antiguas) o íconos faltantes.

3. **Prueba del Chatbot:**
   - Interactuar con el asistente virtual y verificar que la nueva conexión a la API interna (`/api/chat`) funciona y procesa respuestas de Gemini correctamente.

4. **Despliegue a Producción:**
   - Una vez la versión local de Next.js sea 100% estable y visualmente perfecta, el siguiente paso será:
     - Hacer `git init`, `git add .`, `git commit`.
     - Subirlo a GitHub a la rama `master`.
     - Dejar que Vercel detecte el nuevo push y compile la nueva arquitectura basada en Next.js.

---
*Documento generado automáticamente por tu asistente de IA para mantener el contexto de tu progreso.*