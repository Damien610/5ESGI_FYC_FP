import express from 'express';
import cors from 'cors';
import { planActions } from './orchestrator.js';
import { runSummarizer } from './summarizer.js';
import { runKeywordsExtractor } from './keywords_extractor.js';

//Configuration
const PORT = 3000;
const CHROME_EXTENSION_ID = "phbfcojgcpdgdpjadjeaopeacappdjcb"
const app = express()

app.use(cors({
    origin: [
        `chrome-extension://${CHROME_EXTENSION_ID}`,
        `http://localhost:${PORT}`,
        `http://127.0.0.1:${PORT}/*`
    ],
    methods: ['POST', 'GET'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
}))

app.use(express.json());

app.use((req, _res, next) => {
    console.log(`📥 ${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.send(`
        <h1>🚀 Bridge Server Opérationnel</h1>
        <p>Le serveur écoute sur le port <b>${PORT}</b>.</p>
        <p>Prêt à recevoir des requêtes de l'extension : <code>chrome-extension://${CHROME_EXTENSION_ID}</code></p>
    `);
});

app.post('/summarize', async(req, res) => {
    console.log("📥 [BRIDGE] Données reçues :", req.body);

    try {
        console.log("🤖 [BRIDGE] Tentative d'appel de l'Agent...");
        const summary = await runSummarizer(req.body.text, req.body.max_length);

        console.log("✅ [BRIDGE] Résumé généré avec succès");
        res.json({ success: true, summary });
    } catch (error) {
        console.error("❌ [BRIDGE] L'Agent a échoué :", error.message);
        res.status(500).json({ error: "Erreur interne de l'agent" });
    }
});

app.post('/keywords', async(req, res) => {
    const { text, maxKeywords } = req.body;

    if (!text) return res.status(400).json({ error: "Texte manquant" });

    try {
        const keywords = await runKeywordsExtractor(text, max_keywords || 5);
        res.json({ success: true, keywords });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.post('/ask', async(req, res) => {
    const { query, text } = req.body;
    console.log(`🤖 L'utilisateur demande : "${query}"`);

    try {
        const plan = await planActions(query);

        console.log(`📋 PLAN D'ACTION :`, JSON.stringify(plan, null, 2));

        const results = {};

        for (const action of plan.actions) {
            if (action.tool === 'summarize_content') {
                const length = (action.params && action.params.max_length) || 150;

                console.log(`[Bridge] 📝 Résumé demandé (Taille : ${length})`);
                results.summary = await runSummarizer(text, length);
            }
            if (action.tool === 'extract_keywords') {
                const count = (action.params && (action.params.max_keywords || action.params.max_keyword)) || 5;

                console.log(`[Bridge] 🔍 Mots-clés demandés (Nombre : ${count})`);
                results.keywords = await runKeywordsExtractor(text, count);
            }
        }
        console.log(results);
        res.json({ success: true, ...results });
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de l'orchestration" });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n-----------------------------------------`);
    console.log(`🚀 SERVEUR DÉMARRÉ sur http://0.0.0.0:${PORT}`);
    console.log(`📡 Accessible depuis Windows via http://localhost:${PORT}`);
    console.log(`-----------------------------------------\n`);
});