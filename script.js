// Script permettant de traiter les données de l'ordre de passage
// et de les afficher dans le tableau de l'ordre de passage
// Auteur: Valentin Gourjon

async function init() {
    const data = await fetch("/initVars").then((res) => {
        return res.json();
    });
    document.getElementById("gauche").innerHTML = data["gauche"];
    document.getElementById("droite").innerHTML = data["droite"];
}

async function precedent() {
    const data = await fetch("/precedent").then((res) => {
        return res.json();
    });
    document.getElementById("gauche").innerHTML = data["gauche"];
    document.getElementById("droite").innerHTML = data["droite"];
}

async function suivant() {
    const data = await fetch("/suivant").then((res) => {
        return res.json();
    });
    document.getElementById("gauche").innerHTML = data["gauche"];
    document.getElementById("droite").innerHTML = data["droite"];
}
