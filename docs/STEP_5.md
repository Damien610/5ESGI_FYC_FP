# 📄 ÉTAPE 5 — Extraire le Texte de la Page

## 🎯 Objectif

Créez un script qui extrait le texte de la page web visitée et le renvoie au popup.

---

## 📦 Ce que vous allez créer

**Fichier** : `extension/content.js`

**Fonction** : Écouter les messages et extraire le texte de la page

**Résultat attendu** : Le texte de la page (limité à 1000 mots) est récupérable

---

## 🛠️ Instructions

### 1. Déclarer le content script dans manifest.json

Ajoutez dans `manifest.json` :

```json
"content_scripts": [
  {
    "matches": ["<all_urls>"],
    "js": ["content.js"]
  }
]
```

💡 **Astuce** : Le content script s'injecte automatiquement dans toutes les pages

### 2. Créer content.js

Dans `extension/content.js`, implémentez :

**Écouteur de messages** :
- Utilisez `chrome.runtime.onMessage.addListener()`
- Écoutez l'action `"GET_TEXT"`

**Extraction du texte** :
- Récupérez `document.body.innerText`
- Nettoyez les espaces multiples avec `.replace(/\s+/g, ' ')`
- Limitez à 1000 mots avec `.split(' ').slice(0, 1000).join(' ')`

**Réponse** :
- Utilisez `sendResponse({ text: limitedText })`
- Retournez `true` pour garder le canal ouvert

💡 **Astuce** : Ajoutez des `console.log()` pour déboguer

---

## ✅ Validation

### Tester l'extraction

1. Rechargez l'extension dans `chrome://extensions/`
2. Ouvrez la console de la page web (F12)
3. Ouvrez la console du popup (clic droit sur popup > Inspecter)
4. Dans la console du popup, testez :

```javascript
chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
  chrome.tabs.sendMessage(tabs[0].id, {action: "GET_TEXT"}, (response) => {
    console.log("Texte reçu:", response.text.substring(0, 100));
  });
});
```

**Résultat attendu** : Le texte de la page s'affiche dans la console

---

## 🎓 Points clés

- ✅ Content script injecté dans toutes les pages
- ✅ Communication via `chrome.runtime.onMessage`
- ✅ Extraction et nettoyage du texte
- ✅ Limitation à 1000 mots pour optimiser
- ✅ `sendResponse()` pour répondre de manière asynchrone

---

## 🚀 Prochaine étape

**[➡️ ÉTAPE 6 — Connecter le Popup au Content Script](./STEP_6.md)**

[⬅️ Retour au README](../README.md)
