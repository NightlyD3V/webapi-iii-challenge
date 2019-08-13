const express = require('express');
const helmet = require('helmet');
const server = express();

server.use(helmet('development'));
server.use(express.json());

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

server.listen(4000, () => {
  console.log('server listening on port 4000');
});

//custom middleware

function logger(req, res, next) {

};

module.exports = server;
