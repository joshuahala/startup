const express = require('express');
const app = express();
const DB = require('./database.js')



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
  res.send(JSON.stringify(loginInfo));
})


apiRouter.get('/get_heroes', (req, res) => {
  if(heroesList) {
    res.send({
      heroes: heroesList,
      selectedHero: selectedHero  
    });
  } else {
    res.send(JSON.stringify("nope"));
  }
})

apiRouter.get('/get_current_color', (req, res) => {
  let col = currentColor
  res.send(JSON.stringify(col));
  
})

apiRouter.get('/get_selected_hero', (req, res) => {
  
  res.send(JSON.stringify(selectedHero));
  
})

apiRouter.get('/get_topScore', (req, res) => {
  
  res.send(JSON.stringify(topScore));
  
})

apiRouter.get('/get_scoreData', (req, res) => {
  res.send(JSON.stringify(scoreData));
})

apiRouter.post('/createLogin', async (req, res) => {
  user = await DB.getUser(req.body.username);
  if(user) {
    res.status(401).send({ msg: 'Unauthorized' });
  } else {
    DB.createUser(req.body.username, req.body.password);
  }
})

apiRouter.post('/authLogin', async (req, res) => {
  user = await DB.getUser(req.body.username);
  if(user && req.body.password == user.password) {
    res.send(req.body.username)
  }
})

apiRouter.post('/login_info', (req, res) => {
  saveLoginInfo(req.body.username, req.body.password);
  res.send({message: "saving login"})
});

apiRouter.post('/save_heroes', (req, res) => {
  saveHeroes(req.body);
})

apiRouter.post('/save_current_color', (req, res) => {
  const data = req.body;
  saveColor(data);
})

apiRouter.post('/save_selected_hero', (req, res) => {
  const data = req.body;
  res.send("got it");
  saveSelectedHero(data);
})

apiRouter.post('/save_topScore', (req, res) => {
  const data = req.body;
  const score = data.newTopScore;
  res.send("got it");
  saveTopScore(score);
})

apiRouter.post('/save_scoreInfo', (req, res) => {
  const data = req.body;
  const scoreInfo = data.body;
  res.send("got it");
  saveScoreInfo(scoreInfo);
})

const port = process.argv.length > 2 ? process.argv[2] : 3000;
app.listen(port, function() {
    console.log(`Listening on port ${port}`)
});

let loginInfo = {
  username: "sdf",
  password: "fds"
};

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

