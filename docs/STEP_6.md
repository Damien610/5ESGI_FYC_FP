# 🔗 ÉTAPE 6 — Connecter le Popup au Content Script

## 🎯 Objectif

Implémentez la logique du popup pour récupérer le texte de la page et envoyer la requête au background.

---

## 📦 Ce que vous allez créer

**Fichier** : `extension/popup.js`

**Fonction** : Gérer le clic sur le bouton et communiquer avec content.js et background.js

**Résultat attendu** : Le texte de la page est récupéré quand on clique sur "Analyser"

---

## 🛠️ Instructions

### 1. Créer popup.js

Dans `extension/popup.js`, implémentez :

**Écouteur de clic** :
- Sélectionnez le bouton avec `document.getElementById('analyze')`
- Ajoutez un écouteur `addEventListener('click', ...)`

**Récupération du texte** :
- Utilisez `chrome.tabs.query({active: true, currentWindow: true})` pour obtenir l'onglet actif
- Envoyez un message au content script avec `chrome.tabs.sendMessage()`
- Action : `"GET_TEXT"`

**Envoi au background** :
- Récupérez la valeur du textarea `query`
- Envoyez un message au background avec `chrome.runtime.sendMessage()`
- Action : `"TRIGGER_SUMMARY"`
- Données : `query`, `text`, `url`

💡 **Astuce** : Utilisez `async/await` pour gérer les promesses

### 2. Afficher un feedback

Pendant le traitement :
- Désactivez le bouton : `button.disabled = true`
- Changez le texte : `button.textContent = "Analyse en cours..."`
- Affichez un message dans `#result`

---

## ✅ Validation

### Tester le flux complet

1. Rechargez l'extension
2. Ouvrez une page web
3. Cliquez sur l'icône de l'extension
4. Entrez une requête : "Résumé en 50 mots"
5. Cliquez sur "Analyser"
6. Ouvrez la console du popup pour voir les logs

**Résultat attendu** : 
- Le texte est extrait
- Le message est envoyé au background
- Le bouton affiche "Analyse en cours..."

---

## 🎓 Points clés

- ✅ Communication popup → content script
- ✅ Communication popup → background
- ✅ Gestion asynchrone avec async/await
- ✅ Feedback utilisateur pendant le traitement
- ✅ Récupération de l'onglet actif

---

## 🚀 Prochaine étape

**[➡️ ÉTAPE 7 — Implémenter le Background Service Worker](./STEP_7.md)**

[⬅️ Retour au README](../README.md)
