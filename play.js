


var screenWidth = window.innerWidth;
var width = screenWidth / 7;
var height = width;
var blockSize = (screenWidth / 3) / 20;
//var blockSize = 25
var rows = 20;
var cols = 20;

var context;

var heroX = 4 * blockSize;
var heroY = 4 * blockSize;

window.onload = function () {
    canvas = document.getElementById('canvas');
    canvas.width = cols * blockSize;
    canvas.height = rows * blockSize;
    context = canvas.getContext("2d");

    setInterval(update, 1000/10);
    
}

function update() {
    context.fillStyle = "black";
    context.fillRect(0, 0, cols * blockSize, rows * blockSize);

    context.fillStyle = "aquamarine";
    context.fillRect(heroX, heroY, blockSize, blockSize);
}



