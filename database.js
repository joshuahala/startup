const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json')

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

const client = new MongoClient(url);

const db = client.db('startup');
const collection = db.collection('userInfo');

// test connection
(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
  })().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  });

async function getUser(usernameInput) {
  return collection.findOne({username: usernameInput})
}  

async function createUser(username, password) {
  let data = {
    username: username,
    password: password
  }
  collection.insertOne(data)
}

module.exports = {
  getUser,
  createUser
}

  

  