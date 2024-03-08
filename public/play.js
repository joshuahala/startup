
class Message {
    constructor(user, message) {
        this.user = user;
        this.message = message;
    }
}


let messages = [];

let loseStreak = 0;

var showMenu = false;
var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;
var width;
var height = width;
//var blockSize = Math.round((screenWidth / 3) / 20);
var blockSize = screenWidth > screenHeight ? Math.floor((screenHeight * 0.6)/20) : Math.floor((screenWidth * 0.8)/20);
var rows = 20;
var cols = 20;

var score = 0;
let topScore = 0;
let lives = 3;
let spawnHazards = false;

var context;

var heroX = 0;
var heroY = 0;

let color="aquamarine";
let hazardColor = "red";


var goalX = 0 * blockSize;
var goalY = 0 * blockSize;

let hazards = [];
let lazerOn = false;

const startText = document.getElementById('start-text');

class Hazard {
    constructor(hx, hy, dir) {
        this.hx = hx;
        this.hy = hy;
        this.dir = dir;
    }


    
    move() {
        if(this.dir == "up") {
            this.hy -=1 * (blockSize/2);
        }
        if(this.dir == "down") {
            this.hy +=1 * (blockSize/2);
        }
        if(this.dir == "left") {
            this.hx -=1 * (blockSize/2);
        }
        if(this.dir == "right") {
            this.hx +=1 * (blockSize/2);
        }
    }
}

class Lazer {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

window.onload = function () {
    let localTopScore = JSON.parse(localStorage.getItem("topScore"));
    if (localTopScore) topScore = localTopScore;
    document.getElementById('top-score').textContent = topScore;

    document.querySelector('.dropdown-content').style.display = "none";

    let currentColor = JSON.parse(localStorage.getItem("currentColor"));
    setColor(currentColor);

    var username = localStorage.getItem('username');
    if (username) {
        document.getElementById('username').textContent = username;
    }
    
    canvas = document.getElementById('canvas');
    canvas.width = cols * blockSize;
    canvas.height = rows * blockSize;
    context = canvas.getContext("2d");
    
    setGoal();
    //spawnHazard();
    
    document.addEventListener("keyup", (e) => {
        if (e.key == 'Enter') {
            spawnHazards = !spawnHazards;
            spawnHazards == true ? document.getElementById('start-text').style.display = "none" : document.getElementById('start-text').style.display = "block";
            lives = 3;
            score = 0;
        }
        console.log(e.key);
    });
    
    document.addEventListener("keydown", arrowMove);
    document.querySelector('.dropdown-btn').addEventListener('click', function() {
        document.querySelector('.dropdown-content').classList.toggle('show');
    });

    newMessage();
    newMessage();
    
    setInterval(update, 1000/10);
    setInterval(spawnHazard, 1000/2);
    //setInterval(toggleLazer, 5000);

    let randomInterval = Math.floor(Math.random() * 5 + 4);
    setInterval(newMessage, randomInterval*1000);
    
    
}

function update() {
    if (screenHeight > screenWidth) {
        blockSize = Math.round((screenWidth*.75) / 20);
    }
    context.fillStyle = "black";
    context.fillRect(0, 0, cols * blockSize, rows * blockSize);
    
    context.fillStyle = color;
    context.fillRect(heroX, heroY, blockSize, blockSize);

    context.fillStyle = "white";
    context.fillRect(goalX, goalY, blockSize, blockSize);
    
    let lazer = new Lazer(5, 0);
    lazerOn == true ? context.fillStyle = "yellow" : context.fillStyle = "black";
    context.fillRect(lazer.x*blockSize, lazer.y, blockSize, blockSize);
    context.fillRect(lazer.x*blockSize, lazer.y+(19*blockSize), blockSize, blockSize);
    
    
    
    // update hazard movement
    for(let hazard of hazards){
        context.fillStyle = hazardColor;
        context.fillRect(hazard.hx, hazard.hy, blockSize, blockSize);
        hazard.move();
        //check for collision
        if(heroX == hazard.hx && heroY == hazard.hy) {
            spawnHazards = false;
            document.getElementById('start-text').style.display = "block";
            showQuote();
            getQuote();
            if (score > topScore) {
                topScore = score;
                document.getElementById('top-score').textContent = topScore;
                recordScoreInfo();
            }
            loseStreak ++;
            if (loseStreak == 3) weak();
        }
    }
    
    //check if reached goal
    if (goalX == heroX && goalY == heroY && spawnHazards == true) {
        score ++;
        setGoal();
    }
    
    
    
    
    document.getElementById('score').innerHTML = score;
}

function setGoal() {
    goalX = Math.floor(Math.random() * 19) * blockSize;
    goalY = Math.floor(Math.random() * 19) * blockSize;
    
}

function spawnHazard() {
    if(spawnHazards == false){
        return;
    }
    let side = Math.floor(Math.random() * 3 + 1);
    let x;
    let y;
    let direction;
    switch(side){
        //top
        case 1:
            y = 0;
            x = Math.floor(Math.random() * 13 + 3);
            direction = "down";
            break;
            //right
            case 2:
                y = Math.floor(Math.random() * 13 + 3);
                x = 19;
                direction = "left";
                break;
                //bottom
                case 3:
                    y = 19;
                    x = Math.floor(Math.random() * 13 + 3);
                    direction = "up";
                    break;
        //left
        case 4:
            y = Math.floor(Math.random() * 13 + 3);
            x = 0;
            direction = "right";
            break;
        }
        
        let hazard = new Hazard(x*blockSize, y*blockSize, direction);
        hazards.push(hazard);
        if(hazards.length > 8) {
            hazards.splice(0,1);
        }
        console.log(hazards.length);
    }
    
    function arrowMove(e) {
        
        
        if(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "s", "a", "d"].includes(e.key)) {
            e.preventDefault();
        }
        if(spawnHazards == true) {
            
            if ((e.key == "ArrowUp" || e.key == "w") && heroY != 0) {
                heroY -= 1 * blockSize;
            }
            else if ((e.key == "ArrowDown" || e.key == "s") && heroY != 19*blockSize) {
                heroY += 1 * blockSize;
            }
            else if ((e.key == "ArrowLeft" || e.key == "a") && heroX != 0) {
                heroX -= 1 * blockSize;
            }
            else if ((e.key == "ArrowRight" || e.key == "d") && heroX != 19*blockSize) {
                heroX += 1 * blockSize;
            }
        }
    }
    
    function move(direction) {
        if (direction == "up" && heroY != 0) {
        heroY -= 1 * blockSize;
    }
    else if (direction == "down" && heroY != 19*blockSize) {
        heroY += 1 * blockSize;
    }
    else if (direction == "left" && heroX != 0) {
        heroX -= 1 * blockSize;
    }
    else if (direction == "right" && heroX != 19*blockSize) {
        heroX += 1 * blockSize;
    }
}

document.querySelector('.dropdown-btn').addEventListener('click', function() {
    document.querySelector('.dropdown-content').classList.toggle('show');
});

function toggleMenu() {
    showMenu = !showMenu;
    console.log(showMenu);
    if (showMenu == true) {
        document.querySelector('.dropdown-content').style.display = "flex";
        console.log("opened");
    } else {
        document.querySelector('.dropdown-content').style.display = "none";
        console.log("closed");
        
    }
}

function startGame() {
    spawnHazards = true;
    document.getElementById('start-text').style.display = "none";
}
function fireLazer(lazer) {
    context.fillStyle = "black";
    context.fillRect(lazer.x*blockSize, lazer.y, blockSize, 19*blockSize);
}
function toggleLazer() {
    lazerOn = !lazerOn;
}
function spawnLazer() {
    let lazer = new Lazer(5, 0);
    lazerOn == true ? context.fillStyle = "yellow" : context.fillStyle = "black";
    context.fillRect(lazer.x*blockSize, lazer.y, blockSize, blockSize);
    context.fillRect(lazer.x*blockSize, lazer.y+(19*blockSize), blockSize, blockSize);
    
}



function newMessage() {
    let messageBoard = document.getElementById('player-notifications');

    let userNumber = Math.round(Math.random()*3 + 1);
    let messageNumber = Math.round(Math.random()*3 + 1);
    let usertxt = chooseMessage(userNumber, messageNumber)[0];
    let messagetxt = chooseMessage(userNumber, messageNumber)[1];

    

    let message = new Message(usertxt, messagetxt);
    messages.push(message);

    let userText = document.createElement('span');
    userText.classList.add('player-name');
    userText.textContent = message.user;

    let messageText = document.createElement('span');
    messageText.textContent = ` ${message.message}`;
    let content = document.createElement('p');
    content.appendChild(userText);
    content.appendChild(messageText);
    messageBoard.appendChild(content);

    setTimeout(function() {
        content.remove();
    }, 7000)
}

function chooseMessage(userNum, messageNum) {
    let usertext;
    let messagetxt;
    switch(userNum) {
        case 1:
            usertext = "Jared";
            break;
        case 2:
            usertext = "Alexander";
            break;
        case 3:
            usertext = "Clu";
            break;
        case 4:
            usertext = "Hal";
            break;    
    }

    switch(messageNum) {
        case 1:
            messagetxt = "Started a new game";
            break;
        case 2:
            messagetxt = "got a new highscore";
            break;
        case 3:
            messagetxt = "leveled up";
            break;
        case 4:
            messagetxt = "leveled up";
            break;
    }
    return [usertext, messagetxt]; // Correctly return both values in an array
}

function showQuote() {
    let quote = document.getElementById('realQuote');
    quote.style.display = "block";
}

function hideQuote() {
    let quote = document.getElementById('realQuote');
    quote.style.display = "none";
}

function recordScoreInfo() {
    var username = localStorage.getItem('username');
    let heroesListString = localStorage.getItem("usersHeroes");
    let heroesList = JSON.parse(heroesListString);
    let numHeroes = heroesList.length; 
    let topLevel = 1;
    for (let hero of heroesList) {
        if (hero.level > topLevel) {
            topLevel = hero.level;
        }
    }

    let scoreInfo = [
        username,
        topScore,
        numHeroes,
        topLevel
    ];

    let tableData = JSON.parse(localStorage.getItem("tableData"));
    if (!tableData) tableData=[];
    tableData.push(scoreInfo);

    localStorage.setItem("tableData", JSON.stringify(tableData));
    localStorage.setItem("topScore", JSON.stringify(topScore));
}    

function setColor(currentColor) {
    switch(currentColor) {
        case 1:
            color = "red";
            hazardColor = "orange"
            break;
        case 2:
            color = "lime";
            break;
        case 3:
            color = "blue";
            break;
    }
}

function weak() {
    console.log("hit")
    selectedHero = JSON.parse(localStorage.getItem("selectedHero"));
    let isWeak = [true, selectedHero];
    localStorage.setItem("weak", JSON.stringify(isWeak));
}

function getQuote() {
    const url = "https://api.quotable.io/random";
    fetch(url)
        .then((x) => x.json())
        .then((response) => {
            document.getElementById('quote').textContent = JSON.stringify(response.content);
            document.getElementById('author').textContent = JSON.stringify(response.author);
        });
}