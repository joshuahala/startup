import React from 'react';

export function Play() {
  
class Message {
  constructor(user, message) {
      this.user = user;
      this.message = message;
  }
}
let username;

let messages = [];

let loseStreak = 0;

let heroesList;
let selectedHero;

var showMenu = false;
var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;
var width;
var height = width;
//var blockSize = Math.round((screenWidth / 3) / 20);
var blockSize = screenWidth > screenHeight ? Math.floor((screenHeight * 0.6)/20) : Math.floor((screenWidth * 0.75)/20);
console.log(blockSize)
var rows = 20;
var cols = 20;

var score = 0;
let topScore = 0;
let points = 0;
let lives = 3;
let spawnHazards = false;

var context;

var heroX = 0;
var heroY = 0;

let color="aquamarine";
let currentColor;
let hazardColor = "red";


var goalX = 0 * blockSize;
var goalY = 0 * blockSize;

let hazards = [];
let lazerOn = false;
let speed = blockSize/2;
let difficulty = 1;

let weakHero;
let challengeUser;

const startText = document.getElementById('start-text');

class Hazard {
  constructor(hx, hy, dir) {
      this.hx = hx;
      this.hy = hy;
      this.dir = dir;
  }


  
  move() {
      if(this.dir == "up") {
          this.hy -=1 * (speed);
      }
      if(this.dir == "down") {
          this.hy +=1 * (speed);
      }
      if(this.dir == "left") {
          this.hx -=1 * (speed);
      }
      if(this.dir == "right") {
          this.hx +=1 * (speed);
      }
  }
}

class Lazer {
  constructor(x, y){
      this.x = x;
      this.y = y;
  }
}

window.onload = async function () {
  await configureWebSocket();

  if (!localStorage.getItem('username')) {
      window.location.href = 'login.html'
  }
  username = await getLoginInfo()

  let heroInfo = await getHeroes();
  heroesList = heroInfo[0];
  selectedHero = heroInfo[1];
  if (heroesList.includes(selectedHero)) {
      // selectedHero is in heroesList
      console.log("selectedHero is in heroesList");
  } else {
      // selectedHero is not in heroesList
      selectedHero = heroesList[0];
  }
  currentColor = selectedHero? selectedHero.color : heroesList[0].color

  // let localTopScore = JSON.parse(localStorage.getItem("topScore"));
  // if (localTopScore) topScore = localTopScore;
  topScore = await getTopScore(username);
  document.getElementById('top-score').textContent = topScore;

  document.querySelector('.dropdown-content').style.display = "none";

  //let currentColor = JSON.parse(localStorage.getItem("currentColor"));
  setColor(currentColor);

  //var username = localStorage.getItem('username');
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
          //score = 0;
          if (spawnHazards == true) sendMessage(username, "startGame");
      }
      console.log(e.key);
  });
  
  document.addEventListener("keydown", arrowMove);
  document.querySelector('.dropdown-btn').addEventListener('click', function() {
      document.querySelector('.dropdown-content').classList.toggle('show');
  });

 
  
  setInterval(update, 1000/10);
  setInterval(spawnHazard, 1000/2);
  //setInterval(toggleLazer, 5000);

  let randomInterval = Math.floor(Math.random() * 5 + 4);
  
  
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
          difficulty = 1;
          document.getElementById('canvas').classList.remove('canvas-rotate')
          speed = blockSize/2;
          document.getElementById('start-text').style.display = "block";
          showQuote();
          getQuote();
          if (score > topScore) {
              topScore = score;
              document.getElementById('top-score').textContent = topScore;
              saveTopScore(topScore)
              

              recordScoreInfo();
          }
          loseStreak ++;
          if (loseStreak == 3) weak();

          //send message to other players
          let txt = `scored ${score}`;
          sendMessage(username, "endGame", score);
      }
  }
  
  //check if reached goal
  if (goalX == heroX && goalY == heroY && spawnHazards == true) {
      score ++;
      setGoal();
      if(score % 5 == 0) {
          increaseDifficulty();
      }
      addPoint();
      levelUp();
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

// document.querySelector('.dropdown-btn').addEventListener('click', function() {
//     document.querySelector('.dropdown-content').classList.toggle('show');
// });

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

function increaseDifficulty() {
  if (difficulty == 1) {
      speed = blockSize;
      difficulty = 2;
  } else if (difficulty == 2) {
      speed = blockSize/2;
      document.getElementById('canvas').classList.add('canvas-rotate');
      difficulty = 3;
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

function addPoint() {
  const chance = Math.round(Math.random()*5 + 1)
  if(chance >=3) {
      points ++ ;
  }
  // check what level he is
  const level = selectedHero.level;
  // if level 1, and scores 5, level up
  if (level == 1 && score % 5 == 0) {
      selectedHero.level = 2;
      updateHeroLevel();
      alert("level up")
  } else if (level == 2 && score % 10 == 0) {
      selectedHero.level = 3;
      updateHeroLevel();
      alert("level up")
  } else if (level == 3 && score % 15 == 0) {
      selectedHero.level = 4;
      updateHeroLevel();
      alert("level up")
  } else if (level >= 4 && points % 5 == 0) {
      selectedHero.level ++;
      updateHeroLevel();
      alert("level up")
  }
}

function levelUp() {
 
}



function newMessage(usertxt, messagetxt) {
  let messageBoard = document.getElementById('player-notifications');

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



function showQuote() {
  let quote = document.getElementById('realQuote');
  quote.style.display = "block";
}

function hideQuote() {
  let quote = document.getElementById('realQuote');
  quote.style.display = "none";
}

async function recordScoreInfo() {
  var username = localStorage.getItem('username');
  // let heroesListString = localStorage.getItem("usersHeroes");
  // let heroesList = JSON.parse(heroesListString);
  let heroess, sselectedHero = await getHeroes();
  let numHeroes = heroess.length; 
  let topLevel = 1;
  heroess.push(selectedHero);
  for (let hero of heroess) {
       if (hero.level > topLevel) {
           topLevel = hero.level;
       }
   }

  let scoreInfo = {
      username: username,
      topScore: topScore,
      numHeroes: numHeroes,
      topLevel: topLevel
  };

  let tableData = JSON.parse(localStorage.getItem("tableData"));
  if (!tableData) tableData=[];
  tableData.push(scoreInfo);
  saveScoreInfo(scoreInfo);

  // localStorage.setItem("tableData", JSON.stringify(tableData));
  // localStorage.setItem("topScore", JSON.stringify(topScore));
}    

async function setColor(currentColor) {
  // const response = await fetch('/api/get_current_color');
  // const data = await response.json();
  // let currentColor = data.setColor;


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
  const data = {
      username: username,
      type: "weak",
      hero: selectedHero
  }
  if (socket) {
      socket.send(JSON.stringify(data));
  } else {
      console.log("Socket is not initialized");
  }


}

async function saveTopScore(score) {
  let data = {
      newTopScore: score
  }
  fetch('/api/save_topScore', {
      method: 'Post',
      body: JSON.stringify(data),
      headers: {'Content-type': 'application/json; charset=UTF-8'}
  })
}
async function saveScoreInfo(scoreInfo) {
  console.log("loggins")
  
  fetch('/api/save_scoreInfo', {
      method: 'Post',
      body: JSON.stringify(scoreInfo),
      headers: {'Content-type': 'application/json; charset=UTF-8'}
  })
}

async function challengeAccepted() {
  const data = {
      user: username,
      challengeUser: challengeUser,
      weakHero: weakHero
  }
  fetch('/api/challengeAccepted', {
      method: 'Post',
      body: JSON.stringify(data),
      headers: {'Content-type': 'application/json; charset=UTF-8'}
  })
}

async function updateHeroLevel() {
  const data = {
      hero: selectedHero,
      username: username
  }
  fetch('/api/updateHeroLevel', {
      method: 'Post',
      body: JSON.stringify(data),
      headers: {'Content-type': 'application/json; charset=UTF-8'}
  })
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

async function getTopScore(username) {
  try {
      const response = await fetch('/api/get_topScore', {
          method: 'POST',
          body: JSON.stringify({ username: username }),
          headers: { 'Content-type': 'application/json; charset=UTF-8' }
      });

      if(response.ok) {
          const scoreInfo = await response.json();
          //const topScore = scoreInfo.topScore;
          const topScore = 2;
          return topScore;
      } 
  } catch (error) {
      console.log("error getting topscore", error)
  }    
}

async function getLoginInfo() {
  try {
      const response = await fetch('/api/get_login_info');

      if(!response.ok) {
          console.log("error")
          let username = localStorage.getItem('username');
          document.getElementById('username').textContent = username;
          return username
      } else {
          const data = await response.json();
          document.getElementById('username').textContent = data.username;
          return data.username;
      }
      
  } catch(error) {
      console.log(error);
  
  }
}



function closeMessage() {
  let message = document.getElementById('challenge-notification');
  message.style.display = "none";

}

async function accept() {
  await challengeAccepted()
  window.location.href = "challenge.html";

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
          let selectedHero;
          selectedHero = data.selectedHero? data.selectedHero : data.heroes[0]
          if(data=="nope") {
              heroesList = data;
          } else {
              return [data.heroes, selectedHero];

          }
          
      }
  } catch (error) {
      console.log("Error fetching heroes data", error);
  }
}
getHeroes();

let socket = null;

async function configureWebSocket() {
  const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
  socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
  socket.onopen = (event) => {
      console.log("websocket connected");
  };
  socket.onclose = (event) => {
      console.log("ws disconnected")
  };
  socket.onmessage = async (event) => {
      const msg = JSON.parse(await event.data.text());
      if (msg.type === "startGame") {
          let messagetxt = "started a game";
          newMessage(msg.username, messagetxt);
      } else if (msg.type === "endGame") {
          let messagetxt = `scored ${msg.score}`;
          newMessage(msg.username, messagetxt);
      } else if (msg.type == "weak") {
          challengeUser = msg.username;
          weakHero = msg.hero;
          document.getElementById('challenge-notification').style.display = "block";
      }
  };
}

function sendMessage(username, type, score=null) {
  const data = {
      username: username,
      type: type,
      score: score
  }
  if (socket) {
      socket.send(JSON.stringify(data));
  } else {
      console.log("Socket is not initialized");
  }
}



  return (
    <div className="body">
      <div id="player-notifications"></div>

      <div id="game">
        <div id="start-text" onClick={startGame}>
          <h2>PRESS ENTER TO START</h2>
          <p>or click here</p>
        </div>
        <div id="scores">
          <div>
            <p>Current Score: <span id="score">0</span></p>
          </div>
          <div>
            <p>Top Score: <span id="top-score">0</span></p>
          </div>
        </div>

        <canvas id="canvas"></canvas>

        <div id="controls">
          <div id="left">
            <div onClick={() => move('left')} style={{ backgroundImage: 'url("assets/images/arrowLeft.png")' }} className="arrow" id="left"></div>
          </div>
          <div id="middle">
            <div onClick={() => move('up')} style={{ backgroundImage: 'url("assets/images/arrow.png")' }} className="arrow" id="up"></div>
            <div onClick={() => move('down')} style={{ backgroundImage: 'url("assets/images/arrowDown.png")' }} className="arrow" id="down"></div>
          </div>
          <div id="right">
            <div onClick={() => move('right')} style={{ backgroundImage: 'url("assets/images/arrowRight.png")' }} className="arrow" id="right"></div>
          </div>
        </div>
      </div>
      <div id="challenge-notification" className="message">
        <p>Aristotle's Bit Hero is weak!</p>
        <p>challenge him?</p>
        <p><button onClick={accept}>Y</button><button onClick={closeMessage}>N</button></p>
      </div>
      <div className="message" id="realQuote">
        <p id="quote"></p>
        <p id="author"></p>
        <button onClick={hideQuote}>Awesome</button>
      </div>
      <div className="quote"></div>
    </div>
  );
}
