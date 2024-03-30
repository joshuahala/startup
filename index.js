const express = require('express');
const app = express();
const bcrypt = require('bcrypt')
const DB = require('./database.js')
const { peerProxy } = require('./peerProxy.js');




app.listenerCount(8080);

// JSON body parsing using built-in middleware
app.use(express.json());
// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
  });

app.get('/api_say_hello', (req, res,) => {
    res.send({name: 'provo'});
})

apiRouter.get('/scores', (_req, res) => {
    res.send({name: 'provo'});
  });

apiRouter.get('/get_login_info', (req, res) => {
  if (loginInfo) {
    res.send(JSON.stringify(loginInfo));
  } else {
    res.status(404).send({ msg: 'resource not found' });
  }
})


apiRouter.post('/get_heroes', async (req, res) => {
  const username = req.body.username;
  const heroesList = await DB.getHeroes(username);
  if(heroesList) {
    res.send(JSON.stringify(heroesList))
  } else {
    res.send(JSON.stringify("nope"));
  }
})

apiRouter.get('/get_current_color', (req, res) => {
  let col = currentColor
  res.send(JSON.stringify(col));
  
})

apiRouter.post('/get_selected_hero', async (req, res) => {
  let selected = await DB.getSelectedHero(req.body.username);
  res.send(JSON.stringify(selected))
})

apiRouter.post('/get_topScore', async (req, res) => {
  const username = await req.body.username;
  const topScore = await DB.getTopScore(username);
  res.send(topScore);
  
})

apiRouter.get('/get_scoreData', async (req, res) => {
  const scoreData = await DB.getScoreData();
  res.send(scoreData);
})

apiRouter.post('/get_challenger', async (req, res) => {
  const user = req.body.username;
  const challengeInfo = await DB.getChallenger(user);
  console.log("sent it")
  res.send(JSON.stringify(challengeInfo));
})

apiRouter.post('/createLogin', async (req, res) => {
  const user = await DB.getUser(req.body.username);
  if(user) {
    res.status(401).send({ msg: 'Unauthorized' });
  } else {
    DB.createUser(req.body.username, req.body.password);
    res.status(200).send({ mesg: 'ok'});
  }
})

apiRouter.post('/authLogin', async (req, res) => {
  const user = await DB.getUser(req.body.username);
  if(user) {
    if(await bcrypt.compare(req.body.password, user.password)) {
      res.send(req.body.username)
    }
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
})

apiRouter.post('/login_info', (req, res) => {
  saveLoginInfo(req.body.username, req.body.password);
  res.send({message: "saving login"})
});

apiRouter.post('/save_heroes', (req, res) => {
  let heroes = {...req.body};
  let username = req.body.username
  DB.storeHeroes(heroes, username);
})

apiRouter.post('/save_current_color', (req, res) => {
  const data = req.body;
  saveColor(data);
})

apiRouter.post('/save_selected_hero', (req, res) => {
  const data = req.body;
  res.send("got it");
  DB.saveSelectedHero(data);
})

apiRouter.post('/save_topScore', (req, res) => {
  const data = req.body;
  const score = data.newTopScore;
  res.send("got it");
  saveTopScore(score);
})

apiRouter.post('/updateHeroLevel', (req, res) => {
  const data = req.body;
  const username = data.username;
  const heroName = data.hero.name;
  const level = data.hero.level;
  DB.updateLevel(username, heroName, level);
})

apiRouter.post('/save_scoreInfo', (req, res) => {
  const scoreInfo = req.body;
  res.send("got it");
  DB.saveScoreInfo(scoreInfo);
})

apiRouter.post('/challengeAccepted', (req, res) => {
  const data = req.body;
  res.send("got it");
  DB.challengeAccepted(data);
})

const port = process.argv.length > 2 ? process.argv[2] : 5050;
//app.listen(port, function() {
//    console.log(`Listening on port ${port}`)
//});

let loginInfo;

function saveLoginInfo(username, password) {
  loginInfo.username = username;
  loginInfo.password = password;
  console.log("saved");
}

let heroesList;
function saveHeroes(object) {
  heroesList = object;
}

let currentColor = 1;
function saveColor(color) {
  currentColor = color;
}

let selectedHero;
function saveSelectedHero(hero) {
  selectedHero = hero;
}

let topScore = "0";
function saveTopScore(score) {
  topScore = score;
  console.log("saved score")
}

let scoreData = [];
function saveScoreInfo(scoreInfo) {
  scoreData = (scoreInfo);
  console.log("saved score")
}

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

peerProxy(httpService);

