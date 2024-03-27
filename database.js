const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json')

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

const client = new MongoClient(url);

const db = client.db('startup');
const userCollection = db.collection('userInfo');
const scoreCollection = db.collection('scoreInfo');
const heroesCollection = db.collection('userHeroes');
const selectedHeroCollection = db.collection('selectedHeroes');

// test connection
(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
  })().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  });

async function getUser(usernameInput) {
  return userCollection.findOne({username: usernameInput})
}  

async function createUser(username, password) {
  let hashPass = await bcrypt.hash(password, 10);
  let data = {
    username: username,
    password: hashPass
  }
  userCollection.insertOne(data)
}

async function storeHeroes(heroes, username) {
  heroesList = await heroesCollection.findOne({username: username})
  if(heroesList) {
    await heroesCollection.updateOne({ username: username }, { $set: { heroes: heroes.heroes} });
  } else {
    heroesCollection.insertOne(heroes);
  }
}

async function getHeroes(username) {
  return heroesCollection.findOne({username: username})
}

async function saveSelectedHero(data) {
  await heroesCollection.updateOne({ username: data.username }, { $set: { selectedHero: data.selectedHero} });
}

async function getSelectedHero(username) {
  console.log(username);
  return selectedHeroCollection.findOne({username: username})
}

async function saveScoreInfo(scoreInfo) {
  console.log(scoreInfo)
  scoreCollection.insertOne(scoreInfo);
}

async function getTopScore(username) {
  const topScore = await scoreCollection.findOne({ username: username }, { sort: { topScore: -1 } });
  if(topScore) {
    return topScore;
  } else {
    return {topScore: 0}
  }
}

async function getScoreData() {
  return scoreCollection.find({}).toArray()
    .then(documents => {
      console.log("Array of documents:", documents);
      return documents;
    })
    .catch(error => {
      console.error("Error:", error);
      // Handle error
    });
}

async function updateLevel(username, heroName, level) {
  await heroesCollection.updateOne(
    { username: username, "heroes.name": heroName },
    { $set: { "heroes.$.level": level } }
  );
}

module.exports = {
  getUser,
  createUser,
  storeHeroes,
  getHeroes,
  saveSelectedHero,
  getSelectedHero,
  saveScoreInfo,
  getTopScore,
  getScoreData,
  updateLevel
}



  

  