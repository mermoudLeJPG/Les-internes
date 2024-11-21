let header = document.getElementById("header"); //le header de la page
header.style.display = "none";

/**
 * donne le top de la div depuis son id
 * @param {string} id - l'id de l'element
 * @returns {int} rect.top
 */
function VerifPosTop(id) {
    return document.getElementById(id).getBoundingClientRect().top;
}

/**
 * affiche ou non le header en fonction de zone2
 */
function AffichageHeader() {
    var pos = VerifPosTop("zone2");
    if (pos <= window.innerHeight / 4) {
        header.style.display = "flex";
    } else {
        header.style.display = "none";
    }
}

//rappel une fonction lors du scroll
document.addEventListener("scroll", AffichageHeader);