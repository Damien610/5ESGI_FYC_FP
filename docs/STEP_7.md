# ⚙️ ÉTAPE 7 — Implémenter le Background Service Worker

## 🎯 Objectif

Créez le service worker qui communique avec le serveur Node.js et gère le stockage des résultats.

---

## 📦 Ce que vous allez créer

**Fichier** : `extension/background.js`

**Fonction** : Recevoir les requêtes, appeler l'API, sauvegarder les résultats

**Résultat attendu** : Les résultats sont stockés et le badge affiche le statut

---

## 🛠️ Instructions

### 1. Déclarer le background dans manifest.json

Ajoutez dans `manifest.json` :

```json
"background": {
  "service_worker": "background.js"
},
"permissions": ["storage"],
"host_permissions": ["http://localhost:3000/*"]
```

### 2. Créer background.js

Dans `extension/background.js`, implémentez :

**Écouteur de messages** :
- Utilisez `chrome.runtime.onMessage.addListener()`
- Écoutez l'action `"TRIGGER_SUMMARY"`
- Appelez une fonction `handleSummaryRequest()`

**Fonction handleSummaryRequest** :
- Paramètres : `query`, `text`, `url`
- Afficher un badge de chargement : `chrome.action.setBadgeText({ text: "..." })`
- Faire un `fetch` vers `http://127.0.0.1:3000/ask`
- Méthode : `POST`, body : `{ query, text }`

**Sauvegarde des résultats** :
- Si succès, sauvegarder dans `chrome.storage.local.set()`
- Format : `{ [url]: { summary, keywords, timestamp } }`
- Badge vert : `chrome.action.setBadgeText({ text: "✓" })`

**Gestion d'erreurs** :
- En cas d'erreur, badge rouge : `chrome.action.setBadgeText({ text: "ERR" })`
- Effacer le badge après 3 secondes

💡 **Astuce** : Utilisez une variable `isProcessing` pour éviter les requêtes multiples

---

## ✅ Validation

### Tester le flux complet

1. Assurez-vous que le serveur Node.js tourne (`npm run dev`)
2. Rechargez l'extension
3. Ouvrez une page web
4. Cliquez sur l'extension et entrez : "Résumé en 40 mots et 3 mots-clés"
5. Cliquez sur "Analyser"
6. Observez le badge de l'extension (doit afficher "...", puis "✓")

**Vérifier le stockage** :
```javascript
// Dans la console du background (chrome://extensions/ > Détails > Inspecter)
chrome.storage.local.get(null, (data) => console.log(data));
```

**Résultat attendu** : Les résultats sont stockés avec l'URL comme clé

---

## 🎓 Points clés

- ✅ Service worker pour Manifest V3
- ✅ Communication avec API externe via fetch
- ✅ Stockage persistant avec chrome.storage.local
- ✅ Feedback visuel avec badge
- ✅ Gestion d'erreurs et états de chargement

---

## 🚀 Prochaine étape

**[➡️ ÉTAPE 8 — Afficher les Résultats dans le Popup](./STEP_8.md)**

[⬅️ Retour au README](../README.md)
