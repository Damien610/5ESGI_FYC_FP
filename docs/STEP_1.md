# 📝 ÉTAPE 1 — Créer un Agent de Résumé Automatique

## 🎯 Objectif

Implémentez une fonction asynchrone capable de communiquer avec Ollama pour résumer du texte.

---

## 📦 Ce que vous allez créer

**Fichier** : `mcp/summarizer.js`

**Fonction** : `runSummarizer(content, max_length = 150)`

**Résultat attendu** : Un résumé concis du texte fourni

---

## 🛠️ Instructions

### 1. Configuration

Constantes à utiliser :
- **URL Ollama** : `http://127.0.0.1:11434/api/generate`
- **Modèle** : `gemma3:4b`
- **Temperature** : `0.3`
- **Stream** : `false`

### 2. Signature de la fonction

```javascript
export async function runSummarizer(content, max_length = 150) {
  // À compléter
}
```

### 3. Construction du prompt

Votre prompt doit :
- Définir le rôle : "Assistant expert en synthèse"
- Donner la consigne : résumer en maximum `${max_length}` mots
- Injecter le contenu : `${content}`

💡 **Astuce** : Utilisez les template literals (backticks)

### 4. Appel API

Utilisez `fetch()` avec :
- Méthode : `POST`
- Header : `Content-Type: application/json`
- Body : objet JSON contenant `model`, `prompt`, `stream`, `options: { temperature }`

💡 **Astuce** : N'oubliez pas `JSON.stringify()` pour le body et `.json()` pour parser la réponse

### 5. Gestion des erreurs

- Enveloppez le code dans `try/catch`
- Loggez les erreurs avec `console.error()`
- Relancez l'erreur avec `throw`
- Retournez `data.response.trim()`

---

## ✅ Validation

Dans `mcp/bridge.js` :

```javascript
import { runSummarizer } from './summarizer.js';

// Ajouter dans app.use(cors({ origin: [...] })) :
origin: [
  `http://localhost:${PORT}`,
  `http://127.0.0.1:${PORT}`
]

// Créer une route POST /summarize
app.post('/summarize', async (req, res) => {
  // À compléter : récupérer text et max_length du body
  // Appeler runSummarizer()
  // Retourner le résultat en JSON
});
```

**Lancer le serveur** :
```bash
cd mcp
npm run dev
```

**Tester avec curl** :
```bash
curl -X POST http://localhost:3000/summarize \
  -H "Content-Type: application/json" \
  -d @poeme.json
```

**Résultat attendu** : Un résumé du poème en 5 mots

---

## 🎓 Points clés

- ✅ Fonction asynchrone avec `async/await`
- ✅ Communication HTTP avec `fetch()`
- ✅ Prompt engineering avec injection de variables
- ✅ Gestion d'erreurs robuste
- ✅ Paramétrage du modèle LLM

---

## 🚀 Prochaine étape

**[➡️ ÉTAPE 2 — Créer l'agent Keywords Extractor](./STEP_2.md)**

[⬅️ Retour au README](../README.md)
