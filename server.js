require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const server = express();

const port = process.env.PORT || 4000;

const User = require('./users/userDb.js');
const Post = require('./posts/postDb.js');

const userRouter = require('./users/userRouter.js');
const postRouter = require('./posts/postRouter.js');

server.use(helmet());
server.use(express.json());
server.use(logger);
server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

server.listen(port, () => {
  console.log(`***Sever is running on ${port}***`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`req.method: ${req.method}, req.url: ${req.url}, timestamp: ${Date.now()}`);
  next();
};

function validateUserId(req, res, next) {
    const { id } = req.params;

    User.getById(id)
    .then(user => {
      if(user) {
        req.user = user;
        res.status(200).json(user);
        next();
      } else {
        res.status(500).json({
          message: 'Invalid user ID'
        });
      };
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: 'Error processing request!'
      })
    })
};

function validateUser(req, res, next) {
  const user = req.user;
    if(user.body && Object.keys(req.body).length > 0) {
      res.status(200)
      next();
    } else {
      res.status(500).json({
        message: 'Missing user data!'
      })
    }
};

function validatePost(req, res, next) {
  const body = req.body;

  if(body && Object.keys(req.body).length > 0) {
    next();
  } else if(req.body.text === '') {
    res.status(400).json({
      message: 'Missing required text field'
    })
  }else {
    res.status(500).json({
      message: "Missing post data!"
    })
  }
};

module.exports = server;