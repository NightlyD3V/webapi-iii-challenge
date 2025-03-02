const express = require('express');
const User = require('./userDb.js');
const Post = require('../posts/postDb.js');
const router = express.Router();

/* POST: /api/users/ */ 
router.post('/', [ validateUser ], async (req, res) => {
    try {
        const newUser = await User.insert(req.body);
        res.status(200).json({User: `${newUser} created!`});
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Error creating new user!'
        })
    }
});

/* POST: /api/users/:id/posts */ 
router.post('/:id/posts', [ validateUserId, validatePost ], async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.getById(id);
        res.status(200).json(post)
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: `Error getting post with that ID: ${id}`
        })
    }
});

/* GET: /api/users/ */ 
router.get('/', async (req, res) => {
    try {
        const users = await User.get();
        res.status(200).json(users)
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Error getting all users!'
        })
    }
});

/* GET: api/users/:id */ 
router.get('/:id', [ validateUserId ], async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.getById(id);
        res.status(200).json(user);
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: `Error getting user with that ID: ${id}`
        })
    }
});

/* GET: api/users/:id/posts */
router.get('/:id/posts', [ validateUserId, validatePost ], async (req, res) => {
    try {
        const { id } = req.params
        const post = await Post.getById(id);
        res.status(200).json(post);
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: `Error getting post with that ID: ${id}`
        })
    }
});

/* DELETE: api/users/:id */
router.delete('/:id', [ validateUserId ], async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.remove(id);
        req.status(200).json({
            message: `User ${user} with ID: ${id} deleted`
        })
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: `Error deleting user with ID: ${id}`
        })
    }
});

/* PUT: api/users/:id */
router.put('/:id', [ validateUserId, validateUser ], async (req, res) => {
    try {
        const { id } = req.params;
        const update = await User.update(id, req.body);
        res.status(200).json({UserUpdate: `${update}`})
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: `Error updating user with ID: ${id}`
        })
    }
});

//custom middleware

function validateUserId(req, res, next) {
    const { id } = req.params;

    User.getById(id)
    .then(user => {
      if(user) {
        req.user = user;
        res.status(200).json(user);
        next();
      } else {
        res.status(400).json({
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
    const { id } = req.params;

    try{
        if((req.body) && (Object.keys(req.body).length > 0)) {
            res.status(200)
            next();
          } if(((req.body).name === undefined) || (Object.keys(req.body).name.length === 0)) {
              res.status(400).json({
                  message: 'Missing name field required'
              })
              next();
          } else {
            res.status(400).json({
              message: 'Missing user data!'
            })
          }
    }
    catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Error processing that request'
        })
    }
};

function validatePost(req, res, next) {
  const body = req.body;

  if(body && Object.keys(req.body).length > 0) {
    next();
  } else if(((req.body).text === undefined) || (Object.keys(req.body).text.length === 0)) {
    res.status(400).json({
      message: 'Missing required text field'
    })
  }else {
    res.status(500).json({
      message: "Missing post data!"
    })
  }
};

module.exports = router;
