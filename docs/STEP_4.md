# 🧩 ÉTAPE 4 — Configurer l'Extension Chrome

## 🎯 Objectif

Créez la structure de base de l'extension et son interface pour poser des questions.

---

## 📦 Ce que vous allez créer

**Dossier** : `extension/`

**Fichiers** : `manifest.json` et `popup.html`

**Résultat attendu** : Une extension affichant un popup avec un champ de saisie

---

## 🛠️ Instructions

### 1. Créer le manifest.json

Dans `extension/manifest.json`, configurez :

**Informations de base** :
- `manifest_version` : 3
- `name` : "OllamaSummarist"
- `version` : "1.0"
- `description` : "Résume les pages web avec Ollama"

**Action (popup)** :
- `default_popup` : "popup.html"
- `default_title` : "OllamaSummarist"

💡 **Astuce** : Référez-vous au cours sur la structure du manifest.json

### 2. Créer l'interface popup.html

Dans `extension/popup.html`, créez une interface avec :

**Structure HTML** :
- Un titre `<h1>` avec emoji 🤖
- Un `<textarea>` avec id="query" et placeholder
- Un `<button>` avec id="analyze"
- Un `<div>` avec id="result" pour afficher les résultats

---

## ✅ Validation

### Charger l'extension

1. Ouvrez Chrome : `chrome://extensions/`
2. Activez le **Mode développeur** (en haut à droite)
3. Cliquez sur **Charger l'extension non empaquetée**
4. Sélectionnez le dossier `extension/`

### Tester

1. Cliquez sur l'icône de l'extension dans la barre d'outils
2. Le popup doit s'afficher avec le formulaire

**Résultat attendu** : Interface visible avec champ de texte et bouton

---

## 🎓 Points clés

- ✅ Manifest V3 avec configuration minimale
- ✅ Action popup pour l'interface utilisateur
- ✅ HTML/CSS pour l'interface
- ✅ Chargement en mode développeur

---

## 🚀 Prochaine étape

**[➡️ ÉTAPE 5 — Extraire le texte de la page](./STEP_5.md)**

[⬅️ Retour au README](../README.md)
