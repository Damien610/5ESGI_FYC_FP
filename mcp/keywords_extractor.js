const OLLAMA_BASE_URL = 'http://127.0.0.1:11434';
const OLLAMA_MODEL = 'mistral:7b';

/**
 * Agent de résumé direct
 * @param {string} content - Le texte de la page web à traiter
 * @param {number} max_keyword - La limite de mots souhaitée
 */
export async function runKeywordsExtractor(content, max_keyword = 3) {
    console.log(`[Agent-Keyword] 🤖 Demande de mots clés à Ollama (${max_keyword} mots)...`);

    const prompt = `Analyse le texte suivant et Extrait EXACTEMENT ${max_keyword} mots-clés, pas un de plus..
    Réponds uniquement avec les mots-clés séparés par une virgules.

    TEXTE :
    ${content}
    `
    try {
        const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: OLLAMA_MODEL,
                prompt: prompt,
                stream: false,
                options: {
                    temperature: 0.3
                }
            })
        });

        if (!response.ok) {
            throw new Error(`[Agent-Keyword] Ollama n'a pas répondu correctement (Code: ${response.status})`);
        }
        console.log(`[Agent-Keyword] Fin de tâches`);
        const data = await response.json();
        return data.response.trim();

    } catch (error) {
        console.error("[Agent-Keyword] ❌ Erreur lors du résumé :", error.message);
        throw error;
    }
}