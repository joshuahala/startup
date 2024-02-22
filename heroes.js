

function addHero() {
    alert("sdfsf")
    let heroes = document.getElementById('heroes-container');
    hero = document.createElement('div');
    hero.classList.add('hero-card');
    cardBottom = document.createElement('div');
    cardBottom.classList.add('card-bottom');

    hero.appendChild(cardBottom);
    heroes.appendChild(hero);
}