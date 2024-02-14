

var showMenu = false;
var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;
var width;
var height = width;
//var blockSize = Math.round((screenWidth / 3) / 20);
var blockSize = screenWidth > screenHeight ? Math.ceil((screenHeight * 0.6)/20) : Math.ceil((screenWidth * 0.8)/20);
var rows = 20;
var cols = 20;

var score = 0;

var context;

var heroX = 0;
var heroY = 0;

var goalX = 0 * blockSize;
var goalY = 0 * blockSize;

window.onload = function () {
    

    canvas = document.getElementById('canvas');
    canvas.width = cols * blockSize;
    canvas.height = rows * blockSize;
    context = canvas.getContext("2d");

    setGoal();

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

