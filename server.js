import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.json({limit:'1mb'}));
app.use(express.static(path.join(__dirname,'public')));
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({apiKey}) : null;

app.get('/api/health', (_req,res) => res.json({aiConfigured: Boolean(ai)}));
app.post('/api/chat', async (req,res) => {
  if (!ai) return res.status(503).json({error:'GEMINI_API_KEY set nahi hai. Server ki .env file mein API key add karo.'});
  const message = String(req.body?.message || '').trim();
  if (!message) return res.status(400).json({error:'Message khaali hai.'});
  if (message.length > 4000) return res.status(400).json({error:'Message bahut lamba hai.'});
  const prior = Array.isArray(req.body?.history) ? req.body.history.slice(-16) : [];
  const transcript = prior.map(m => `${m.role === 'assistant' ? 'Riya' : 'User'}: ${String(m.text || '').slice(0,4000)}`).join('\n');
  const prompt = `You are Riya, a fictional adult AI companion. Speak naturally and warmly in Hindi/Hinglish by default. If the user asks for Bengali/Bangla, reply in Bengali. Answer the actual question directly; do not repeat the same generic sentence. Ask a natural follow-up only when useful. Be honest that you are AI, not a real human. Do not claim to have real-world experiences or to make actual phone calls. Keep most replies conversational and concise.\n\nRecent conversation:\n${transcript}\n\nRespond to the latest user message: ${message}`;
  try {
    const result = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || 'gemini-3.8-flash',
      contents: prompt
    });
    const reply = result.text?.trim();
    if (!reply) throw new Error('AI returned an empty response');
    res.json({reply});
  } catch (e) {
    console.error('Gemini API error:', e?.message || e);
    res.status(502).json({error:'AI service request fail hua. API key, model access, quota aur internet check karo.'});
  }
});
app.get('*', (_req,res) => res.sendFile(path.join(__dirname,'public','index.html')));
app.listen(port, () => console.log(`Riya AI running on port ${port}`));
