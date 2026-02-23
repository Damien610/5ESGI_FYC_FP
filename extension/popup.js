// popup.js

console.log("🟢 Popup.js chargé");

document.addEventListener('DOMContentLoaded', async() => {
    console.log("🟢 DOMContentLoaded déclenché");
    
    // Éléments UI
    const btnSend = document.getElementById('btn-send');
    const inputQuery = document.getElementById('user-query');
    const resultDiv = document.getElementById('result');

    console.log("🔍 Éléments trouvés:", { btnSend, inputQuery, resultDiv });

    // Récupérer l'onglet actif dès l'ouverture
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    console.log("📑 Onglet actif:", tab.url);

    // --- ÉTAPE 1 : Persistance (Affichage immédiat du cache) ---
    const cached = await chrome.storage.local.get(tab.url);
    if (cached[tab.url]) {
        console.log("✅ Données trouvées en cache");
        displayResults(cached[tab.url]);
    } else {
        console.log("ℹ️ Aucune donnée en cache pour cette page");
    }

    // --- ÉTAPE 2 : Envoi de l'intention ---
    btnSend.addEventListener('click', () => {
        console.log("🖱️ Bouton cliqué");
        const query = inputQuery.value.trim();
        console.log("📝 Query:", query);
        
        if (!query) {
            console.warn("⚠️ Query vide");
            return;
        }

        // Affichage immédiat du loader
        showLoading();

        // Demander le texte au Content Script
        console.log("📤 Envoi message GET_TEXT au content script...");
        chrome.tabs.sendMessage(tab.id, { action: "GET_TEXT" }, (response) => {
            if (chrome.runtime.lastError) {
                console.error("❌ Erreur runtime:", chrome.runtime.lastError);
                resultDiv.innerHTML = "❌ <span style='color:red'>Erreur : Impossible de lire la page.</span>";
                return;
            }
            
            if (!response) {
                console.error("❌ Pas de réponse du content script");
                resultDiv.innerHTML = "❌ <span style='color:red'>Erreur : Impossible de lire la page.</span>";
                return;
            }

            console.log("✅ Texte reçu du content script:", response.text.substring(0, 100) + "...");

            // Délégation au Background (le Chef)
            console.log("📤 Envoi message TRIGGER_SUMMARY au background...");
            chrome.runtime.sendMessage({
                action: "TRIGGER_SUMMARY",
                query: query,
                text: response.text,
                url: tab.url
            });

            console.log("✅ Message envoyé au background");
        });
    });
});

// --- ÉTAPE 3 : Réactivité (Mise à jour automatique) ---
chrome.storage.onChanged.addListener((changes, area) => {
    console.log("🔄 Storage changé:", changes);
    if (area === 'local') {
        chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
            if (tab && changes[tab.url]) {
                console.log("🔄 Mise à jour détectée, affichage des résultats...");
                displayResults(changes[tab.url].newValue);
            }
        });
    }
});

// --- Fonctions d'affichage ---

function showLoading() {
    console.log("⏳ Affichage du loader");
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <div style="text-align:center; padding: 20px;">
            <div class="loader"></div> 
            <p style="color: #666;">🤖 Ollama analyse la page...<br><small>(Cela peut prendre 10-15s)</small></p>
        </div>
    `;
}

function displayResults(data) {
    console.log("📊 Affichage des résultats:", data);
    if (!data) return;
    const resultDiv = document.getElementById('result');
    const container = document.getElementById('result-container');

    container.classList.remove('hidden');

    // Transformation des mots-clés en badges
    const keywordsHTML = data.keywords ?
        data.keywords.split(',').map(k => `<span class="badge">${k.trim()}</span>`).join('') :
        '';

    resultDiv.innerHTML = `
        <div style="margin-bottom: 12px;">${data.summary}</div>
        <div class="tags-container" style="border-top: 1px solid #e2e8f0; pt-8 mt-8">
            <div style="margin-bottom: 4px;"><small><b>MOTS-CLÉS</b></small></div>
            ${keywordsHTML}
        </div>
    `;
}