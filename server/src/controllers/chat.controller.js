import { GoogleGenAI } from "@google/genai";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Lazy-init: create the client only when the first request arrives,
// guaranteeing that dotenv has already loaded by then.
let genAI = null;
function getClient() {
  if (!genAI) {
    if (!process.env.GEMINI_API_KEY) {
      throw new ApiError(500, "Gemini API key is not configured");
    }
    genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return genAI;
}

const SYSTEM_PROMPT = `You are "CareerSync AI", a friendly and knowledgeable career guidance counselor for Indian students. Your expertise includes:
- Indian education system (CBSE, ICSE, State Boards)
- Entrance exams (JEE, NEET, CUET, J&K CET, GATE, CAT, etc.)
- College and university recommendations across India
- Career paths and job market trends
- Scholarship and financial aid opportunities
- Skill development and extracurricular advice
- Special focus on students from Jammu & Kashmir

Guidelines:
- Keep responses concise (2-4 paragraphs max) and conversational
- Use bullet points for lists
- Be encouraging and supportive
- Provide actionable, specific advice
- If the user shares their stream/class/location, tailor your advice accordingly
- If you don't know something, say so honestly rather than making things up
- Do NOT use markdown headers (# or ##) in responses — use bold text instead
- Focus ONLY on education and career-related topics; politely redirect off-topic questions`;

/**
 * POST /api/v1/chat
 * Body: { message: string, history?: Array<{ role: string, content: string }>, userContext?: object }
 */
const chatWithGemini = asyncHandler(async (req, res) => {
  const { message, history = [], userContext } = req.body;

  if (!message || typeof message !== "string" || !message.trim()) {
    throw new ApiError(400, "Message is required");
  }

  const ai = getClient();

  // Build context from user profile if available
  let contextPreamble = "";
  if (userContext) {
    const parts = [];
    if (userContext.name) parts.push(`Student name: ${userContext.name}`);
    if (userContext.stream) parts.push(`Stream: ${userContext.stream}`);
    if (userContext.currentClass)
      parts.push(`Current class: ${userContext.currentClass}`);
    if (userContext.location) parts.push(`Location: ${userContext.location}`);
    if (userContext.interests?.length)
      parts.push(`Interests: ${userContext.interests.join(", ")}`);
    if (parts.length > 0) {
      contextPreamble = `\n\nStudent profile:\n${parts.join("\n")}`;
    }
  }

  // Convert history to Gemini format
  const geminiHistory = history
    .filter((msg) => msg.content && msg.content.trim())
    .map((msg) => ({
      role: msg.role === "bot" || msg.role === "model" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

  // Create chat session and send message
  const chat = ai.chats.create({
    model: "gemini-2.5-flash",
    history: geminiHistory,
    config: {
      systemInstruction: SYSTEM_PROMPT + contextPreamble,
      temperature: 0.7,
    },
  });

  const result = await chat.sendMessage({ message: message.trim() });
  const responseText = result.text;

  return res.status(200).json(
    new ApiResponse(200, { reply: responseText }, "Response generated")
  );
});

export { chatWithGemini };