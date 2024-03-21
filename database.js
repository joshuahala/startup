const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json')

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

const client = new MongoClient(url);

const db = client.db('startup');
const userCollection = db.collection('userInfo');
const heroesCollection = db.collection('userHeroes');

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
    heroesCollection.insertOne(heroes)
  }
}

async function getHeroes(username) {
  return heroesCollection.findOne({username: username})
}

module.exports = {
  getUser,
  createUser,
  storeHeroes,
  getHeroes
}

  

  