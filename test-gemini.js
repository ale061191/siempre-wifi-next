const { GoogleGenerativeAI } = require('@google/generative-ai');

async function test() {
  try {
    const genAI = new GoogleGenerativeAI('AIzaSyBUJSk-T6-LyIjORHpiYhKFpsrI_mTdGyQ');
    const model = genAI.getGenerativeModel({ model: 'gemini-1.0-pro' });
    const result = await model.generateContent('Hola');
    console.log(result.response.text());
  } catch (error) {
    console.error('Error from Gemini:', error);
  }
}
test();