
class Hero {
    constructor(name, color, level){
        this.name = name;
        this.color = color;
        this.level = level;
    }

    url(color) {
        switch(color) {
            case "blue":
                return 'assets/images/blue-only.png';
                
            case "red":
                return 'assets/images/red-only.png';
                
        }
    }
}

blueHero = new Hero("freeze", "blue", 1);

function addHero(heroObj) {
    alert("sdfsf")
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
    addHero(blueHero);
}