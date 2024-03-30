// let localHeroes = localStorage.getItem('usersHeroes');
// if (localHeroes) {
//     usersHeroes = JSON.parse(localHeroes);
//     console.log(usersHeroes)
// }
let win = false;
let heroesList = null;
let challengeData;
let challengeUser;
let Enemy;

window.onload = async function() {
    if (!localStorage.getItem('username')) {
        window.location.href = 'login.html'
    }
    // var username = localStorage.getItem('username');
    // if (username) {
    //     document.getElementById('username').textContent = username;
    // }
    Enemy = await getChallenger(); 

    heroesList = await getHeroes();
    getLoginInfo()
    if (heroesList.length < 1) {
        beginner();
    } else {
        for (let hero of heroesList) {
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


function addHero(heroObj) {
    let heroes = document.getElementById('choose-hero');
    
    let heroEl = createHeroEl(heroObj);
    heroEl.addEventListener('click', function(event) {
        chosen(heroObj);
    });
    heroes.appendChild(heroEl);// add hero card to the heroes container
    
}

function chosen(heroObj) {
    document.getElementById('challenging').style.display = "block"
    document.getElementById('choose-div').style.display = "none";
    let heroes = document.getElementById('heroes-container');
    let heroEl = createHeroEl(heroObj);
    let enemyEl = createHeroEl(Enemy);
    let vs = document.createElement('h1');
    vs.textContent = "vs";
    heroes.appendChild(heroEl);
    heroes.appendChild(vs);
    heroes.appendChild(enemyEl);

    setTimeout(challenge, 3000);

}

function createHeroEl(heroObj) {

    let heroEl = document.createElement('div');//create new hero div
    heroEl.classList.add('hero-card');// add hero class
    
    cardBottom = document.createElement('div');// add bottom label
    cardBottom.classList.add('card-bottom');//add class to bottom label
    //add the level and train button to the card
    let level = document.createElement('p');
    level.textContent = `LVL ${heroObj.level}`;
    

    cardBottom.appendChild(level);

    let nameEl = document.createElement('p');
    nameEl.classList.add('hero-name');
    nameEl.textContent = heroObj.name;
    heroEl.appendChild(nameEl);// add bottom label to hero card
    heroEl.appendChild(cardBottom);// add bottom label to hero card

    //add the image to the hero background
    heroEl.style.backgroundImage = `url("${heroObj.url}")`;

    return heroEl;
}

function result() {
    document.getElementById('challenging').style.display = "none";
    document.getElementById('result').style.display = "block";

}

async function resultBtn() {
    if (win == true){
        heroesList.push(Enemy);
        postHeroes(heroesList)
        const response = await stealHero();
    }
    window.location.href = "heroes.html";
}

// to consider
let yourLevel = 3;
let theirLevel = 7;
let modifier = (yourLevel - theirLevel)*4;


function challenge() {
    let chance = Math.round(Math.random()*99 + 1 + modifier);
    console.log(chance);
    
    if (chance > 20) {
        alert("win");
        win = true;
    } else if (chance < 20) {
        gotAway()
    } else {
        gotAway()
    
    }

    result();
}


function gotAway() {
    let resultMessage = document.getElementById('result');
    let title = document.getElementById('result-title');
    let message = document.getElementById('result-message');
    let btn = document.getElementById('result-btn');
    title.textContent = "He Got away";
    message.textContent = "Better luck next time"
    btn.textContent = "ok"

}

async function postHeroes(heroes) {
    const localUsername = localStorage.getItem('username');
    const response = await fetch('/api/save_heroes', {
        method: 'Post',
        body: JSON.stringify({heroes: heroes, username: localUsername}),
        headers: {'Content-type': 'application/json; charset=UTF-8'}
    });
    if (response.ok) {
        return 
    }
}

async function stealHero(){
    data = {
        user: challengeUser,
        hero: Enemy
    }
    const response = await fetch('/api/steal_hero', {
        method: 'Post',
        body: JSON.stringify(data),
        headers: {'Content-type': 'application/json; charset=UTF-8'}
    })
    if (response.ok) {
        return "done";
    }
}

async function getLoginInfo() {
    try {
        const response = await fetch('/api/get_login_info');

        if(!response.ok) {
            console.log("error")
        }

        const data = await response.json();
        document.getElementById('username').textContent = data.username;
        
    } catch(error) {
        console.log(error);
    }
}

async function getHeroes() {
    let GlobalUsername = localStorage.getItem('username');
    try {
        const response = await fetch('/api/get_heroes', {
            method: 'POST',
            body: JSON.stringify({ username: GlobalUsername }),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        });

        if (!response.ok) {
            console.log("Error fetching heroes data");
        } else {
            const data = await response.json();
            let Heroes;
            let selectedHero;
            if (data == "nope") {
                Heroes = data;
            } else {
                Heroes = data.heroes;
                selectedHero = data.selectedHero;
            }
            return Heroes
        }
    } catch (error) {
        console.log("Error fetching heroes data", error);
    }
}

async function getChallenger() {
    try {
        let GlobalUsername = localStorage.getItem('username');
        const response = await fetch('/api/get_challenger', {
            method: 'POST',
            body: JSON.stringify({ username: GlobalUsername }),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        });

        const challengeInfo = await response.json();
        challengeUser = challengeInfo.challengeUser;
        return challengeInfo.weakHero;

    } catch (error) {
        console.log(error, "sldfkjsldf")
    }
}




