import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Gemini Chat
  app.post("/api/gemini/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required." });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        console.warn("GEMINI_API_KEY is not set.");
        return res.status(200).json({
          text: "I am running in Offline Demo Mode because the GEMINI_API_KEY is not configured in the environment settings. However, I can still tell you that bamboo is an incredible sustainable material! It grows extremely fast, absorbs 35% more carbon dioxide than regular trees, and is self-regenerative. Let me know what questions you have about our engineered bamboo designs, like the Bamboo Performance Cycle or our Moso Tech Keyboard!",
          isConfigured: false
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const systemInstruction = `You are the official AI assistant of the Bamboo Sustainability Initiative (BSI), founded by Parker Yingst (ZenkoParx).
Your task is to provide expert, engaging, and scientifically accurate information about bamboo sustainability, industrial bamboo engineering, carbon footprint comparison, and BSI's vision.
Mention and answer questions regarding our premium showcases like:
1. Bamboo Performance Cycle: High-strength, shock-absorbing frame made of laminated Guadua bamboo, and its role as a low-carbon transport solution.
2. Moso Tech Keyboard: Mechanical keyboard framed with sustainably harvested solid Moso bamboo.
3. Eco-Fibre Activewear: Moisture-wicking apparel made from enzymatic bamboo cellulose.
4. Laminated Bamboo Timber: Structural building blocks for sustainable architectures.

Acknowledge that this is an unofficial, community-led framework and pilot campaign aiming to build public awareness and choice before official regulatory standardization.
Be polite, eco-friendly, and concise. Format your responses beautifully in markdown.`;

      const contents = [];
      if (history && Array.isArray(history)) {
        for (const msg of history) {
          contents.push({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.text }]
          });
        }
      }
      contents.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const reply = response.text || "I apologize, but I couldn't generate a reply.";
      res.json({ text: reply, isConfigured: true });

    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
