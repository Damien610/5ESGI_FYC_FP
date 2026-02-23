# 🚀 Configuration Locale Ollama : Mistral & Gemma 3

> 📋 **Guide complet** pour configurer votre environnement IA local avec validation étape par étape

---

## 🔧 1. Installation du Logiciel

### 📥 Téléchargement
- **Source officielle :** [https://ollama.com/download](https://ollama.com/download)
- **Statut :** ☐ Installé

### ✅ Vérification de l'installation
```bash
ollama --version
```
**Résultat attendu :** Version d'Ollama affichée

---

## 🌐 2. Configuration des Accès (CORS)

> ⚠️ **Important :** Nécessaire pour les interfaces web et extensions

### ⚡ Méthode Rapide (Session temporaire)

| OS | Commande |
|:---|:---|
| 🪟 **Windows** | `$env:OLLAMA_ORIGINS="*"; ollama serve` |
| 🐧 **Linux/Mac** | `OLLAMA_ORIGINS="*" ollama serve` |

### 🔒 Méthode Permanente (Recommandée)

#### Windows
1. **Panneau de configuration** → Système → Paramètres système avancés
2. **Variables d'environnement** → Nouvelle variable système
3. **Nom :** `OLLAMA_ORIGINS` **Valeur :** `*`

#### Linux/Mac
```bash
echo 'export OLLAMA_ORIGINS="*"' >> ~/.bashrc
source ~/.bashrc
```

**Statut :** ☐ CORS configuré

---

## 📦 3. Téléchargement des Modèles

### 🎯 Modèles requis pour le workshop

| 🤖 Modèle | 📝 Usage | 💾 Taille | 🔧 Commande | ✅ État |
|:---|:---|:---|:---|:---|
| **Mistral 7B** | Résumés | ~4.1 Go | `ollama pull gemma3:4b` | ☐ Prêt |
| **Gemma 3 4B** | Mots-clés | ~2.6 Go | `ollama pull mistral:7b` | ☐ Prêt |

---

## 🧪 4. Tests de Validation

### 📋 Test A : Inventaire des modèles
```bash
ollama list
```
**✅ Résultat attendu :** Les deux modèles apparaissent dans la liste

### 🎯 Test B : Fonctionnalité Mistral (Résumés)
```bash
ollama run gemma3:4b "Résume en 2 phrases : L'intelligence artificielle transforme notre façon de travailler."
```
**Statut :** ☐ Test réussi

### 🔍 Test C : Fonctionnalité Gemma 3 (Mots-clés)
```bash
ollama run mistral:7b "Extrais 3 mots-clés de ce texte : Machine learning et deep learning révolutionnent l'industrie."
```
**Statut :** ☐ Test réussi

---

## ⚙️ 5. Démarrage du Service

### 🚀 Lancement d'Ollama
```bash
ollama serve
```
**Port par défaut :** `11434`  
**Statut :** ☐ Service actif

---

## ✅ 6. Checklist Finale

### 📋 Validation complète
- ☐ **Installation** : Ollama installé et version vérifiée
- ☐ **CORS** : Configuration des accès externes
- ☐ **Modèles** : Mistral 7B téléchargé
- ☐ **Modèles** : Gemma 3 4B téléchargé
- ☐ **Tests** : Mistral fonctionnel
- ☐ **Tests** : Gemma 3 fonctionnel
- ☐ **Service** : Ollama démarré sur port 11434
- ☐ **Prêt** : Configuration validée pour le workshop

---

## 🚨 Dépannage

### ❌ Modèle ne se télécharge pas
- 🌐 Vérifiez votre connexion internet
- 💾 Libérez de l'espace disque (minimum 8 Go)
- 🔄 Redémarrez le téléchargement

### ❌ Service ne démarre pas
- 🔌 Vérifiez que le port 11434 est libre
- 🔄 Redémarrez : `ollama stop` puis `ollama serve`
- 🛡️ Vérifiez les permissions administrateur

### ❌ Réponses lentes ou erreurs
- 🧠 Fermez les applications gourmandes en RAM
- ⚡ Utilisez des modèles plus légers si nécessaire
- 🔧 Redémarrez complètement Ollama

---

## 🎯 Prochaine Étape

> ✅ **Configuration terminée ?** Passez à l'[Étape 2 : Création de l'agent Résumé](etape2-agent-resume.md)