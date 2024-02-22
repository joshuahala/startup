


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
    
    setInterval(update, 1000/10);
    setInterval(spawnHazard, 1000/2);
    setInterval(toggleLazer, 5000);
    
    
}

function update() {
    if (screenHeight > screenWidth) {
        blockSize = Math.round((screenWidth*.75) / 20);
    }
    context.fillStyle = "black";
    context.fillRect(0, 0, cols * blockSize, rows * blockSize);
    
    context.fillStyle = "aquamarine";
    context.fillRect(heroX, heroY, blockSize, blockSize);

    context.fillStyle = "lime";
    context.fillRect(goalX, goalY, blockSize, blockSize);
    
    let lazer = new Lazer(5, 0);
    lazerOn == true ? context.fillStyle = "yellow" : context.fillStyle = "black";
    context.fillRect(lazer.x*blockSize, lazer.y, blockSize, blockSize);
    context.fillRect(lazer.x*blockSize, lazer.y+(19*blockSize), blockSize, blockSize);
    
    
    
    // update hazard movement
    for(let hazard of hazards){
        context.fillStyle = "red";
        context.fillRect(hazard.hx, hazard.hy, blockSize, blockSize);
        hazard.move();
        //check for collision
        if(heroX == hazard.hx && heroY == hazard.hy) {
            spawnHazards = false;
            document.getElementById('start-text').style.display = "block";
            if (score > topScore) {
                topScore = score;
                document.getElementById('top-score').textContent = topScore;
            }
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
        document.getElementById('menu').style.display = "flex";
        console.log("opened");
    } else {
        document.getElementById('menu').style.display = "none";
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


