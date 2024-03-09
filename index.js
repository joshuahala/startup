const express = require('express');
const app = express();



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

apiRouter.post('/login_info', (req, res) => {
  saveLoginInfo(req.body.username, req.body.password);
  res.send({message: "saving login"})
});

const port = 8080;
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

