// background.js

console.log("🟢 Background.js chargé");

let isProcessing = false;

// 1. Écouter les messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("📥 Message reçu dans background:", message);
    
    if (message.action === "TRIGGER_SUMMARY") {
        // Empêcher de lancer deux requêtes en même temps (sécurité pour Ollama)
        if (isProcessing) {
            console.log("⚠️ Une analyse est déjà en cours...");
            sendResponse({ status: "busy" });
            return true;
        }
        console.log("✅ Démarrage de handleSummaryRequest");
        handleSummaryRequest(message.query, message.text, message.url);
        sendResponse({ status: "started" });
        return true;
    }
});

async function handleSummaryRequest(query, text, url) {
    console.log("🚀 handleSummaryRequest démarré");
    console.log("Query:", query);
    console.log("Text length:", text.length);
    console.log("URL:", url);
    
    isProcessing = true;

    try {
        // 1. Feedback Visuel : Badge de chargement
        chrome.action.setBadgeText({ text: "..." });
        chrome.action.setBadgeBackgroundColor({ color: "#3b82f6" });

        // 2. Appel au serveur Bridge
        console.log("📤 Envoi requête vers http://127.0.0.1:3000/ask");
        const response = await fetch('http://127.0.0.1:3000/ask', {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, text })
        });

        console.log("📥 Réponse reçue, status:", response.status);

        if (!response.ok) throw new Error(`Erreur serveur: ${response.status}`);

        const data = await response.json();
        console.log("📊 Données reçues:", data);

        if (data.success) {
            // 3. Sauvegarder dans le storage local (Persistance Séance 3)
            const storageData = {};
            storageData[url] = {
                summary: data.summary,
                keywords: data.keywords,
                timestamp: Date.now()
            };
            console.log("💾 Sauvegarde dans storage:", storageData);
            await chrome.storage.local.set(storageData);

            // 4. Notification de succès
            chrome.action.setBadgeText({ text: "✓" });
            chrome.action.setBadgeBackgroundColor({ color: "#10b981" }); // Vert
            console.log("✅ Traitement terminé avec succès");
        } else {
            throw new Error(data.error || "Erreur inconnue");
        }
    } catch (error) {
        console.error("❌ Erreur Background:", error);
        chrome.action.setBadgeText({ text: "ERR" });
        chrome.action.setBadgeBackgroundColor({ color: "#ef4444" }); // Rouge
    } finally {
        isProcessing = false;
        // Effacer le badge après 3 secondes
        setTimeout(() => chrome.action.setBadgeText({ text: "" }), 3000);
    }
}
