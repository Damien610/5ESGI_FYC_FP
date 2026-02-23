const OLLAMA_BASE_URL = 'http://127.0.0.1:11434';
const OLLAMA_MODEL = 'gemma3:4b';

export async function planActions(userQuery) {
    const prompt = `Tu es un répartiteur de tâches. Analyse la requête utilisateur et décide quels outils utiliser.

    Outils disponibles :
    - summarize_content : si l'utilisateur veut un résumé, une synthèse ou un condensé.
    - extract_keywords : si l'utilisateur veut des mots-clés, des thèmes ou les points importants.

    Règles critiques :
    1. Si l'utilisateur mentionne un nombre de mots pour le résumé, utilise-le pour "extract_keywords".
    2. Si l'utilisateur mentionne un nombre de mots-clés, utilise-le pour "max_keyword".
    3. Réponds UNIQUEMENT en JSON.
    
    Requête : "${userQuery}"

    Exemple de réponse pour "résumé de 40 mots et 3 mots-clés" :
    {"actions": [{"tool": "summarize_content", "params": {"max_length": 40}}, {"tool": "extract_keywords", "params": {"max_keyword": 3}}]}
    `;

    try {
        const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: OLLAMA_MODEL,
                prompt: prompt,
                stream: false,
                format: "json"
            })
        });

        const data = await response.json();
        return JSON.parse(data.response);
    } catch (err) {
        console.error("❌ Erreur Planification :", err);
        return { actions: [{ tool: "summarize_content", params: { maxLength: 150 } }] };
    }
}