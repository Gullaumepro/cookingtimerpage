class AdvancedTimer {
    constructor() {
        this.totalTime = 300; // 5 minutes par défaut
        this.remainingTime = this.totalTime;
        this.isRunning = false;
        this.isPaused = false;
        this.isOvertime = false;
        this.timerInterval = null;
        this.alarmInterval = null;
        this.overtimeSeconds = 0;
        
        // Éléments DOM
        this.timerDisplay = document.getElementById('timerDisplay');
        this.progressCircle = document.getElementById('progressCircle');
        this.progressBar = document.getElementById('progressBar');
        this.progressPercentage = document.getElementById('progressPercentage');
        this.timeRemaining = document.getElementById('timeRemaining');
        this.timerLabel = document.getElementById('timerLabel');
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.setTimerBtn = document.getElementById('setTimer');
        this.minutesInput = document.getElementById('minutes');
        this.secondsInput = document.getElementById('seconds');
        this.cookingTypeSelect = document.getElementById('cookingType');
        this.statusText = document.getElementById('statusText');
        this.timerSound = document.getElementById('timerSound');
        
        // Éléments DOM pour les conseils
        this.cookingAdviceDiv = document.getElementById('cookingAdvice');
        this.intermediateSteps = document.getElementById('intermediateSteps');
        this.stepsList = document.getElementById('stepsList');
        
        // Éléments DOM pour les modes et paramètres
        this.modeButtons = {
            classic: document.getElementById('modeClassic'),
            dual: document.getElementById('modeDual'),
            pomodoro: document.getElementById('modePomodoro')
        };
        this.settingsBtn = document.getElementById('settingsBtn');
        this.settingsPanel = document.getElementById('settingsPanel');
        
        // Éléments DOM des paramètres
        this.alarmDurationSelect = document.getElementById('alarmDuration');
        this.volumeSlider = document.getElementById('volumeSlider');
        this.volumeValue = document.getElementById('volumeValue');
        this.testSoundBtn = document.getElementById('testSoundBtn');
        this.stopAlarmBtn = document.getElementById('stopAlarmBtn');
        this.resetSettingsBtn = document.getElementById('resetSettingsBtn');
        
        // Éléments DOM Pomodoro
        this.pomodoroElements = {
            count: document.getElementById('pomodoroCount'),
            cycle: document.getElementById('currentCycle'),
            total: document.getElementById('totalTime'),
            display: document.getElementById('pomodoroTimerDisplay'),
            label: document.getElementById('pomodoroLabel'),
            circle: document.getElementById('pomodoroProgressCircle'),
            bar: document.getElementById('pomodoroProgressBar'),
            startBtn: document.getElementById('pomodoroStartBtn'),
            pauseBtn: document.getElementById('pomodoroPauseBtn'),
            skipBtn: document.getElementById('pomodoroSkipBtn'),
            resetBtn: document.getElementById('pomodoroResetBtn')
        };
        

        
        // Overtime
        this.overtimeDisplay = document.getElementById('overtimeDisplay');
        this.overtimeCounter = document.getElementById('overtimeCounter');
        
        // État des étapes intermédiaires
        this.completedSteps = new Set();
        this.currentCookingType = 'custom';
        
        // Modes et paramètres
        this.currentMode = 'classic'; // classic, dual, pomodoro
        this.settings = this.loadSettings();
        
        // Pomodoro
        this.pomodoroSession = 1;
        this.pomodoroIsWork = true;
        this.pomodoroCount = 0;
        this.pomodoroTotalTime = 0;
        

        
        // Minuteurs duaux
        this.dualTimers = {
            timer1: {
                totalTime: 300,
                remainingTime: 300,
                isRunning: false,
                isPaused: false,
                isOvertime: false,
                overtimeSeconds: 0,
                timerInterval: null,
                currentCookingType: 'custom',
                completedSteps: new Set()
            },
            timer2: {
                totalTime: 480,
                remainingTime: 480,
                isRunning: false,
                isPaused: false,
                isOvertime: false,
                overtimeSeconds: 0,
                timerInterval: null,
                currentCookingType: 'custom',
                completedSteps: new Set()
            }
        };
        
        // Temps prédéfinis avec conseils détaillés
        this.presetTimes = {
            'custom': null,
            
            // Œufs
            'egg-soft': 180,
            'egg-medium': 360,
            'egg-hard': 600,
            'egg-scrambled': 270,
            'egg-poached': 210,
            'egg-fried': 150,
            'omelette-plain': 210,
            'omelette-filled': 330,
            
            // Pâtes
            'pasta-fresh': 150,
            'pasta-regular': 540,
            'pasta-whole': 780,
            'pasta-spaghetti': 660,
            'pasta-penne': 720,
            'pasta-fusilli': 660,
            'pasta-farfalle': 660,
            'pasta-tagliatelle': 540,
            'pasta-linguine': 600,
            'pasta-ravioli': 330,
            'pasta-lasagna': 540,
            'pasta-gnocchi': 150,
            
            // Riz et céréales
            'rice-white': 900,
            'rice-brown': 1500,
            'rice-basmati': 720,
            'rice-jasmine': 900,
            'rice-arborio': 1080,
            'rice-wild': 2700,
            'rice-sticky': 1200,
            'quinoa': 900,
            'bulgur': 720,
            'couscous': 300,
            'barley': 1800,
            'polenta': 900,
            
            // Légumes vapeur
            'broccoli-steam': 330,
            'cauliflower-steam': 420,
            'carrots-steam': 540,
            'green-beans-steam': 420,
            'asparagus-steam': 300,
            'spinach-steam': 150,
            'zucchini-steam': 270,
            'brussels-steam': 540,
            
            // Légumes bouillis
            'vegetables-steam': 390,
            'vegetables-boiled': 750,
            'potatoes': 1350,
            'sweet-potatoes': 1050,
            'carrots-boiled': 660,
            'turnips': 1020,
            'beetroot': 2100,
            'artichoke': 1650,
            'leeks': 810,
            'corn': 540,
            
            // Viandes rouges
            'steak-rare': 180,
            'steak-medium': 300,
            'steak-well': 360,
            'beef-roast': 1200, // 20 min pour 500g
            'beef-stew': 7200, // 2h
            'lamb-chops': 210,
            'lamb-leg': 900, // 15 min pour 500g
            'pork-chops': 420,
            'pork-tenderloin': 1050,
            'veal-escalope': 210,
            
            // Volailles
            'chicken-breast': 480,
            'chicken-thigh': 1650,
            'chicken-whole': 1200, // 20 min pour 500g
            'chicken-wings': 1350,
            'duck-breast': 540,
            'turkey-breast': 360,
            'quail': 1050,
            
            // Poissons
            'fish-fillet': 240,
            'salmon-fillet': 270,
            'tuna-steak': 150,
            'cod-fillet': 330,
            'sea-bass': 810,
            'trout': 540,
            'shrimp': 150,
            'scallops': 90,
            'mussels': 390,
            'lobster': 480,
            
            // Desserts
            'chocolate-fondant': 720,
            'creme-brulee': 2400,
            'cake-vanilla': 1500,
            'chocolate-cake': 1800,
            'muffins': 1140,
            'cookies': 660,
            'madeleines': 540,
            'tarte-tatin': 1650,
            'soufflé': 1020,
            'crème-caramel': 2700,
            'bread-pudding': 1350,
            
            // Pains
            'bread-baking': 1980,
            'baguette': 1350,
            'croissants': 1020,
            'brioche': 1650,
            'focaccia': 1350,
            'pizza-dough': 660,
            
            // Plats mijotés
            'pot-au-feu': 9000, // 2h30
            'chicken-stew': 5400, // 1h30
            'ratatouille': 2700,
            'cassoulet': 7200, // 2h
            'bouillabaisse': 1800,
            'chili': 3600, // 1h
            'curry': 2100,
            
            // Boissons
            'tea-green': 150,
            'tea-black': 270,
            'tea-herbal': 390,
            'coffee-french': 240,
            'espresso': 30,
            'hot-chocolate': 300
        };
        
        // Base de données complète des conseils de cuisson
        this.cookingAdvice = {
            'custom': {
                tips: [
                    "Réglez le temps souhaité et surveillez la cuisson selon votre recette",
                    "N'hésitez pas à ajuster le temps selon vos préférences"
                ],
                steps: []
            },
            'egg-soft': {
                tips: [
                    "Sortez les œufs du réfrigérateur 30 minutes avant cuisson",
                    "Plongez délicatement dans l'eau bouillante salée",
                    "Le jaune doit rester coulant, le blanc juste pris",
                    "Plongez immédiatement dans l'eau froide pour arrêter la cuisson"
                ],
                steps: [
                    { time: 120, message: "🥚 Mi-cuisson : le blanc commence à prendre", type: "info", sound: "soft" },
                    { time: 60, message: "🧊 Préparez un bol d'eau froide pour l'arrêt de cuisson", type: "preparation", sound: "soft" },
                    { time: 30, message: "⏰ Bientôt fini ! L'eau froide est-elle prête ?", type: "preparation", sound: "soft" }
                ]
            },
            'egg-medium': {
                tips: [
                    "Œuf mollet parfait : blanc ferme, jaune crémeux au centre",
                    "Percez délicatement la coquille côté large avec une aiguille",
                    "Eau bouillante avec une cuillère de vinaigre blanc",
                    "Écalez sous l'eau tiède pour préserver la forme"
                ],
                steps: [
                    { time: 240, message: "🥚 Cuisson avance bien, blanc se raffermit", type: "info", sound: "soft" },
                    { time: 120, message: "🧊 Préparez le bain d'eau glacée maintenant", type: "preparation", sound: "soft" },
                    { time: 60, message: "⏰ Plus qu'1 minute ! Eau glacée prête ?", type: "preparation", sound: "soft" }
                ]
            },
            'egg-hard': {
                tips: [
                    "Pour éviter la coque verte : ne pas prolonger la cuisson",
                    "Démarrage eau froide ou plongée dans l'eau bouillante",
                    "Refroidissement rapide obligatoire dans l'eau glacée",
                    "Parfait pour les œufs farcis, en salade ou à croquer"
                ],
                steps: [
                    { time: 420, message: "🥚 1/3 cuisson : les œufs chauffent bien", type: "info", sound: "soft" },
                    { time: 300, message: "🥚 Mi-cuisson : les œufs sont à moitié cuits", type: "info", sound: "soft" },
                    { time: 120, message: "⏰ Fin de cuisson approche, préparez l'eau glacée", type: "preparation", sound: "soft" },
                    { time: 30, message: "🧊 Préparez l'eau glacée pour le refroidissement immédiat", type: "preparation", sound: "soft" }
                ]
            },
            'pasta-fresh': {
                tips: [
                    "Pâtes fraîches : cuisson rapide dans beaucoup d'eau salée",
                    "1L d'eau + 10g de sel pour 100g de pâtes",
                    "Elles remontent à la surface quand elles sont cuites",
                    "Goûtez 30 secondes avant la fin pour vérifier la texture"
                ],
                steps: [
                    { time: 90, message: "🍝 Remuez délicatement les pâtes", type: "action", sound: "soft" },
                    { time: 60, message: "👀 Les pâtes commencent à remonter à la surface", type: "info", sound: "soft" },
                    { time: 30, message: "🍴 Testez la cuisson, préparez l'égouttage", type: "check", sound: "soft" }
                ]
            },
            'pasta-regular': {
                tips: [
                    "Eau abondante : 1L pour 100g de pâtes + 10g de sel",
                    "Ne pas ajouter d'huile dans l'eau de cuisson",
                    "Remuez régulièrement les 2 premières minutes",
                    "Al dente : encore fermes sous la dent"
                ],
                steps: [
                    { time: 480, message: "🍝 Remuez bien les pâtes pour éviter qu'elles collent", type: "action", sound: "soft" },
                    { time: 360, message: "🍝 Mi-cuisson : remuez délicatement", type: "action", sound: "soft" },
                    { time: 120, message: "🍴 Goûtez pour vérifier la texture al dente", type: "check", sound: "soft" },
                    { time: 60, message: "🥄 Préparez la sauce et l'égouttage", type: "preparation", sound: "soft" },
                    { time: 30, message: "🍽️ Préparez l'égouttage et la sauce", type: "preparation", sound: "soft" }
                ]
            },
            'pasta-whole': {
                tips: [
                    "Pâtes complètes : plus longues à cuire, plus nutritives",
                    "Cuisson plus lente pour préserver les fibres",
                    "Texture plus ferme que les pâtes blanches",
                    "Accompagnent parfaitement les sauces robustes"
                ],
                steps: [
                    { time: 480, message: "1/3 de la cuisson : remuez bien" },
                    { time: 240, message: "Mi-cuisson : vérifiez le niveau d'eau" },
                    { time: 60, message: "Testez la cuisson al dente" }
                ]
            },
            'rice-white': {
                tips: [
                    "Méthode absorption : 1 volume riz pour 1,5 volume d'eau",
                    "Rinçage préalable jusqu'à eau claire pour enlever l'amidon",
                    "Cuisson couverte, feu doux après ébullition",
                    "Repos 5 minutes avant de servir, couvercle fermé"
                ],
                steps: [
                    { time: 720, message: "🍚 Baissez le feu après ébullition, couvrez", type: "action", sound: "soft" },
                    { time: 600, message: "⚠️ Mi-cuisson : ne pas soulever le couvercle !", type: "info", sound: "soft" },
                    { time: 300, message: "💧 L'eau est presque absorbée", type: "info", sound: "soft" },
                    { time: 60, message: "🔥 Fin de cuisson, éteignez et laissez reposer couvercle fermé", type: "action", sound: "alert" }
                ]
            },
            'rice-brown': {
                tips: [
                    "Riz complet : plus de temps, plus de liquide (1:2)",
                    "Trempage 30 min avant cuisson pour raccourcir le temps",
                    "Riche en fibres et nutriments, texture plus ferme",
                    "Ajoutez un bouillon parfumé pour plus de goût"
                ],
                steps: [
                    { time: 1200, message: "🍚 Vérifiez que le riz mijote doucement", type: "check", sound: "soft" },
                    { time: 900, message: "💧 1/3 cuisson : le riz absorbe l'eau", type: "info", sound: "soft" },
                    { time: 600, message: "👀 Mi-cuisson : vérifiez le niveau d'eau discrètement", type: "check", sound: "soft" },
                    { time: 300, message: "🔥 Fin de cuisson : réduisez le feu au minimum", type: "action", sound: "alert" },
                    { time: 60, message: "⏰ Préparez-vous pour le repos hors feu (5 min)", type: "preparation", sound: "soft" }
                ]
            },
            'rice-basmati': {
                tips: [
                    "Riz parfumé indien : rinçage essentiel (5-6 fois)",
                    "Trempage 30 minutes pour des grains plus longs",
                    "Cuisson pilaf ou absorption, ajoutez des épices",
                    "Grains non collants, texture légère et aérée"
                ],
                steps: [
                    { time: 600, message: "🌶️ Vérifiez que les épices parfument bien", type: "check", sound: "soft" },
                    { time: 480, message: "👃 Mi-cuisson : les arômes se développent", type: "info", sound: "soft" },
                    { time: 240, message: "💧 Vérifiez l'absorption de l'eau", type: "check", sound: "soft" },
                    { time: 180, message: "⚠️ L'eau est presque entièrement absorbée", type: "info", sound: "soft" },
                    { time: 60, message: "🔥 Fin de cuisson, éteignez le feu maintenant", type: "action", sound: "alert" }
                ]
            },
            'vegetables-steam': {
                tips: [
                    "Cuisson vapeur : préserve vitamines et couleurs",
                    "Légumes de taille similaire pour cuisson uniforme",
                    "Ne pas surcharger le panier vapeur",
                    "Légumes croquants : arrêtez dès qu'ils cèdent sous la fourchette"
                ],
                steps: [
                    { time: 300, message: "🥕 Vérifiez le niveau d'eau dans la casserole", type: "check", sound: "soft" },
                    { time: 240, message: "🍴 Mi-cuisson : vérifiez la fermeté avec une fourchette", type: "check", sound: "soft" },
                    { time: 120, message: "⚡ Testez la cuisson : les légumes doivent céder légèrement", type: "check", sound: "soft" },
                    { time: 60, message: "🍽️ Préparez l'assiette de service", type: "preparation", sound: "soft" }
                ]
            },
            'vegetables-boiled': {
                tips: [
                    "Eau bouillante salée avant d'ajouter les légumes",
                    "Légumes verts : cuisson rapide pour garder la couleur",
                    "Refroidissement à l'eau froide pour stopper la cuisson",
                    "Égouttage soigneux pour éviter la détrempe"
                ],
                steps: [
                    { time: 600, message: "🥬 Vérifiez que l'eau bout toujours bien", type: "check", sound: "soft" },
                    { time: 450, message: "🥕 Mi-cuisson : les légumes commencent à s'attendrir", type: "info", sound: "soft" },
                    { time: 300, message: "🧊 Préparez un bain d'eau froide pour l'arrêt de cuisson", type: "preparation", sound: "soft" },
                    { time: 180, message: "🔪 Vérifiez la cuisson avec un couteau", type: "check", sound: "soft" },
                    { time: 60, message: "🍽️ Préparez l'égouttage et l'eau froide", type: "preparation", sound: "soft" }
                ]
            },
            'potatoes': {
                tips: [
                    "Pommes de terre de calibre similaire pour cuisson homogène",
                    "Départ eau froide salée pour cuisson uniforme",
                    "Ajoutez un brin de thym ou une feuille de laurier",
                    "Cuites quand la lame d'un couteau s'enfonce facilement"
                ],
                steps: [
                    { time: 1020, message: "🥔 Vérifiez que l'eau chauffe bien", type: "check", sound: "soft" },
                    { time: 900, message: "♨️ 1/3 cuisson : l'eau commence à bien chauffer", type: "info", sound: "soft" },
                    { time: 600, message: "🔪 Mi-cuisson : testez avec la pointe d'un couteau", type: "check", sound: "soft" },
                    { time: 300, message: "✅ Presque cuites : la lame s'enfonce facilement", type: "check", sound: "soft" },
                    { time: 120, message: "🍽️ Préparez l'égouttage et le beurre", type: "preparation", sound: "soft" },
                    { time: 60, message: "⏰ Fin de cuisson, préparez l'égouttage", type: "preparation", sound: "soft" }
                ]
            },
            'steak-rare': {
                tips: [
                    "Steak saignant : cœur rouge et tiède (50-52°C)",
                    "Sortez la viande 30 min avant cuisson (température ambiante)",
                    "Poêle très chaude, saisissez 2-3 min de chaque côté",
                    "Repos 5 minutes sous papier alu pour redistribuer les jus"
                ],
                steps: [
                    { time: 120, message: "🔥 Préparez-vous : il va falloir retourner le steak dans 30 secondes", type: "preparation", sound: "soft" },
                    { time: 90, message: "⚡ RETOURNEZ le steak maintenant !", type: "action", sound: "alert" },
                    { time: 30, message: "🍽️ Préparez l'assiette et le papier alu pour le repos", type: "preparation", sound: "soft" }
                ]
            },
            'steak-medium': {
                tips: [
                    "Steak à point : cœur rosé et chaud (54-57°C)",
                    "Viande à température ambiante avant cuisson",
                    "Cuisson vive puis baissez le feu en fin",
                    "Test de cuisson : pressez avec le doigt (ferme mais souple)"
                ],
                steps: [
                    { time: 180, message: "🔥 Dans 30 secondes, il faudra retourner le steak", type: "preparation", sound: "soft" },
                    { time: 150, message: "⚡ RETOURNEZ le steak maintenant !", type: "action", sound: "alert" },
                    { time: 60, message: "🧪 Testez la cuisson en pressant avec le doigt", type: "check", sound: "soft" },
                    { time: 30, message: "🍽️ Préparez l'assiette pour le repos", type: "preparation", sound: "soft" }
                ]
            },
            'chicken-breast': {
                tips: [
                    "Escalope de poulet : cuisson complète obligatoire (75°C)",
                    "Aplatissez légèrement pour une cuisson uniforme",
                    "Pas de rosé : le jus doit être clair à la découpe",
                    "Marinade préalable pour plus de moelleux et saveur"
                ],
                steps: [
                    { time: 270, message: "🔥 Préparez-vous : retournement dans 30 secondes", type: "preparation", sound: "soft" },
                    { time: 240, message: "⚡ RETOURNEZ l'escalope maintenant !", type: "action", sound: "alert" },
                    { time: 90, message: "🧪 Testez la cuisson : le jus doit être clair", type: "check", sound: "soft" },
                    { time: 60, message: "🍽️ Vérifiez que le jus qui s'écoule est clair", type: "check", sound: "soft" },
                    { time: 30, message: "🍽️ Préparez l'assiette, la cuisson touche à sa fin", type: "preparation", sound: "soft" }
                ]
            },
            'steak-well': {
                tips: [
                    "Steak bien cuit : cœur gris-brun et chaud (60-65°C)",
                    "Cuisson plus longue mais attention à ne pas dessécher",
                    "Baissez le feu après saisie pour cuisson en douceur",
                    "Ajoutez un peu de beurre en fin de cuisson pour le moelleux"
                ],
                steps: [
                    { time: 210, message: "🔥 Dans 30 secondes, retournez le steak", type: "preparation", sound: "soft" },
                    { time: 180, message: "⚡ RETOURNEZ le steak maintenant !", type: "action", sound: "alert" },
                    { time: 90, message: "🧈 Baissez le feu et ajoutez un peu de beurre", type: "action", sound: "soft" },
                    { time: 30, message: "🍽️ Préparez l'assiette pour le repos", type: "preparation", sound: "soft" }
                ]
            },
            'fish-fillet': {
                tips: [
                    "Poisson : cuisson délicate, chair qui se défait facilement",
                    "Peau côté poêle en premier si présente",
                    "La chair devient opaque et se détache en flocons",
                    "Ne pas trop manipuler pour préserver la texture"
                ],
                steps: [
                    { time: 150, message: "🔥 Préparez-vous à retourner délicatement le filet", type: "preparation", sound: "soft" },
                    { time: 120, message: "⚡ RETOURNEZ délicatement le filet maintenant !", type: "action", sound: "alert" },
                    { time: 60, message: "🧪 Vérifiez que la chair devient opaque", type: "check", sound: "soft" },
                    { time: 30, message: "🍽️ Préparez l'assiette, ne pas trop manipuler", type: "preparation", sound: "soft" }
                ]
            },
            'chocolate-fondant': {
                tips: [
                    "Fondant au chocolat : cœur coulant recherché",
                    "Moules bien beurrés et farinés obligatoire",
                    "Four préchauffé à 200°C, cuisson rapide et intense",
                    "Test : bords fermes, centre légèrement tremblant"
                ],
                steps: [
                    { time: 360, message: "Mi-cuisson : les bords commencent à se former" },
                    { time: 120, message: "Surveillez : le centre doit rester tremblant" }
                ]
            },
            'creme-brulee': {
                tips: [
                    "Crème brûlée : cuisson au bain-marie indispensable",
                    "Eau chaude jusqu'à mi-hauteur des ramequins",
                    "Crème juste prise, encore tremblante au centre",
                    "Refroidissement complet avant de brûler le sucre"
                ],
                steps: [
                    { time: 1800, message: "Mi-cuisson : vérifiez le niveau d'eau du bain-marie" },
                    { time: 600, message: "Fin de cuisson approche : testez la prise" },
                    { time: 300, message: "Les crèmes doivent être juste prises" }
                ]
            },
            'cake-vanilla': {
                tips: [
                    "Gâteau à la vanille : tous ingrédients à température ambiante",
                    "Ne pas ouvrir le four les 15 premières minutes",
                    "Test de cuisson : lame de couteau qui ressort propre",
                    "Refroidissement graduel pour éviter l'affaissement"
                ],
                steps: [
                    { time: 900, message: "Ne pas ouvrir le four ! Cuisson en cours..." },
                    { time: 300, message: "Fin de cuisson : testez avec un cure-dent" },
                    { time: 60, message: "Préparez-vous à sortir le gâteau du four" }
                ]
            }
        };
        
        this.initializeEventListeners();
        this.initializeSettings();
        this.updateDisplay();
        this.updateCookingAdvice('custom');
        this.requestNotificationPermission();
        this.setupAntiOups();
        this.switchMode('classic');
        
        // Mode développement : ajout de boutons de test pour les alertes
        this.addTestButtons();
    }
    
    initializeEventListeners() {
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.setTimerBtn.addEventListener('click', () => this.setCustomTime());
        
        this.cookingTypeSelect.addEventListener('change', (e) => {
            this.currentCookingType = e.target.value;
            const selectedTime = this.presetTimes[e.target.value];
            if (selectedTime !== null) {
                this.setTime(selectedTime);
                this.updateInputs();
            }
            this.updateCookingAdvice(e.target.value);
            this.resetIntermediateSteps();
        });
        
        // Boutons de minuteur rapide
        document.querySelectorAll('.quick-timer').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const time = parseInt(e.currentTarget.dataset.time);
                this.setTime(time);
                this.updateInputs();
                this.cookingTypeSelect.value = 'custom';
            });
        });
        
        // Préréglages rapides
        document.querySelectorAll('.quick-preset').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const time = parseInt(e.currentTarget.dataset.time);
                this.setTime(time);
                this.updateInputs();
                this.cookingTypeSelect.value = 'custom';
            });
        });
        
        // Mode buttons
        Object.keys(this.modeButtons).forEach(mode => {
            this.modeButtons[mode].addEventListener('click', () => this.switchMode(mode));
        });
        
        // Gestionnaires pour le mode dual
        this.initializeDualModeListeners();
        
        // Settings
        this.settingsBtn.addEventListener('click', () => this.toggleSettings());
        this.alarmDurationSelect.addEventListener('change', () => this.saveSettings());
        this.volumeSlider.addEventListener('input', () => this.updateVolume());
        this.testSoundBtn.addEventListener('click', () => this.testSound());
        this.stopAlarmBtn.addEventListener('click', () => this.stopAlarm());
        this.resetSettingsBtn.addEventListener('click', () => this.resetSettings());
        
        // Pomodoro controls
        if (this.pomodoroElements.startBtn) {
            this.pomodoroElements.startBtn.addEventListener('click', () => this.startPomodoro());
            this.pomodoroElements.pauseBtn.addEventListener('click', () => this.pausePomodoro());
            this.pomodoroElements.skipBtn.addEventListener('click', () => this.skipPomodoro());
            this.pomodoroElements.resetBtn.addEventListener('click', () => this.resetPomodoro());
        }
        

        
        // Validation des inputs
        this.minutesInput.addEventListener('input', () => this.validateInput());
        this.secondsInput.addEventListener('input', () => this.validateInput());
        
        // Raccourcis clavier
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                if (this.isRunning) {
                    this.pause();
                } else {
                    this.start();
                }
            } else if (e.code === 'Escape') {
                this.reset();
            }
        });
        
        // Prévenir la fermeture accidentelle pendant un minuteur actif
        window.addEventListener('beforeunload', (e) => {
            if (this.isRunning) {
                e.preventDefault();
                e.returnValue = 'Un minuteur est en cours. Êtes-vous sûr de vouloir quitter ?';
                return e.returnValue;
            }
        });
    }
    
    validateInput() {
        const minutes = Math.max(0, Math.min(59, parseInt(this.minutesInput.value) || 0));
        const seconds = Math.max(0, Math.min(59, parseInt(this.secondsInput.value) || 0));
        
        this.minutesInput.value = minutes;
        this.secondsInput.value = seconds;
    }
    
    setCustomTime() {
        const minutes = parseInt(this.minutesInput.value) || 0;
        const seconds = parseInt(this.secondsInput.value) || 0;
        const totalSeconds = minutes * 60 + seconds;
        
        if (totalSeconds > 0) {
            this.setTime(totalSeconds);
            this.cookingTypeSelect.value = 'custom';
            this.showStatus('Temps personnalisé défini', 'success');
        } else {
            this.showStatus('Veuillez entrer un temps valide', 'error');
        }
    }
    
    setTime(seconds) {
        if (!this.isRunning) {
            this.totalTime = seconds;
            this.remainingTime = seconds;
            this.updateDisplay();
            this.updateProgress();
        }
    }
    
    updateInputs() {
        const minutes = Math.floor(this.totalTime / 60);
        const seconds = this.totalTime % 60;
        this.minutesInput.value = minutes;
        this.secondsInput.value = seconds;
    }
    
    start() {
        if (this.remainingTime <= 0) {
            this.showStatus('Veuillez définir un temps', 'error');
            return;
        }
        
        this.isRunning = true;
        this.isPaused = false;
        this.startBtn.disabled = true;
        this.pauseBtn.disabled = false;
        
        this.timerInterval = setInterval(() => {
            this.remainingTime--;
            this.updateDisplay();
            this.updateProgress();
            this.updateAlertTimer(); // Mise à jour du timer dans la bannière d'alerte
            this.checkIntermediateSteps(); // Nouvelle vérification des étapes
            
            if (this.remainingTime <= 0) {
                this.handleOvertime();
                return;
            } else if (this.remainingTime <= 10) {
                this.showWarning();
            }
        }, 1000);
        
        this.showStatus('Minuteur en cours...', 'running');
        this.timerDisplay.classList.add('timer-glow');
    }
    
    pause() {
        if (this.isRunning) {
            this.isRunning = false;
            this.isPaused = true;
            clearInterval(this.timerInterval);
            
            this.startBtn.disabled = false;
            this.pauseBtn.disabled = true;
            
            this.showStatus('Minuteur en pause', 'paused');
            this.timerDisplay.classList.remove('timer-glow');
        }
    }
    
    reset() {
        this.isRunning = false;
        this.isPaused = false;
        clearInterval(this.timerInterval);
        
        this.remainingTime = this.totalTime;
        this.updateDisplay();
        this.updateProgress();
        
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
        
        this.showStatus('Prêt à démarrer', 'ready');
        this.timerDisplay.classList.remove('timer-glow', 'timer-finished');
        document.body.classList.remove('timer-finished');
        this.resetIntermediateSteps(); // Réinitialisation des étapes
        this.resetOvertime(); // Reset overtime
    }
    
    finish() {
        this.isRunning = false;
        clearInterval(this.timerInterval);
        
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
        
        this.showStatus('Cuisson terminée !', 'finished');
        this.timerDisplay.classList.remove('timer-glow');
        this.timerDisplay.classList.add('timer-finished');
        document.body.classList.add('timer-finished');
        
        this.playNotificationWithSettings();
        this.showBrowserNotification();
        this.vibrate();
    }
    
    updateDisplay() {
        const minutes = Math.floor(this.remainingTime / 60);
        const seconds = this.remainingTime % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Mise à jour de l'affichage principal
        this.timerDisplay.textContent = timeString;
        
        // Mise à jour du temps restant dans la barre de progression
        if (this.timeRemaining) {
            this.timeRemaining.textContent = `${timeString} restant`;
        }
        
        // Mise à jour du label selon l'état
        if (this.timerLabel) {
            if (this.isRunning) {
                this.timerLabel.textContent = 'En cours...';
            } else if (this.isPaused) {
                this.timerLabel.textContent = 'En pause';
            } else if (this.remainingTime <= 0) {
                this.timerLabel.textContent = 'Terminé !';
            } else {
                this.timerLabel.textContent = 'Temps restant';
            }
        }
    }
    
    updateProgress() {
        const progress = Math.max(0, Math.min(1, 1 - (this.remainingTime / this.totalTime)));
        const percentage = Math.round(progress * 100);
        
        // Mise à jour du cercle de progression (nouveau rayon pour la grande horloge)
        const circumference = 2 * Math.PI * 180; // rayon = 180 pour la nouvelle horloge
        const offset = circumference - (progress * circumference);
        if (this.progressCircle) {
            this.progressCircle.style.strokeDasharray = circumference;
            this.progressCircle.style.strokeDashoffset = offset;
        }
        
        // Mise à jour de la barre de progression horizontale
        if (this.progressBar) {
            this.progressBar.style.width = `${percentage}%`;
            
            // Animation supplémentaire selon l'état
            if (this.isRunning) {
                this.progressBar.style.animation = 'shimmer 2s infinite';
            } else {
                this.progressBar.style.animation = 'none';
            }
        }
        
        // Mise à jour du pourcentage
        if (this.progressPercentage) {
            this.progressPercentage.textContent = `${percentage}%`;
        }
        
        // Effet visuel pour les dernières secondes
        if (this.remainingTime <= 10 && this.remainingTime > 0 && this.isRunning) {
            this.addUrgencyEffects();
        } else {
            this.removeUrgencyEffects();
        }
    }
    
    addUrgencyEffects() {
        if (this.progressBar) {
            this.progressBar.style.background = 'linear-gradient(90deg, #ef4444, #dc2626, #b91c1c)';
            this.progressBar.style.boxShadow = '0 0 30px rgba(239, 68, 68, 0.8), inset 0 1px 0 rgba(255,255,255,0.3)';
        }
        
        // Effet de pulsation sur l'horloge
        const clock = document.querySelector('.modern-clock');
        if (clock) {
            clock.style.animation = 'pulse 0.5s ease-in-out infinite alternate';
        }
    }
    
    removeUrgencyEffects() {
        if (this.progressBar) {
            this.progressBar.style.background = 'linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)';
            this.progressBar.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.6), inset 0 1px 0 rgba(255,255,255,0.3)';
        }
        
        const clock = document.querySelector('.modern-clock');
        if (clock) {
            clock.style.animation = '';
        }
    }
    
    showStatus(message, type) {
        this.statusText.textContent = message;
        
        const statusDisplay = document.getElementById('statusDisplay');
        statusDisplay.className = 'text-center';
        
        switch (type) {
            case 'error':
                statusDisplay.classList.add('text-red-300');
                break;
            case 'success':
                statusDisplay.classList.add('text-green-300');
                break;
            case 'running':
                statusDisplay.classList.add('text-blue-300');
                break;
            case 'paused':
                statusDisplay.classList.add('text-yellow-300');
                break;
            case 'finished':
                statusDisplay.classList.add('text-green-400', 'font-bold');
                break;
            default:
                statusDisplay.classList.add('text-white/80');
        }
    }
    
    showWarning() {
        if (this.remainingTime <= 10 && this.remainingTime > 0) {
            this.timerDisplay.style.animation = 'flash-alert 0.5s ease-in-out';
            setTimeout(() => {
                this.timerDisplay.style.animation = '';
            }, 500);
        }
    }
    
    playNotification() {
        // Son de notification
        try {
            this.timerSound.currentTime = 0;
            this.timerSound.play().catch(() => {
                // Fallback si l'audio ne peut pas être joué
                console.log('Notification audio non disponible');
            });
        } catch (e) {
            console.log('Erreur audio:', e);
        }
        
        // Son système si disponible
        if ('AudioContext' in window || 'webkitAudioContext' in window) {
            this.playBeep();
        }
    }
    
    playBeep() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 1);
            
            // Répéter 3 fois
            setTimeout(() => this.playBeep(), 500);
            setTimeout(() => this.playBeep(), 1000);
        } catch (e) {
            console.log('Beep non disponible');
        }
    }
    
    async requestNotificationPermission() {
        if ('Notification' in window && Notification.permission === 'default') {
            await Notification.requestPermission();
        }
    }
    
    showBrowserNotification() {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Minuteur de Cuisine', {
                body: 'Votre cuisson est terminée !',
                icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%234F46E5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',
                tag: 'cooking-timer',
                requireInteraction: true
            });
        }
    }
    
    vibrate() {
        if ('vibrate' in navigator) {
            navigator.vibrate([200, 100, 200, 100, 200]);
        }
    }
    
    // Nouvelles méthodes pour les conseils de cuisson
    updateCookingAdvice(cookingType) {
        const advice = this.cookingAdvice[cookingType];
        if (!advice || !this.cookingAdviceDiv) return;
        
        // Mise à jour des conseils principaux
        this.cookingAdviceDiv.innerHTML = '';
        advice.tips.forEach(tip => {
            const tipElement = document.createElement('div');
            tipElement.className = 'flex items-start space-x-3 mb-2';
            tipElement.innerHTML = `
                <i class="fas fa-check-circle text-green-400 mt-1 flex-shrink-0"></i>
                <p class="text-white/80 text-sm leading-relaxed">${tip}</p>
            `;
            this.cookingAdviceDiv.appendChild(tipElement);
        });
        
        // Mise à jour des étapes intermédiaires
        this.setupIntermediateSteps(advice.steps);
    }
    
    setupIntermediateSteps(steps) {
        if (!steps.length || !this.intermediateSteps || !this.stepsList) {
            this.intermediateSteps.classList.add('hidden');
            return;
        }
        
        this.intermediateSteps.classList.remove('hidden');
        this.stepsList.innerHTML = '';
        
        steps.forEach((step, index) => {
            const stepElement = document.createElement('div');
            stepElement.className = 'flex items-center space-x-3 p-2 rounded-lg bg-white/5 border border-white/10';
            stepElement.innerHTML = `
                <div class="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-400 flex items-center justify-center flex-shrink-0">
                    <span class="text-blue-400 text-xs font-bold">${index + 1}</span>
                </div>
                <div class="flex-1">
                    <p class="text-white/90 text-sm">${step.message}</p>
                    <p class="text-white/60 text-xs">à ${this.formatTime(step.time)} restant</p>
                </div>
                <i id="step-${step.time}" class="fas fa-clock text-white/40"></i>
            `;
            this.stepsList.appendChild(stepElement);
        });
    }
    
    resetIntermediateSteps() {
        this.completedSteps.clear();
        // Réinitialiser l'affichage des étapes
        document.querySelectorAll('[id^="step-"]').forEach(icon => {
            icon.className = 'fas fa-clock text-white/40';
        });
    }
    
    checkIntermediateSteps() {
        const advice = this.cookingAdvice[this.currentCookingType];
        if (!advice || !advice.steps.length) return;
        
        advice.steps.forEach(step => {
            if (this.remainingTime === step.time && !this.completedSteps.has(step.time)) {
                this.completedSteps.add(step.time);
                this.showIntermediateNotification(step.message, step.type || 'info', step.sound || 'soft');
                
                // Mise à jour visuelle de l'étape
                const stepIcon = document.getElementById(`step-${step.time}`);
                if (stepIcon) {
                    const iconClass = this.getStepIcon(step.type || 'info');
                    stepIcon.className = `${iconClass} text-yellow-400 animate-pulse`;
                    setTimeout(() => {
                        stepIcon.className = `fas fa-check text-green-400`;
                    }, 4000);
                }
            }
        });
    }
    
    getStepIcon(type) {
        const icons = {
            'action': 'fas fa-exclamation-triangle',
            'check': 'fas fa-search',
            'preparation': 'fas fa-tools',
            'info': 'fas fa-info-circle'
        };
        return icons[type] || 'fas fa-bell';
    }
    
    showIntermediateNotification(message, type = 'info', soundType = 'soft') {
        // Configuration des couleurs et icônes selon le type
        const notificationStyles = {
            'action': {
                colors: 'from-red-500 to-orange-600',
                icon: 'fas fa-exclamation-triangle',
                title: 'ACTION REQUISE',
                emoji: '⚡'
            },
            'check': {
                colors: 'from-blue-500 to-indigo-600',
                icon: 'fas fa-search',
                title: 'VÉRIFICATION',
                emoji: '🧪'
            },
            'preparation': {
                colors: 'from-green-500 to-teal-600',
                icon: 'fas fa-tools',
                title: 'PRÉPARATION',
                emoji: '🔧'
            },
            'info': {
                colors: 'from-yellow-500 to-orange-500',
                icon: 'fas fa-info-circle',
                title: 'INFORMATION',
                emoji: 'ℹ️'
            }
        };
        
        const style = notificationStyles[type] || notificationStyles['info'];
        
        // Notification visuelle temporaire avec style adapté
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 bg-gradient-to-r ${style.colors} text-white px-6 py-4 rounded-xl shadow-2xl z-50 transform translate-x-full transition-transform duration-300 border-2 border-white/20`;
        notification.innerHTML = `
            <div class="flex items-center space-x-3">
                <i class="${style.icon} text-2xl animate-pulse"></i>
                <div>
                    <p class="font-bold text-sm tracking-wide">${style.emoji} ${style.title}</p>
                    <p class="text-sm opacity-95 leading-relaxed">${message}</p>
                </div>
                <button class="ml-2 text-white/70 hover:text-white text-xl" onclick="this.parentElement.parentElement.style.transform='translateX(100%)'">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animation d'entrée
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Animation de sortie automatique (plus long pour les actions critiques)
        const displayTime = type === 'action' ? 6000 : 4500;
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, displayTime);
        
        // Son de notification adapté
        this.playStepNotification(soundType);
        
        // Alerte persistante pour les actions critiques
        if (type === 'action') {
            this.showPersistentAlert(message, type);
        }
        
        // Vibration pour les actions critiques sur mobile
        if (type === 'action' && 'navigator' in window && 'vibrate' in navigator) {
            navigator.vibrate([200, 100, 200]);
        }
        
        // Notification browser si disponible avec icône adaptée
        if ('Notification' in window && Notification.permission === 'granted') {
            const notificationTitle = `${style.emoji} ${style.title}`;
            new Notification(notificationTitle, {
                body: message,
                icon: this.getFaviconForType(type),
                tag: `cooking-step-${type}`,
                requireInteraction: type === 'action' // Les actions critiques restent visibles
            });
        }
    }
    
    getFaviconForType(type) {
        const colors = {
            'action': '%23ef4444',
            'check': '%233b82f6',
            'preparation': '%2310b981',
            'info': '%23f59e0b'
        };
        const color = colors[type] || colors['info'];
        return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>`;
    }
    
    showPersistentAlert(message, type = 'action') {
        // Système d'alertes persistantes pour les actions critiques
        const alertZone = document.getElementById('alertZone');
        const alertContent = document.getElementById('alertContent');
        const alertIcon = document.getElementById('alertIcon');
        const alertTitle = document.getElementById('alertTitle');
        const alertMessage = document.getElementById('alertMessage');
        const alertTimer = document.getElementById('alertTimer');
        const dismissAlert = document.getElementById('dismissAlert');
        
        if (!alertZone) return;
        
        // Configuration selon le type d'alerte
        const alertStyles = {
            'action': {
                gradient: 'from-red-500 to-orange-600',
                icon: 'fas fa-exclamation-triangle',
                title: '⚡ ACTION IMMÉDIATE REQUISE',
                borderClass: 'border-red-300'
            },
            'check': {
                gradient: 'from-blue-500 to-indigo-600',
                icon: 'fas fa-search',
                title: '🔍 VÉRIFICATION NÉCESSAIRE',
                borderClass: 'border-blue-300'
            },
            'preparation': {
                gradient: 'from-green-500 to-teal-600',
                icon: 'fas fa-tools',
                title: '🔧 PRÉPARATION EN COURS',
                borderClass: 'border-green-300'
            }
        };
        
        const style = alertStyles[type] || alertStyles['action'];
        
        // Mise à jour du contenu
        alertContent.className = `max-w-4xl mx-auto bg-gradient-to-r ${style.gradient} text-white px-6 py-4 rounded-b-2xl shadow-2xl border-4 ${style.borderClass}`;
        alertIcon.innerHTML = `<i class="${style.icon} animate-bounce"></i>`;
        alertTitle.textContent = style.title;
        alertMessage.textContent = message;
        alertTimer.textContent = this.formatTime(this.remainingTime);
        
        // Affichage de la bannière
        alertZone.style.transform = 'translateY(0)';
        
        // Gestionnaire de fermeture
        dismissAlert.onclick = () => {
            alertZone.style.transform = 'translateY(-100%)';
        };
        
        // Auto-masquer selon le type (actions critiques restent plus longtemps)
        if (type !== 'action') {
            setTimeout(() => {
                alertZone.style.transform = 'translateY(-100%)';
            }, 8000);
        }
        
        // Vibration pour mobile sur actions critiques
        if (type === 'action' && 'navigator' in window && 'vibrate' in navigator) {
            navigator.vibrate([300, 200, 300, 200, 300]);
        }
    }
    
    updateAlertTimer() {
        // Mise à jour du timer dans la bannière d'alerte
        const alertTimer = document.getElementById('alertTimer');
        const alertZone = document.getElementById('alertZone');
        
        if (alertTimer && alertZone && alertZone.style.transform === 'translateY(0px)') {
            alertTimer.textContent = this.formatTime(this.remainingTime);
        }
    }
    
    initializeDualModeListeners() {
        // Gestionnaires pour le minuteur 1
        const cookingType1 = document.getElementById('cookingType1');
        const minutes1 = document.getElementById('minutes1');
        const seconds1 = document.getElementById('seconds1');
        const setTimer1 = document.getElementById('setTimer1');
        const startBtn1 = document.getElementById('startBtn1');
        const pauseBtn1 = document.getElementById('pauseBtn1');
        const resetBtn1 = document.getElementById('resetBtn1');
        
        if (cookingType1) cookingType1.addEventListener('change', (e) => this.handleDualCookingTypeChange(1, e.target.value));
        if (setTimer1) setTimer1.addEventListener('click', () => this.setDualCustomTime(1));
        if (startBtn1) startBtn1.addEventListener('click', () => this.startDualTimer(1));
        if (pauseBtn1) pauseBtn1.addEventListener('click', () => this.pauseDualTimer(1));
        if (resetBtn1) resetBtn1.addEventListener('click', () => this.resetDualTimer(1));
        
        // Gestionnaires pour le minuteur 2
        const cookingType2 = document.getElementById('cookingType2');
        const minutes2 = document.getElementById('minutes2');
        const seconds2 = document.getElementById('seconds2');
        const setTimer2 = document.getElementById('setTimer2');
        const startBtn2 = document.getElementById('startBtn2');
        const pauseBtn2 = document.getElementById('pauseBtn2');
        const resetBtn2 = document.getElementById('resetBtn2');
        
        if (cookingType2) cookingType2.addEventListener('change', (e) => this.handleDualCookingTypeChange(2, e.target.value));
        if (setTimer2) setTimer2.addEventListener('click', () => this.setDualCustomTime(2));
        if (startBtn2) startBtn2.addEventListener('click', () => this.startDualTimer(2));
        if (pauseBtn2) pauseBtn2.addEventListener('click', () => this.pauseDualTimer(2));
        if (resetBtn2) resetBtn2.addEventListener('click', () => this.resetDualTimer(2));
        
        // Contrôles globaux
        const startAllBtn = document.getElementById('startAllBtn');
        const pauseAllBtn = document.getElementById('pauseAllBtn');
        const resetAllBtn = document.getElementById('resetAllBtn');
        
        if (startAllBtn) startAllBtn.addEventListener('click', () => this.startAllDualTimers());
        if (pauseAllBtn) pauseAllBtn.addEventListener('click', () => this.pauseAllDualTimers());
        if (resetAllBtn) resetAllBtn.addEventListener('click', () => this.resetAllDualTimers());
    }
    
    handleDualCookingTypeChange(timerId, cookingType) {
        const timer = this.dualTimers[`timer${timerId}`];
        timer.currentCookingType = cookingType;
        
        const presetTime = this.presetTimes[cookingType];
        if (presetTime !== null) {
            timer.totalTime = presetTime;
            timer.remainingTime = presetTime;
            this.updateDualInputs(timerId);
        }
        
        this.updateDualDisplay(timerId);
        this.updateDualCookingAdvice(timerId, cookingType);
        this.resetDualIntermediateSteps(timerId);
    }
    
    setDualCustomTime(timerId) {
        const minutes = parseInt(document.getElementById(`minutes${timerId}`).value) || 0;
        const seconds = parseInt(document.getElementById(`seconds${timerId}`).value) || 0;
        const totalSeconds = minutes * 60 + seconds;
        
        if (totalSeconds > 0) {
            const timer = this.dualTimers[`timer${timerId}`];
            timer.totalTime = totalSeconds;
            timer.remainingTime = totalSeconds;
            timer.currentCookingType = 'custom';
            this.updateDualDisplay(timerId);
            this.resetDualIntermediateSteps(timerId);
        }
    }
    
    startDualTimer(timerId) {
        const timer = this.dualTimers[`timer${timerId}`];
        const startBtn = document.getElementById(`startBtn${timerId}`);
        const pauseBtn = document.getElementById(`pauseBtn${timerId}`);
        
        if (timer.isRunning) return;
        
        timer.isRunning = true;
        timer.isPaused = false;
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        
        timer.timerInterval = setInterval(() => {
            timer.remainingTime--;
            this.updateDualDisplay(timerId);
            this.updateDualProgress(timerId);
            this.checkDualIntermediateSteps(timerId);
            
            if (timer.remainingTime <= 0) {
                this.handleDualOvertime(timerId);
                return;
            }
        }, 1000);
        
        this.updateDualTimerGlow(timerId, true);
    }
    
    pauseDualTimer(timerId) {
        const timer = this.dualTimers[`timer${timerId}`];
        const startBtn = document.getElementById(`startBtn${timerId}`);
        const pauseBtn = document.getElementById(`pauseBtn${timerId}`);
        
        if (timer.isRunning) {
            timer.isRunning = false;
            timer.isPaused = true;
            clearInterval(timer.timerInterval);
            
            startBtn.disabled = false;
            pauseBtn.disabled = true;
            
            this.updateDualTimerGlow(timerId, false);
        }
    }
    
    resetDualTimer(timerId) {
        const timer = this.dualTimers[`timer${timerId}`];
        const startBtn = document.getElementById(`startBtn${timerId}`);
        const pauseBtn = document.getElementById(`pauseBtn${timerId}`);
        
        timer.isRunning = false;
        timer.isPaused = false;
        timer.isOvertime = false;
        timer.overtimeSeconds = 0;
        timer.remainingTime = timer.totalTime;
        
        clearInterval(timer.timerInterval);
        
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        
        this.updateDualDisplay(timerId);
        this.updateDualProgress(timerId);
        this.updateDualTimerGlow(timerId, false);
        this.resetDualIntermediateSteps(timerId);
    }
    
    updateDualDisplay(timerId) {
        const timer = this.dualTimers[`timer${timerId}`];
        const display = document.getElementById(`timerDisplay${timerId}`);
        
        if (display) {
            if (timer.isOvertime) {
                const overtimeDisplay = `+${this.formatTime(timer.overtimeSeconds)}`;
                display.textContent = overtimeDisplay;
                display.className = 'text-6xl serif-title font-bold text-red-600 timer-glow mb-6 tracking-wide animate-pulse';
            } else {
                display.textContent = this.formatTime(timer.remainingTime);
                display.className = 'text-6xl serif-title font-bold text-gray-700 timer-glow mb-6 tracking-wide';
            }
        }
    }
    
    updateDualProgress(timerId) {
        const timer = this.dualTimers[`timer${timerId}`];
        const progressBar = document.getElementById(`progressBar${timerId}`);
        
        if (progressBar && !timer.isOvertime) {
            const progressPercentage = ((timer.totalTime - timer.remainingTime) / timer.totalTime) * 100;
            progressBar.style.width = `${progressPercentage}%`;
            
            // Couleur selon le temps restant
            if (timer.remainingTime <= 10) {
                progressBar.className = 'progress-bar bg-red-500 h-full rounded-full transition-all duration-500 animate-pulse';
            } else if (timer.remainingTime <= 60) {
                progressBar.className = 'progress-bar bg-orange-500 h-full rounded-full transition-all duration-500';
            } else {
                progressBar.className = 'progress-bar bg-green-500 h-full rounded-full transition-all duration-500';
            }
        }
    }
    
    updateDualInputs(timerId) {
        const timer = this.dualTimers[`timer${timerId}`];
        const minutes = Math.floor(timer.totalTime / 60);
        const seconds = timer.totalTime % 60;
        
        const minutesInput = document.getElementById(`minutes${timerId}`);
        const secondsInput = document.getElementById(`seconds${timerId}`);
        
        if (minutesInput) minutesInput.value = minutes;
        if (secondsInput) secondsInput.value = seconds;
    }
    
    updateDualCookingAdvice(timerId, cookingType) {
        const categoryDisplay = document.getElementById(`currentCategory${timerId}`);
        const iconDisplay = document.getElementById(`timerIcon${timerId}`);
        
        if (categoryDisplay) {
            const advice = this.cookingAdvice[cookingType];
            if (advice && cookingType !== 'custom') {
                categoryDisplay.textContent = this.getCookingTypeDisplayName(cookingType);
            } else {
                categoryDisplay.textContent = `CUISSON ${timerId}`;
            }
        }
        
        if (iconDisplay) {
            iconDisplay.className = this.getCookingTypeIcon(cookingType, timerId);
        }
    }
    
    getCookingTypeDisplayName(cookingType) {
        const names = {
            'egg-soft': 'ŒUFS À LA COQUE',
            'egg-medium': 'ŒUFS MOLLETS',
            'egg-hard': 'ŒUFS DURS',
            'pasta-fresh': 'PÂTES FRAÎCHES',
            'pasta-regular': 'PÂTES CLASSIQUES',
            'pasta-whole': 'PÂTES COMPLÈTES',
            'rice-white': 'RIZ BLANC',
            'rice-brown': 'RIZ COMPLET',
            'rice-basmati': 'RIZ BASMATI',
            'vegetables-steam': 'LÉGUMES VAPEUR',
            'vegetables-boiled': 'LÉGUMES BOUILLIS',
            'potatoes': 'POMMES DE TERRE',
            'steak-rare': 'STEAK SAIGNANT',
            'steak-medium': 'STEAK À POINT',
            'steak-well': 'STEAK BIEN CUIT',
            'chicken-breast': 'ESCALOPE POULET',
            'fish-fillet': 'FILET POISSON',
            'chocolate-fondant': 'FONDANT CHOCOLAT',
            'creme-brulee': 'CRÈME BRÛLÉE',
            'cake-vanilla': 'GÂTEAU VANILLE'
        };
        return names[cookingType] || 'CUISSON';
    }
    
    getCookingTypeIcon(cookingType, timerId) {
        const baseColor = timerId === 1 ? 'text-amber-600' : 'text-green-600';
        const icons = {
            'egg-soft': 'fas fa-egg',
            'egg-medium': 'fas fa-egg',
            'egg-hard': 'fas fa-egg',
            'pasta-fresh': 'fas fa-utensils',
            'pasta-regular': 'fas fa-utensils', 
            'pasta-whole': 'fas fa-utensils',
            'rice-white': 'fas fa-seedling',
            'rice-brown': 'fas fa-seedling',
            'rice-basmati': 'fas fa-seedling',
            'vegetables-steam': 'fas fa-leaf',
            'vegetables-boiled': 'fas fa-leaf',
            'potatoes': 'fas fa-potato',
            'steak-rare': 'fas fa-drumstick-bite',
            'steak-medium': 'fas fa-drumstick-bite',
            'steak-well': 'fas fa-drumstick-bite',
            'chicken-breast': 'fas fa-drumstick-bite',
            'fish-fillet': 'fas fa-fish',
            'chocolate-fondant': 'fas fa-birthday-cake',
            'creme-brulee': 'fas fa-birthday-cake',
            'cake-vanilla': 'fas fa-birthday-cake'
        };
        const iconClass = icons[cookingType] || 'fas fa-utensils';
        return `${iconClass} ${baseColor} text-lg mr-2`;
    }
    
    checkDualIntermediateSteps(timerId) {
        const timer = this.dualTimers[`timer${timerId}`];
        const advice = this.cookingAdvice[timer.currentCookingType];
        
        if (!advice || !advice.steps.length) return;
        
        advice.steps.forEach(step => {
            if (timer.remainingTime === step.time && !timer.completedSteps.has(step.time)) {
                timer.completedSteps.add(step.time);
                this.showDualIntermediateNotification(timerId, step.message, step.type || 'info', step.sound || 'soft');
            }
        });
    }
    
    showDualIntermediateNotification(timerId, message, type = 'info', soundType = 'soft') {
        // Adapter le message pour inclure l'identifiant du minuteur
        const timerLabel = `Minuteur ${timerId}`;
        const fullMessage = `${timerLabel}: ${message}`;
        
        // Utiliser le système d'alertes existant
        this.showIntermediateNotification(fullMessage, type, soundType);
    }
    
    resetDualIntermediateSteps(timerId) {
        this.dualTimers[`timer${timerId}`].completedSteps.clear();
    }
    
    updateDualTimerGlow(timerId, isActive) {
        const display = document.getElementById(`timerDisplay${timerId}`);
        if (display) {
            if (isActive) {
                display.classList.add('timer-glow');
            } else {
                display.classList.remove('timer-glow');
            }
        }
    }
    
    handleDualOvertime(timerId) {
        const timer = this.dualTimers[`timer${timerId}`];
        
        if (!timer.isOvertime) {
            timer.isOvertime = true;
            timer.overtimeSeconds = 0;
            this.playNotificationWithSettings();
            
            // Notification spécifique au minuteur
            if ('Notification' in window && Notification.permission === 'granted') {
                new Notification(`⏰ Minuteur ${timerId} terminé !`, {
                    body: `${this.getCookingTypeDisplayName(timer.currentCookingType)} - Temps écoulé`,
                    icon: this.getFaviconForType('action'),
                    tag: `dual-timer-${timerId}`
                });
            }
        }
        
        timer.overtimeSeconds++;
        this.updateDualDisplay(timerId);
    }
    
    // Contrôles globaux
    startAllDualTimers() {
        this.startDualTimer(1);
        this.startDualTimer(2);
    }
    
    pauseAllDualTimers() {
        this.pauseDualTimer(1);
        this.pauseDualTimer(2);
    }
    
    resetAllDualTimers() {
        this.resetDualTimer(1);
        this.resetDualTimer(2);
    }
    
    initDualMode() {
        // Initialiser l'affichage des deux minuteurs
        this.updateDualDisplay(1);
        this.updateDualDisplay(2);
        this.updateDualProgress(1);
        this.updateDualProgress(2);
        this.updateDualCookingAdvice(1, this.dualTimers.timer1.currentCookingType);
        this.updateDualCookingAdvice(2, this.dualTimers.timer2.currentCookingType);
        
        // Initialiser les sélecteurs avec des valeurs par défaut différentes
        const cookingType1 = document.getElementById('cookingType1');
        const cookingType2 = document.getElementById('cookingType2');
        
        if (cookingType1) cookingType1.value = 'steak-medium';
        if (cookingType2) cookingType2.value = 'vegetables-steam';
        
        // Appliquer les changements
        this.handleDualCookingTypeChange(1, 'steak-medium');
        this.handleDualCookingTypeChange(2, 'vegetables-steam');
    }

    addTestButtons() {
        // Ajouter des boutons de test en développement
        const testContainer = document.createElement('div');
        testContainer.className = 'fixed bottom-4 left-4 z-50 space-y-2';
        testContainer.innerHTML = `
            <div class="bg-gray-800 text-white p-4 rounded-xl shadow-2xl">
                <p class="text-sm font-bold mb-3">🧪 Tests Alertes</p>
                <div class="space-y-2">
                    <button id="testActionAlert" class="w-full bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm font-semibold">
                        ⚡ Test Action (Retourner)
                    </button>
                    <button id="testCheckAlert" class="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm font-semibold">
                        🧪 Test Vérification
                    </button>
                    <button id="testPrepAlert" class="w-full bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm font-semibold">
                        🔧 Test Préparation
                    </button>
                    <button id="testInfoAlert" class="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded text-sm font-semibold">
                        ℹ️ Test Info
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(testContainer);
        
        // Gestionnaires d'événements pour les tests
        document.getElementById('testActionAlert').addEventListener('click', () => {
            this.showIntermediateNotification("⚡ RETOURNEZ le steak maintenant !", 'action', 'alert');
        });
        
        document.getElementById('testCheckAlert').addEventListener('click', () => {
            this.showIntermediateNotification("🧪 Vérifiez que la chair devient opaque", 'check', 'soft');
        });
        
        document.getElementById('testPrepAlert').addEventListener('click', () => {
            this.showIntermediateNotification("🍽️ Préparez l'assiette et le papier alu", 'preparation', 'soft');
        });
        
        document.getElementById('testInfoAlert').addEventListener('click', () => {
            this.showIntermediateNotification("ℹ️ Les légumes commencent à s'attendrir", 'info', 'soft');
        });
    }
    
    playStepNotification(soundType = 'soft') {
        // Système de sons différenciés selon le type d'alerte
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const volume = this.settings.volume / 100;
            
            if (soundType === 'alert') {
                // Son d'alerte pour actions critiques (retourner viande, etc.)
                this.playAlertSound(audioContext, volume);
            } else if (soundType === 'soft') {
                // Son doux pour préparations et infos
                this.playSoftSound(audioContext, volume);
            }
        } catch (e) {
            console.log('Notification audio non disponible');
        }
    }
    
    playAlertSound(audioContext, volume) {
        // Son d'alerte plus marqué pour les actions critiques
        const oscillator1 = audioContext.createOscillator();
        const oscillator2 = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator1.connect(gainNode);
        oscillator2.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Double fréquence pour un son plus remarquable
        oscillator1.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator2.frequency.setValueAtTime(1000, audioContext.currentTime);
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume * 0.3, audioContext.currentTime + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);
        
        oscillator1.start(audioContext.currentTime);
        oscillator2.start(audioContext.currentTime);
        oscillator1.stop(audioContext.currentTime + 0.8);
        oscillator2.stop(audioContext.currentTime + 0.8);
    }
    
    playSoftSound(audioContext, volume) {
        // Son doux pour les notifications d'information
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume * 0.15, audioContext.currentTime + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.6);
    }
    
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    // Nouvelles méthodes pour les fonctionnalités avancées
    
    // === GESTION DES PARAMÈTRES ===
    loadSettings() {
        const defaultSettings = {
            alarmDuration: 5,
            volume: 70,
            lastPreset: 'custom',
            lastCategory: 'custom'
        };
        
        try {
            const saved = localStorage.getItem('timerSettings');
            return saved ? {...defaultSettings, ...JSON.parse(saved)} : defaultSettings;
        } catch (e) {
            return defaultSettings;
        }
    }
    
    saveSettings() {
        try {
            this.settings.alarmDuration = parseInt(this.alarmDurationSelect.value);
            this.settings.volume = parseInt(this.volumeSlider.value);
            this.settings.lastPreset = this.cookingTypeSelect.value;
            localStorage.setItem('timerSettings', JSON.stringify(this.settings));
        } catch (e) {
            console.log('Erreur sauvegarde paramètres');
        }
    }
    
    initializeSettings() {
        if (this.alarmDurationSelect) this.alarmDurationSelect.value = this.settings.alarmDuration;
        if (this.volumeSlider) this.volumeSlider.value = this.settings.volume;
        if (this.volumeValue) this.volumeValue.textContent = this.settings.volume + '%';
        if (this.cookingTypeSelect) this.cookingTypeSelect.value = this.settings.lastPreset;
    }
    
    updateVolume() {
        const volume = this.volumeSlider.value;
        this.settings.volume = volume;
        this.volumeValue.textContent = volume + '%';
        this.saveSettings();
    }
    
    toggleSettings() {
        this.settingsPanel.classList.toggle('hidden');
    }
    
    testSound() {
        this.playNotificationWithSettings(true);
    }
    
    resetSettings() {
        this.settings = {
            alarmDuration: 5,
            volume: 70,
            lastPreset: 'custom',
            lastCategory: 'custom'
        };
        this.initializeSettings();
        this.saveSettings();
    }
    
    // === GESTION DES MODES ===
    switchMode(mode) {
        this.currentMode = mode;
        
        // Update button states
        Object.keys(this.modeButtons).forEach(m => {
            this.modeButtons[m].classList.toggle('active', m === mode);
        });
        
        // Show/hide mode sections
        document.querySelectorAll('.timer-mode').forEach(el => el.classList.add('hidden'));
        
        switch(mode) {
            case 'classic':
                document.getElementById('classicMode').classList.remove('hidden');
                break;
            case 'dual':
                document.getElementById('dualMode').classList.remove('hidden');
                this.initDualMode();
                break;
            case 'pomodoro':
                document.getElementById('pomodoroMode').classList.remove('hidden');
                this.initPomodoro();
                break;
        }
        
        // Actualiser les publicités après changement de mode
        setTimeout(() => {
            AdManager.refreshAds();
        }, 500);
    }
    
    // === GESTION OVERTIME ===
    handleOvertime() {
        if (!this.isOvertime) {
            this.isOvertime = true;
            this.overtimeSeconds = 0;
            this.overtimeDisplay.classList.remove('hidden');
            this.timerDisplay.classList.add('overtime');
            
            // Continuer le compte en positif
            this.timerInterval = setInterval(() => {
                this.overtimeSeconds++;
                this.updateOvertimeDisplay();
            }, 1000);
        }
    }
    
    updateOvertimeDisplay() {
        const mins = Math.floor(this.overtimeSeconds / 60);
        const secs = this.overtimeSeconds % 60;
        const timeString = `+${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        
        if (this.timerDisplay) {
            this.timerDisplay.textContent = timeString;
        }
        if (this.overtimeCounter) {
            this.overtimeCounter.textContent = timeString;
        }
    }
    
    resetOvertime() {
        this.isOvertime = false;
        this.overtimeSeconds = 0;
        this.overtimeDisplay.classList.add('hidden');
        this.timerDisplay.classList.remove('overtime');
    }
    
    // === ANTI-OUPS ===
    setupAntiOups() {
        window.addEventListener('beforeunload', (e) => {
            if (this.isRunning || this.hasActiveTimers()) {
                e.preventDefault();
                e.returnValue = 'Vous avez des minuteurs en cours. Êtes-vous sûr de vouloir quitter ?';
                return e.returnValue;
            }
        });
    }
    
    hasActiveTimers() {
        return Array.from(this.multipleTimers.values()).some(timer => timer.isRunning);
    }
    
    // === SONNERIE AVANCÉE ===
    playNotificationWithSettings(isTest = false) {
        const duration = isTest ? 2 : parseInt(this.settings.alarmDuration);
        const volume = this.settings.volume / 100;
        
        if (duration === -1) {
            // Sonnerie continue
            this.playContinuousAlarm(volume);
            this.stopAlarmBtn.classList.remove('hidden');
        } else {
            // Sonnerie limitée
            this.playLimitedAlarm(duration, volume);
        }
    }
    
    playContinuousAlarm(volume) {
        let beepCount = 0;
        this.alarmInterval = setInterval(() => {
            this.playBeepWithVolume(volume, 0.5);
            beepCount++;
            if (beepCount > 100) { // Sécurité
                this.stopAlarm();
            }
        }, 1000);
    }
    
    playLimitedAlarm(duration, volume) {
        let elapsed = 0;
        this.alarmInterval = setInterval(() => {
            this.playBeepWithVolume(volume, 0.3);
            elapsed++;
            if (elapsed >= duration) {
                this.stopAlarm();
            }
        }, 500);
    }
    
    playBeepWithVolume(volume, duration = 0.3) {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            gainNode.gain.setValueAtTime(volume * 0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration);
        } catch (e) {
            console.log('Audio non disponible');
        }
    }
    
    stopAlarm() {
        if (this.alarmInterval) {
            clearInterval(this.alarmInterval);
            this.alarmInterval = null;
        }
        this.stopAlarmBtn.classList.add('hidden');
    }
    
    // === POMODORO ===
    initPomodoro() {
        this.pomodoroSession = 1;
        this.pomodoroIsWork = true;
        this.pomodoroCount = 0;
        this.pomodoroTotalTime = 0;
        this.updatePomodoroStats();
        this.resetPomodoroTimer();
    }
    
    updatePomodoroStats() {
        if (this.pomodoroElements.count) this.pomodoroElements.count.textContent = this.pomodoroCount;
        if (this.pomodoroElements.cycle) this.pomodoroElements.cycle.textContent = this.pomodoroIsWork ? 'Travail' : 'Pause';
        if (this.pomodoroElements.total) this.pomodoroElements.total.textContent = Math.floor(this.pomodoroTotalTime / 60) + 'min';
    }
    
    resetPomodoroTimer() {
        const time = this.pomodoroIsWork ? 1500 : 300; // 25min ou 5min
        this.totalTime = time;
        this.remainingTime = time;
        this.updatePomodoroDisplay();
        this.updatePomodoroProgress();
    }
    
    updatePomodoroDisplay() {
        const minutes = Math.floor(this.remainingTime / 60);
        const seconds = this.remainingTime % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (this.pomodoroElements.display) {
            this.pomodoroElements.display.textContent = timeString;
        }
        if (this.pomodoroElements.label) {
            this.pomodoroElements.label.textContent = this.pomodoroIsWork ? 'Session de travail' : 'Pause bien méritée';
        }
    }
    
    updatePomodoroProgress() {
        const progress = 1 - (this.remainingTime / this.totalTime);
        const percentage = Math.round(progress * 100);
        
        // Cercle
        const circumference = 2 * Math.PI * 180;
        const offset = circumference - (progress * circumference);
        if (this.pomodoroElements.circle) {
            this.pomodoroElements.circle.style.strokeDasharray = circumference;
            this.pomodoroElements.circle.style.strokeDashoffset = offset;
        }
        
        // Barre
        if (this.pomodoroElements.bar) {
            this.pomodoroElements.bar.style.width = `${percentage}%`;
        }
    }
    
    startPomodoro() {
        this.isRunning = true;
        this.pomodoroElements.startBtn.disabled = true;
        this.pomodoroElements.pauseBtn.disabled = false;
        
        this.timerInterval = setInterval(() => {
            this.remainingTime--;
            this.pomodoroTotalTime++;
            this.updatePomodoroDisplay();
            this.updatePomodoroProgress();
            
            if (this.remainingTime <= 0) {
                this.finishPomodoroSession();
            }
        }, 1000);
    }
    
    pausePomodoro() {
        this.isRunning = false;
        clearInterval(this.timerInterval);
        this.pomodoroElements.startBtn.disabled = false;
        this.pomodoroElements.pauseBtn.disabled = true;
    }
    
    skipPomodoro() {
        this.finishPomodoroSession();
    }
    
    resetPomodoro() {
        this.isRunning = false;
        clearInterval(this.timerInterval);
        this.pomodoroElements.startBtn.disabled = false;
        this.pomodoroElements.pauseBtn.disabled = true;
        this.initPomodoro();
    }
    
    finishPomodoroSession() {
        this.isRunning = false;
        clearInterval(this.timerInterval);
        
        if (this.pomodoroIsWork) {
            this.pomodoroCount++;
        }
        
        this.playNotificationWithSettings();
        
        // Passer au suivant automatiquement
        this.pomodoroIsWork = !this.pomodoroIsWork;
        this.updatePomodoroStats();
        this.resetPomodoroTimer();
        
        // Auto-start après 2 secondes
        setTimeout(() => {
            if (!this.isRunning) {
                this.startPomodoro();
            }
        }, 2000);
    }
    
    // === MINUTEURS MULTIPLES ===

}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    window.advancedTimer = new AdvancedTimer();
    
    // Animation d'entrée
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(20px)';
    document.body.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transform = 'translateY(0)';
    }, 100);
    
    // Initialisation des publicités
    AdManager.initializeAds();
    AdManager.trackAdPerformance();
    
    // Messages d'aide
    console.log('🍳 Minuteur de Cuisine chargé !');
    console.log('💡 Raccourcis clavier :');
    console.log('   - Espace : Démarrer/Pause');
    console.log('   - Échap : Reset');
});

// Gestion des publicités AdSense
class AdManager {
    static initializeAds() {
        // Chargement différé des publicités pour améliorer les performances
        if (typeof window.adsbygoogle === 'undefined') {
            window.adsbygoogle = [];
        }
        
        // Initialisation des publicités après le chargement de la page
        setTimeout(() => {
            document.querySelectorAll('.adsbygoogle').forEach(ad => {
                try {
                    (window.adsbygoogle = window.adsbygoogle || []).push({});
                } catch (e) {
                    console.log('Erreur chargement publicité:', e);
                }
            });
        }, 1000);
    }
    
    static refreshAds() {
        // Actualiser les publicités lors du changement de mode
        try {
            document.querySelectorAll('.adsbygoogle').forEach(ad => {
                if (ad.querySelector('iframe')) {
                    // Publicité déjà chargée, on la laisse
                    return;
                }
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            });
        } catch (e) {
            console.log('Erreur actualisation publicité:', e);
        }
    }
    
    static trackAdPerformance() {
        // Tracking simple des interactions avec les publicités
        document.querySelectorAll('.adsbygoogle').forEach(ad => {
            ad.addEventListener('click', () => {
                console.log('Clic publicité détecté');
                // Ici vous pouvez ajouter Google Analytics ou autre tracking
            });
        });
    }
}

// Service Worker pour fonctionnalité offline (optionnel)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {
            console.log('Service Worker non disponible');
        });
    });
}