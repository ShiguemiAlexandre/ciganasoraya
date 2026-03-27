
import { GoogleGenAI } from "@google/genai";

// Initialize GoogleGenAI with the API key from process.env.API_KEY as a named parameter
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getDailyGuidance = async (): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: 'Escreva uma mensagem curta de sabedoria espiritual e acolhimento (máximo 30 palavras) inspirada na Umbanda para alguém que está buscando orientação hoje.',
      config: {
        temperature: 0.8,
        topP: 0.9,
      }
    });
    // The .text property directly returns the generated text string
    return response.text || 'Que a luz dos Orixás guie seus passos hoje e sempre.';
  } catch (error) {
    console.error('Gemini Error:', error);
    return 'Que a luz dos Orixás guie seus passos hoje e sempre.';
  }
};
