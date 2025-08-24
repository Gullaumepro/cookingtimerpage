# 💰 Configuration Google AdSense - Minuteur de Cuisine

## 🚀 Guide de Configuration Rapide

### 1. Créer un Compte Google AdSense
1. Allez sur [www.google.com/adsense](https://www.google.com/adsense)
2. Créez un compte avec votre site `minuteurdecuisine`
3. Ajoutez votre site web à AdSense
4. Attendez l'approbation (1-14 jours)

### 2. Obtenir votre ID Éditeur
Une fois approuvé, récupérez votre **ID Éditeur** :
- Format : `ca-pub-1234567890123456`
- Se trouve dans : AdSense > Comptes > Informations sur le compte

### 3. Créer les Blocs Publicitaires

#### Créez 6 blocs publicitaires dans AdSense :
1. **Bannière Header** : 728x90 (Leaderboard)
2. **Rectangle Sidebar** : 300x250 (Rectangle moyen)
3. **Responsive Pomodoro** : Responsive
4. **Banner Multiple** : 728x90 (Leaderboard)
5. **Rectangle Footer** : 336x280 (Grand rectangle)
6. **Mobile Responsive** : Auto-format

### 4. Remplacer les Codes dans index.html

#### Recherchez et remplacez dans `index.html` :

```html
<!-- Remplacez PARTOUT dans le fichier -->
ca-pub-XXXXXXXXXXXXXXXXX  →  votre-id-editeur
data-ad-slot="XXXXXXXXXX"  →  votre-slot-id
```

#### Emplacements à modifier :

1. **Ligne ~15** : Code AdSense principal dans `<head>`
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-VOTRE-ID"></script>
```

2. **Bannière Header** (~ligne 170)
3. **Sidebar Ad** (~ligne 380)
4. **Pomodoro Ad** (~ligne 450)
5. **Multiple Timers Ad** (~ligne 480)
6. **Bottom Ad** (~ligne 520)

## 📊 Optimisation des Revenus

### Emplacements Haute Performance
- ✅ **Above the fold** : Bannière header (première vue)
- ✅ **Sidebar engagement** : Pendant utilisation minuteur
- ✅ **Contextuel Pomodoro** : Publicités productivité
- ✅ **Before exit** : Footer avant départ

### Formats Recommandés
- **Desktop** : 728x90, 300x250, 336x280
- **Mobile** : Responsive auto-format
- **Tablet** : Adaptation automatique

## 🔧 Vérification & Tests

### 1. Validation Code
- Vérifiez dans **Chrome DevTools** : aucune erreur console
- Test **PageSpeed Insights** : performance maintenue
- **Mobile-Friendly Test** : responsive OK

### 2. AdSense Console
- **Annonces actives** : vérifiez les 6 blocs
- **Revenus temps réel** : monitoring performance
- **Optimisations auto** : activez les suggestions

### 3. Suivi Performance
```javascript
// Le code inclut déjà le tracking des clics
AdManager.trackAdPerformance();
```

## 💡 Conseils d'Optimisation

### Contenu SEO-Friendly
Le site inclut déjà :
- Meta descriptions optimisées
- Mots-clés pertinents : "minuteur cuisine", "timer cuisson"
- Structure HTML sémantique
- Performance optimisée

### Augmenter le Trafic
1. **Référencement naturel** : contenu de qualité sur la cuisson
2. **Réseaux sociaux** : partage fonctionnalités
3. **Blog culinaire** : intégration possible
4. **Partenariats** : sites de recettes

## ⚠️ Important

- **Respectez les règles AdSense** : pas de clics artificiels
- **Contenu original** : gardez le site utile et unique
- **Mobile-first** : 60%+ du trafic est mobile
- **Performance** : gardez le site rapide

## 🎯 Revenus Estimés

Avec un bon trafic :
- **1 000 visiteurs/jour** : 5-15€/mois
- **5 000 visiteurs/jour** : 30-100€/mois  
- **10 000 visiteurs/jour** : 80-300€/mois

*Les revenus dépendent du trafic, géolocalisation, et engagement utilisateur.*

---

✅ **Le site est 100% prêt pour AdSense** - Il suffit de remplacer les IDs !