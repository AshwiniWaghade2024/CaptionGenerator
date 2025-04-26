// utils/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini AI client with your API key
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// Function to generate a caption
export async function generateCaptionWithGemini(platform, context = "") {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Generate a creative, engaging caption for ${platform}.${context ? " Context: " + context : ""}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;

    const caption = response.text().replace(/```(.*?)```/gs, '').trim();
    return caption;
  } catch (error) {
    console.error("Error generating caption:", error);
    throw new Error("Failed to generate caption.");
  }
}
