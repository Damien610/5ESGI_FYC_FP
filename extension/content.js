console.log("✅ Content Script injecté et prêt");

// 1. Écouteur pour la Popup (quand l'utilisateur clique sur "Analyser")
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("📥 Message reçu dans content.js:", request);
    
    if (request.action === "GET_TEXT") {
        const fullText = document.body.innerText.replace(/\s+/g, ' ').trim();
        const wordsArray = fullText.split(' ');

        const limitedText = wordsArray.slice(0, 1000).join(' ');

        console.log("📄 Texte envoyé à la popup (limité à 1000 mots)");
        sendResponse({ text: limitedText });
    }
    return true;
});

// 2. Création du bouton flottant (Shadow DOM)
const container = document.createElement('div');
container.id = "ollama-summary-trigger";
document.body.appendChild(container);

const shadow = container.attachShadow({ mode: 'open' });

shadow.innerHTML = `
  <style>
    button {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 50px;
      height: 50px;
      background: #3b82f6;
      color: white;
      border-radius: 50%;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      z-index: 999999;
      font-size: 24px;
      transition: transform 0.2s, background 0.2s;
    }
    button:hover {
      transform: scale(1.1);
      background: #2563eb;
    }
    button:active {
      transform: scale(0.9);
    }
  </style>
  <button title="Résumer avec Ollama">🤖</button>
`;

console.log("🤖 Bouton flottant créé");

// 3. Action du bouton robot
shadow.querySelector('button').onclick = () => {
    console.log("🖱️ Bouton robot cliqué!");
    
    const text = document.body.innerText.replace(/\s+/g, ' ').trim();
    const contextText = text.split(' ').slice(0, 1000).join(' ');

    console.log("📝 Texte extrait, longueur:", contextText.length);
    console.log("📤 Envoi message TRIGGER_SUMMARY au background...");

    chrome.runtime.sendMessage({
        action: "TRIGGER_SUMMARY",
        query: "Résume-moi ce texte et extrais les mots-clés de manière structurée",
        text: contextText,
        url: window.location.href
    }, (response) => {
        console.log("✅ Message envoyé au background");
        if (chrome.runtime.lastError) {
            console.error("❌ Erreur:", chrome.runtime.lastError);
        }
    });
};
