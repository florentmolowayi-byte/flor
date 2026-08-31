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
    const apiKey = process.env.GEMINI_API_KEY?.trim();
    if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
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

function normalizeHistory(history: unknown) {
  if (!Array.isArray(history)) return [];

  return history
    .filter((item): item is { sender: string; text: string } =>
      Boolean(item) && typeof item === "object" && typeof (item as { sender?: unknown }).sender === "string" && typeof (item as { text?: unknown }).text === "string"
    )
    .slice(-12)
    .map((item) => ({
      role: item.sender === "user" ? "user" : "model",
      text: item.text,
    }));
}

function getOfflineCoachReply(language: string, message: string) {
  const replies: Record<string, { reply: string; tip: string }> = {
    English: {
      reply: `Hi! Great to meet you. You wrote: "${message}". Let's practice English together.`,
      tip: "Try: Hello, my name is ...",
    },
    French: {
      reply: `Bonjour ! Ravi de te rencontrer. Tu as écrit : "${message}". Pratiquons le français ensemble.`,
      tip: "Essaie : Bonjour, je m'appelle ...",
    },
    German: {
      reply: `Hallo! Schön, dich kennenzulernen. Du hast geschrieben: "${message}". Üben wir gemeinsam Deutsch.`,
      tip: "Versuche: Hallo, ich heiße ...",
    },
    Italian: {
      reply: `Ciao! Piacere di conoscerti. Hai scritto: "${message}". Pratichiamo l'italiano insieme.`,
      tip: "Prova: Ciao, mi chiamo ...",
    },
    Japanese: {
      reply: `こんにちは！お会いできてうれしいです。「${message}」と書きましたね。一緒に日本語を練習しましょう。`,
      tip: "試してみましょう：こんにちは、私は ... です。",
    },
    Spanish: {
      reply: `¡Hola! Mucho gusto. Escribiste: "${message}". Practiquemos español juntos.`,
      tip: "Prueba: Hola, me llamo ...",
    },
    Portuguese: {
      reply: `Olá! Prazer em conhecer você. Você escreveu: "${message}". Vamos praticar português juntos.`,
      tip: "Tente: Olá, meu nome é ...",
    },
    Turkish: {
      reply: `Merhaba! Tanıştığımıza memnun oldum. Şunu yazdın: "${message}". Birlikte Türkçe pratik yapalım.`,
      tip: "Şunu deneyin: Merhaba, benim adım ...",
    },
    Chinese: {
      reply: `你好！很高兴认识你。你写的是：“${message}”。让我们一起练习中文吧。`,
      tip: "试试：你好，我叫……",
    },
  };
  return replies[language] || replies.English;
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
    const { userMessage, history } = req.body;

    if (typeof userMessage !== "string" || !userMessage.trim()) {
      return res.status(400).json({ error: "A message is required." });
    }

    const genAI = getGenAI();
    if (!genAI) {
      const offlineReply = getOfflineCoachReply(targetLanguage, userMessage);
      return res.json({
        reply: offlineReply.reply,
        correction: null,
        tip: `${offlineReply.tip} (Offline practice mode)`,
        xpEarned: 10
      });
    }

    const systemPrompt = `You are Duo, a warm and knowledgeable language conversation partner.
The user is asking you questions in English and wants a real, accurate conversation. Answer the user's actual question directly before offering language-learning guidance. Be natural, specific, and detailed enough to be useful; do not repeat a generic greeting or simply quote the user's message.
The practice language is ${targetLanguage}. Keep the main answer in ${targetLanguage}, but use English when the user asks in English or when it makes an explanation clearer. Match the user's tone and question. Ask a relevant follow-up question only when it genuinely helps continue the conversation.
If the user's message contains a grammar or vocabulary mistake in ${targetLanguage}, gently provide a correction. Otherwise, set correction to null.
Also provide one short, relevant learning tip. Do not invent facts; say when you are uncertain.

Format your response as JSON with this exact structure:
{
  "reply": "A direct, natural, useful answer to the user's question",
  "correction": "Optional correction if there was a mistake, or null",
  "tip": "Short helpful learning tip",
  "xpEarned": 10
}`;

    const promptText = `${systemPrompt}\n\nRecent conversation history: ${JSON.stringify(normalizeHistory(history))}\n\nUser says: ${JSON.stringify(userMessage)}`;

    const response = await genAI.models.generateContent({
      model: "gemini-3.6-flash",
      contents: promptText,
      config: {
        responseMimeType: "application/json",
        temperature: 0.7,
      }
    });

    const responseText = response.text || "{}";
    let parsedData;
    try {
      parsedData = JSON.parse(responseText);
    } catch {
      return res.status(502).json({ error: "The AI returned an unreadable response." });
    }

    if (!parsedData || typeof parsedData.reply !== "string" || !parsedData.reply.trim()) {
      return res.status(502).json({ error: "The AI returned an invalid response." });
    }

    res.json(parsedData);
  } catch (err: any) {
    console.error("Duo Chat Error:", err);
    res.status(502).json({ error: "The language AI is temporarily unavailable. Please try again shortly." });
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
