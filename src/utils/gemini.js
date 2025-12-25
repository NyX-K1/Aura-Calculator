import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const calculateSlangScore = async (slangText) => {
    try {
        const prompt = `Calculate aura score between -infinity and +infinity, a numerical anwer, just anwer in numbers and no unnecessary words or explanation of the reason you gave what score, of the entered words on the basis of : relevance, uniquesness and aura farming identity, dominance, mindset and spirit of being an aura farmer. 
        Input Text: "${slangText}"`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Extract number from response (handling potential extra text if any slips through)
        const match = text.match(/-?\d[\d,]*(\.\d+)?/);
        if (match) {
            // Remove commas and parse
            return parseInt(match[0].replace(/,/g, ''));
        }
        return 0; // Fallback
    } catch (error) {
        console.error("Gemini Aura Calculation Failed:", error);
        return Math.floor(Math.random() * 100000) - 50000; // Fallback to random if API fails
    }
};
