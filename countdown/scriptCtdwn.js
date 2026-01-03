// 1. Définition de la date cible (20 Juin 2026 à minuit)
const targetDate = new Date("June 20, 2026 00:00:00").getTime();

// 2. Mise à jour du compte à rebours toutes les secondes
const timer = setInterval(() => {
    // Obtenir la date et l'heure actuelles
    const now = new Date().getTime();
    
    // Calculer la distance entre la date actuelle et la cible
    const distance = targetDate - now;

    // Calcul des jours, heures, minutes et secondes
    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    // 3. Affichage des résultats dans les éléments HTML
    // Utilisation de la condition ternaire pour ajouter un '0' devant les chiffres < 10
    document.getElementById("days").innerText = d;
    document.getElementById("hours").innerText = h < 10 ? '0' + h : h;
    document.getElementById("minutes").innerText = m < 10 ? '0' + m : m;
    document.getElementById("seconds").innerText = s < 10 ? '0' + s : s;

    // 4. Si le compte à rebours est terminé
    if (distance < 0) {
        // Arrêter l'intervalle
        clearInterval(timer);

        // Cacher le bloc du compteur
        const timerWrapper = document.getElementById("timer-wrapper");
        if (timerWrapper) timerWrapper.style.display = "none";

        // Cacher également le groupe de boutons centraux
        const buttonGroup = document.querySelector(".button-group");
        if (buttonGroup) buttonGroup.style.display = "none";

        // Afficher le message final
        const message = document.getElementById("message");
        if (message) message.style.display = "block";
    }
}, 1000);