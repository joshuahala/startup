


let currentColor;
let color;
let usersHeroes = [];
let GlobalUsername;

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

blueHero = new Hero("freeze", 1, 1, 'assets/images/blue-only.png');

window.onload = async function () {
    checkUsername();
    
    await getLoginInfo();
    let heroes = await getHeroes();
    await displayHeroes(heroes[0], heroes[1]);
}

function addHero(heroObj, selectedHero) {
    let heroes = document.getElementById('heroes-container');

    let heroEl = document.createElement('div');//create new hero div
    heroEl.classList.add('hero-card');// add hero class
    heroEl.addEventListener('click', function(event) {
        if(document.querySelector(".selected")){

            document.querySelector(".selected").classList.remove("selected")
        }
        event.target.classList.add("selected");
        setColor(heroObj.color);
        
        postCurrentColor(heroObj.color);
        postSelectedHero(heroObj);
    });
    

    if (selectedHero && heroObj.name == selectedHero.name) {
        heroEl.classList.add("selected");
    }

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

    let nameEl = document.createElement('p');
    nameEl.classList.add('hero-name');
    nameEl.textContent = heroObj.name;
    heroEl.appendChild(nameEl);// add bottom label to hero card
    heroEl.appendChild(cardBottom);// add bottom label to hero card
    heroes.appendChild(heroEl);// add hero card to the heroes container

    //add the image to the hero background
    heroEl.style.backgroundImage = `url("${heroObj.url}")`;
}

function clickAdd() {
    
    beginner();
}

function randomHero() {
    let newRandom = Math.round(Math.random()*2) + 1;
    let newHero = new Hero("name", newRandom, 1);
    newHero.setURL(newHero.color)
    currentColor = newHero.color;
    usersHeroes.push(newHero);
    //localStorage.setItem('usersHeroes', JSON.stringify(usersHeroes));
    //localStorage.setItem('currentColor', JSON.stringify(currentColor));
    postCurrentColor(currentColor);
    postHeroes(usersHeroes);

    addHero(usersHeroes);
}

function beginner() {
    document.getElementById('message').style.display = "block";
    
}

function awesomeBtn() {
    document.getElementById('message').style.display = "none";
    randomHero();
    document.getElementById('name-him').style.display = "flex";
    
}

function saveName() {
    nameInput = document.getElementById('name-input').value;
    for (let hero of usersHeroes) {
        if (hero.name == "name")
        hero.name = nameInput;
    }
    
    //localStorage.setItem("usersHeroes", JSON.stringify(usersHeroes));
    postHeroes(usersHeroes);
    
    document.getElementById('name-him').style.display = "none";

    let heroes = document.getElementById('heroes-container');
    while (heroes.firstChild) {
        heroes.removeChild(heroes.firstChild);
    }
    
    for (let hero of usersHeroes) {
        addHero(hero);
    }
    

}

function setColor(currentColor) {
    switch(currentColor) {
        case 1:
            color = "red";
            break;
        case 2:
            color = "lime";
            break;
        case 3:
            color = "blue";
            break;
    }
}

async function getLoginInfo() {
    try {
        const response = await fetch('/api/get_login_info');

        if(!response.ok) {
            console.log("error")
            let username = localStorage.getItem('username');
            document.getElementById('username').textContent = username;
            GlobalUsername = username;
            
        } else {
            const data = await response.json();
            document.getElementById('username').textContent = data.username;
            GlobalUsername = username;
        }
        
    } catch(error) {
        console.log(error);
    }
}

async function getSelectedHero() {
    const localUsername = localStorage.getItem('username')
    try {
        const response = await fetch('/api/get_selected_hero', {
            method: 'POST',
            body: JSON.stringify({ username: localUsername }),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        });

        if (!response.ok) {
            console.log("Error fetching heroes data");
        } else {
            let data = await response.json()
            let selectedHero = data.selectedHero;
            return selectedHero;
        }
    } catch (error) {
        console.log("Error fetching heroes data", error);
    }
}


async function getHeroes() {
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
            return [Heroes, selectedHero]
        }
    } catch (error) {
        console.log("Error fetching heroes data", error);
    }
}

async function displayHeroes(Heroes, selectedHero) {

    if (Heroes == "nope") {
        beginner();
    } else {
        let heroesList = Heroes;
        for (let hero of heroesList) {
            addHero(hero, selectedHero);
        }
    }
    
}

async function postHeroes(heroes) {
    const localUsername = localStorage.getItem('username');
    const response = await fetch('/api/save_heroes', {
        method: 'Post',
        body: JSON.stringify({heroes: heroes, username: localUsername}),
        headers: {'Content-type': 'application/json; charset=UTF-8'}
    });
}

async function postCurrentColor(color) {
    let data = {
        setColor: color
    }
    const response = await fetch('/api/save_current_color', {
        method: 'Post',
        body: JSON.stringify(data),
        headers: {'Content-type': 'application/json; charset=UTF-8'}
    });
}

async function postSelectedHero(hero) {
    const username = localStorage.getItem('username');
    let data = {
        username: username,
        selectedHero: hero
    }
    const response = await fetch('/api/save_selected_hero', {
        method: 'Post',
        body: JSON.stringify(data),
        headers: {'Content-type': 'application/json; charset=UTF-8'}
    });

}

async function checkUsername() {
    let username = localStorage.getItem('username');
    if (username) {
        return true;
    } else {
        window.location.href = 'login.html';
    }
}


getLoginInfo();
getHeroes();
