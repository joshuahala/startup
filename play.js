

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

var context;

var heroX = 0;
var heroY = 0;

var goalX = 0 * blockSize;
var goalY = 0 * blockSize;

let hazards = [];

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
    }
}

window.onload = function () {
    

    canvas = document.getElementById('canvas');
    canvas.width = cols * blockSize;
    canvas.height = rows * blockSize;
    context = canvas.getContext("2d");

    setGoal();
    spawnHazard();

    

    document.addEventListener("keydown", arrowMove);
    document.querySelector('.dropdown-btn').addEventListener('click', function() {
        document.querySelector('.dropdown-content').classList.toggle('show');
    });

    setInterval(update, 1000/10);
    
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

    

    for(let hazard of hazards){
        context.fillStyle = "red";
        context.fillRect(hazard.hx, hazard.hy, blockSize, blockSize);
        hazard.move();
    }

    //check if reached goal
    if (goalX == heroX && goalY == heroY) {
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
    let hazard = new Hazard(19*blockSize, 19*blockSize, "up");
    hazards.push(hazard);
    let hazard2 = new Hazard(10*blockSize, 10*blockSize, "up");
    hazards.push(hazard2);
}

function arrowMove(e) {
    
    if(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "s", "a", "d"].includes(e.key)) {
        e.preventDefault();
    }
    
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

