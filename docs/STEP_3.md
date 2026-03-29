# 🎭 ÉTAPE 3 — Créer l'Orchestrateur

## 🎯 Objectif

Implémentez une fonction capable d'analyser une requête en langage naturel et de décider quels agents utiliser.

---

## 📦 Ce que vous allez créer

**Fichier** : `mcp/orchestrator.js`

**Fonction** : `planActions(userQuery)`

**Résultat attendu** : Un objet JSON avec les actions à exécuter

---

## 🛠️ Instructions

### 1. Configuration

Constantes à utiliser :
- **URL Ollama** : `http://127.0.0.1:11434/api/generate`
- **Modèle** : `gemma3:4b`
- **Stream** : `false`
- **Format** : `json`

### 2. Signature de la fonction

```javascript
export async function planActions(userQuery) {
  // À compléter
}
```

### 3. Construction du prompt

Votre prompt doit :
- Définir le rôle : "Tu es un répartiteur de tâches"
- Lister les outils disponibles :
  - `summarize_content` : pour résumé/synthèse
  - `extract_keywords` : pour mots-clés/thèmes
- Donner les règles :
  - Extraire le nombre de mots pour `max_length`
  - Extraire le nombre de mots-clés pour `max_keyword`
  - Répondre UNIQUEMENT en JSON
- Injecter la requête : `${userQuery}`
- Fournir un exemple de réponse

💡 **Astuce** : Le format de sortie doit être `{"actions": [{"tool": "...", "params": {...}}]}`

### 4. Appel API

Utilisez `fetch()` avec :
- Méthode : `POST`
- Header : `Content-Type: application/json`
- Body : objet JSON contenant `model`, `prompt`, `stream`, `format: "json"`

💡 **Astuce** : Le paramètre `format: "json"` force Ollama à répondre en JSON valide

### 5. Gestion des erreurs

- Enveloppez le code dans `try/catch`
- Parsez la réponse avec `JSON.parse(data.response)`
- En cas d'erreur, retournez un plan par défaut :
  ```javascript
  { actions: [{ tool: "summarize_content", params: { max_length: 150 } }] }
  ```

---

## ✅ Validation

Dans `mcp/bridge.js` :

```javascript
import { planActions } from './orchestrator.js';
import { runSummarizer } from './summarizer.js';
import { runKeywordsExtractor } from './keywords_extractor.js';

// Créer une route POST /ask
app.post('/ask', async (req, res) => {
  const { text, query } = req.body;
  
  // 1. Appeler planActions(query) pour obtenir le plan
  // 2. Parcourir les actions du plan
  // 3. Pour chaque action, appeler l'agent correspondant avec le texte
  // 4. Retourner les résultats en JSON
});
```

**Tester avec curl** :
```bash
curl -X POST http://localhost:3000/ask \
  -H "Content-Type: application/json" \
  -d @test_naturel.json
```

**Résultat attendu** : 
```json
{
  "summary": "...",
  "keywords": "..."
}
```

---

## 🎓 Points clés

- ✅ Analyse de langage naturel avec LLM
- ✅ Format JSON structuré avec `format: "json"`
- ✅ Orchestration multi-agents
- ✅ Gestion de fallback en cas d'erreur
- ✅ Extraction de paramètres dynamiques

---

## 🚀 Prochaine étape

**[➡️ ÉTAPE 4 — Créer l'extension Chrome](./STEP_4.md)**

[⬅️ Retour au README](../README.md)
