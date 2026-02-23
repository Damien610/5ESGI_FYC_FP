const OLLAMA_BASE_URL = 'http://127.0.0.1:11434';
const OLLAMA_MODEL = 'gemma3:4b';

/**
 * Agent de résumé direct
 * @param {string} content - Le texte de la page web à traiter
 * @param {number} max_length - La limite de mots souhaitée
 */
export async function runSummarizer(content, max_length = 150) {
    console.log(`[Agent-Summarizer] 🤖 Demande de résumé à Ollama (${max_length} mots)...`);

    const prompt = `Tu es un assistant expert en synthèse.
    Résume le text suivant de manière claire et structurée en environ ${max_length} mots.

    TEXTE À RÉSUMER :
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
            throw new Error(`Ollama n'a pas répondu correctement (Code: ${response.status})`);
        }
        console.log(`[Agent-Summarizer] Fin de tâches`);
        const data = await response.json();
        return data.response.trim();

    } catch (error) {
        console.error("[Agent-Summarizer] ❌ Erreur lors du résumé :", error.message);
        throw error;
    }
}