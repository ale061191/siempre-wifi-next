import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message, context } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key no configurada' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const fullPrompt = `${context || ''}\n\nUsuario: ${message}\n\nResponde como el asistente de Siempre WiFi de forma breve y amigable:`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error('Error al generar respuesta de Gemini:', error);
    return NextResponse.json({ error: 'Hubo un error al procesar tu mensaje.' }, { status: 500 });
  }
}
