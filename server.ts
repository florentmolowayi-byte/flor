import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === "production" || process.env.RENDER === "true";

app.use(express.json());

// Initialize Gemini API client lazily or safely
let aiClient: GoogleGenAI | null = null;
function getGenAI() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      aiClient = new GoogleGenAI({ apiKey });
    }
  }
  return aiClient;
}

function detectRequestedLanguage(message: string): string | null {
  const languageNames = [
    "English", "French", "German", "Italian", "Japanese",
    "Spanish", "Portuguese", "Turkish", "Chinese",
  ];
  const normalizedMessage = message.toLowerCase();
  return languageNames.find((name) => normalizedMessage.includes(name.toLowerCase())) || null;
}

// API Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// AI Duo Conversation Partner endpoint
app.post("/api/duo-chat", async (req, res) => {
  const requestedLanguage = typeof req.body?.userMessage === "string"
    ? detectRequestedLanguage(req.body.userMessage)
    : null;
  const targetLanguage = requestedLanguage || (typeof req.body?.language === "string" && req.body.language.trim()
    ? req.body.language.trim()
    : "English");

  try {
    const { language, userMessage, history } = req.body;

    if (typeof userMessage !== "string" || !userMessage.trim()) {
      return res.status(400).json({ error: "A message is required." });
    }

    const genAI = getGenAI();
    if (!genAI) {
      // Fallback response if GEMINI_API_KEY is not configured
      return res.json({
        reply: `I received your ${targetLanguage} message: "${userMessage}". I can practice with you, but the AI service needs to be configured for full answers.`,
        correction: null,
        tip: "Practice speaking full sentences to gain extra XP!",
        xpEarned: 10
      });
    }

    const systemPrompt = `You are Duo, the friendly, playful green owl mascot from Duolingo!
  You are helping the user practice ${targetLanguage}.
  Answer the user's actual question first. Respond in a friendly, concise, encouraging manner (1-3 sentences in ${targetLanguage} with an English translation in parentheses if helpful).
If the user's message contained a grammar or vocabulary mistake, gently provide a correction.
Also provide a short 1-line grammar or vocabulary tip.

Format your response as JSON with this exact structure:
{
  "reply": "Duo's response in target language (with brief English hint)",
  "correction": "Optional correction if there was a mistake, or null",
  "tip": "Short helpful learning tip",
  "xpEarned": 10
}`;

    const promptText = `${systemPrompt}\n\nRecent conversation history: ${JSON.stringify(history || [])}\nUser says: "${userMessage}"`;

    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: promptText,
      config: {
        responseMimeType: "application/json"
      }
    });

    const responseText = response.text || "{}";
    let parsedData;
    try {
      parsedData = JSON.parse(responseText);
    } catch {
      parsedData = {
        reply: `Thanks for your question about ${targetLanguage}: "${userMessage}". Keep practicing!`,
        correction: null,
        tip: "Keep up your daily streak to stay at the top of the leaderboard!",
        xpEarned: 10
      };
    }

    if (!parsedData || typeof parsedData.reply !== "string" || !parsedData.reply.trim()) {
      return res.status(502).json({ error: "The AI returned an invalid response." });
    }

    res.json(parsedData);
  } catch (err: any) {
    console.error("Duo Chat Error:", err);
    res.json({
      reply: `I received your question in ${targetLanguage}: "${req.body.userMessage}". The AI service is temporarily unavailable, but you can keep practicing while it reconnects.`,
      correction: null,
      tip: `Try writing a complete sentence in ${targetLanguage}.`,
      xpEarned: 10,
    });
  }
});

// Setup Vite development middleware or serve static files in production
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"), (err) => {
        if (err) {
          console.error("Failed to serve index.html", err);
          res.status(404).send("Not Found");
        }
      });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Duolingo App server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
