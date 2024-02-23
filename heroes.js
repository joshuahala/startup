let usersHeroes = [];
let localHeroes = localStorage.getItem('usersHeroes');
if (localHeroes) {
    usersHeroes = JSON.parse(localHeroes);
}


window.onload = function() {
    if (usersHeroes.length < 1) beginner();
    var username = localStorage.getItem('username');
    if (username) {
        document.getElementById('username').textContent = username;
    } else {
        for (let hero of usersHeroes) {
            addHero(hero);
        }
    }

}
class Hero {
    constructor(name, color, level){
        this.name = name;
        this.color = color;
        this.level = level;
    }

    url(color) {
        switch(color) {
            case 1:
                return 'assets/images/red-only.png';
            case 2:
                return 'assets/images/green-only2.png';
            case 3:
                return 'assets/images/blue-only.png';
                
        }
    }
}

blueHero = new Hero("freeze", 1, 1);

function addHero(heroObj) {
    let heroes = document.getElementById('heroes-container');

    let heroEl = document.createElement('div');//create new hero div
    heroEl.classList.add('hero-card');// add hero class
    cardBottom = document.createElement('div');// add bottom label
    cardBottom.classList.add('card-bottom');//add class to bottom label
    //add the level and train button to the card
    let level = document.createElement('p');
    level.textContent = `LVL ${heroObj.level}`;
    let linkP = document.createElement('p');
    let linkA = document.createElement('a');
    
    linkA.href = "play.html";
    linkA.textContent = "TRAIN";

    linkP.appendChild(linkA);
    cardBottom.appendChild(level);
    cardBottom.appendChild(linkP);

    heroEl.appendChild(cardBottom);// add bottom label to hero card
    heroes.appendChild(heroEl);// add hero card to the heroes container

    //add the image to the hero background
    heroEl.style.backgroundImage = `url(${heroObj.url(heroObj.color)}`;
}

function clickAdd() {
    
    randomHero();
}

function randomHero() {
    let newRandom = Math.round(Math.random()*2) + 1;
    let newHero = new Hero("name", newRandom, 1);
    addHero(newHero);
    usersHeroes.push(newHero);
    localStorage.setItem('usersHeroes', JSON.stringify(usersHeroes));}

function beginner() {
    document.getElementById('message').style.display = "block";
    
}

function awesomeBtn() {
    document.getElementById('message').style.display = "none";
    randomHero();
    
}