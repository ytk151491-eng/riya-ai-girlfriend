RIYA AI — REAL AI CONNECTED PROJECT (API KEY REQUIRED)

Yeh fixed-reply demo nahi hai: server Gemini API se har message ka generated answer mangta hai.
Is ZIP mein abhi text AI chat + browser speech-to-text (mic) + browser text-to-speech hai.
Yeh continuous real-time full-duplex voice call nahi hai; voice use turn-by-turn hai. Real-time voice calling ke liye Gemini Live API/WebSocket audio streaming ka extra integration chahiye.

FILES
- public/index.html: mobile UI
- server.js: secure server-side AI API call
- package.json: Node dependencies
- .env.example: environment variable template

RUN ON A COMPUTER / NODE HOST
1. Node.js 20+ install karo.
2. ZIP extract karo; terminal mein project folder kholo.
3. `npm install`
4. `.env.example` ko copy karke `.env` naam do.
5. Google AI Studio se apni Gemini API key banao: https://aistudio.google.com/apikey
6. `.env` file mein GEMINI_API_KEY=YOUR_KEY set karo. Quotes mat lagao.
7. `npm start`
8. Browser mein http://localhost:3000 kholo.

ANDROID PHONE PAR USE
Sirf index.html ko file manager se open karne se backend nahi chalega. Project ko Node.js support wale hosting/server par deploy karna hoga. Host ke environment/secrets settings mein GEMINI_API_KEY add karo, phir us website ko Android Chrome mein kholo. HTTPS par microphone permission dena.

IMPORTANT SECURITY
- API key public HTML, screenshots, Telegram, ya GitHub repository mein mat daalna.
- `.env` commit/share mat karna.
- API key aur model availability/quotas account/region ke hisaab se badal sakte hain. Usage limits/billing check karo.
- Is project ka real AI response tabhi kaam karega jab server deploy ho aur valid key set ho.
- Browser mic recognition aur Hindi voice device/browser ke support par depend karte hain.

REAL LIVE VOICE CALL NEXT STEP
Google Gemini Live API real-time bidirectional audio ke liye hai; WebSocket/audio PCM streaming aur secure session authentication implement karna hoga. Docs:
https://ai.google.dev/gemini-api/docs/live-api/get-started-sdk
https://ai.google.dev/gemini-api/docs/live-api/capabilities

Text API docs:
https://ai.google.dev/gemini-api/docs/text-generation
