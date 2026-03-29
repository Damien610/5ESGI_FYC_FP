# 🔑 ÉTAPE 2 — Créer un Agent d'Extraction de Mots-Clés

## 🎯 Objectif

Implémentez une fonction asynchrone capable de communiquer avec Ollama pour extraire des mots-clés d'un texte.

---

## 📦 Ce que vous allez créer

**Fichier** : `mcp/keywords_extractor.js`

**Fonction** : `runKeywordsExtractor(content, max_keyword = 3)`

**Résultat attendu** : Une liste de mots-clés séparés par des virgules

---

## 🛠️ Instructions

### 1. Configuration

Constantes à utiliser :
- **URL Ollama** : `http://127.0.0.1:11434/api/generate`
- **Modèle** : `mistral:7b`
- **Temperature** : `0.3`
- **Stream** : `false`

### 2. Signature de la fonction

```javascript
export async function runKeywordsExtractor(content, max_keyword = 3) {
  // À compléter
}
```

### 3. Construction du prompt

Votre prompt doit :
- Définir la tâche : "Analyse le texte suivant et extrait EXACTEMENT `${max_keyword}` mots-clés"
- Donner le format de sortie : "Réponds uniquement avec les mots-clés séparés par des virgules"
- Injecter le contenu : `${content}`

💡 **Astuce** : Soyez précis dans les instructions pour obtenir un format cohérent

### 4. Appel API

Utilisez `fetch()` avec :
- Méthode : `POST`
- Header : `Content-Type: application/json`
- Body : objet JSON contenant `model`, `prompt`, `stream`, `options: { temperature }`

💡 **Astuce** : Même structure que le Summarizer, seul le modèle change

### 5. Gestion des erreurs

- Enveloppez le code dans `try/catch`
- Vérifiez `response.ok` avant de parser
- Loggez les erreurs avec `console.error()`
- Relancez l'erreur avec `throw`
- Retournez `data.response.trim()`

---

## ✅ Validation

Dans `mcp/bridge.js` :

```javascript
import { runKeywordsExtractor } from './keywords_extractor.js';

// Créer une route POST /keywords
app.post('/keywords', async (req, res) => {
  // À compléter : récupérer text et max_keyword du body
  // Appeler runKeywordsExtractor()
  // Retourner le résultat en JSON
});
```

**Tester avec curl** :
```bash
curl -X POST http://localhost:3000/keywords \
  -H "Content-Type: application/json" \
  -d @poeme.json
```

**Résultat attendu** : 5 mots-clés du poème séparés par des virgules

---

## 🎓 Points clés

- ✅ Réutilisation de la structure du Summarizer
- ✅ Changement de modèle (mistral:7b)
- ✅ Prompt spécifique pour extraction de mots-clés
- ✅ Format de sortie structuré
- ✅ Validation de la réponse HTTP

---

## 🚀 Prochaine étape

**[➡️ ÉTAPE 3 — Créer l'Orchestrateur](./STEP_3.md)**

[⬅️ Retour au README](../README.md)
