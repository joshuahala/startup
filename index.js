const express = require('express');
const app = express();



app.listenerCount(8080);

// JSON body parsing using built-in middleware
app.use(express.json());
// Serve up the front-end static content hosting
app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
  });

app.get('/api_say_hello', (req, res,) => {
    alert("hello");
})


const port = 8080;
app.listen(port, function() {
    console.log(`Listening on port ${port}`)
})