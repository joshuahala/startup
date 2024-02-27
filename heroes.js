let usersHeroes = [];
let localHeroes = localStorage.getItem('usersHeroes');
if (localHeroes) {
    usersHeroes = JSON.parse(localHeroes);
    console.log(usersHeroes)
}


window.onload = function() {
    var username = localStorage.getItem('username');
    if (username) {
        document.getElementById('username').textContent = username;
    }
    if (usersHeroes.length < 1) {
        beginner();
    } else {
        for (let hero of usersHeroes) {
            addHero(hero);
        }
    }

}
class Hero {
    constructor(name, color, level, url = null){
        this.name = name;
        this.color = color;
        this.level = level;
        this.url = url;
    }

    setURL(color) {
        switch(color) {
            case 1:
                this.url = 'assets/images/red-only.png';
                break;
            case 2:
                this.url = 'assets/images/green-only2.png';
                break;
            case 3:
                this.url = 'assets/images/blue-only.png';
                break;
                
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
    heroEl.style.backgroundImage = `url("${heroObj.url}")`;
}

function clickAdd() {
    
    randomHero();
}

function randomHero() {
    let newRandom = Math.round(Math.random()*2) + 1;
    let newHero = new Hero("name", newRandom, 1);
    newHero.setURL(newHero.color)
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