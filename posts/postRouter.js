const express = require('express');

const router = express.Router();

const Post = require('./postDb.js');

/* GET: /api/posts/ */ 
router.get('/', async (req, res) => {
    try {
        const posts = await Post.get();
        res.status(200).json(posts);
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Error getting posts!'
        })
    }
});

/* GET: /api/posts/:id */
router.get('/:id', [ validatePostId ], async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.getById(id);
        res.status(200).json(post);
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: `Error getting post with ID: ${id}`
        })
    }
});

/* DELETE: /api/posts/:id */
router.delete('/:id', [ validatePostId ], async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.remove(id);
        res.status(200).json({Post: `${post} deleted!`})
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: `Error deleting post with ID: ${id}`
        })
    }
});

/* PUT: /api/posts/:id */
router.put('/:id', [ validatePostId ], async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.update(id);
        res.status(200).json({Post: `${post} updated!`})
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: `Error updating post with ID: ${id}`
        })
    }
});

// custom middleware

function validatePostId(req, res, next) {
    const { id } = req.params;

    Post.getById(id)
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

module.exports = router;