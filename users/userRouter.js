const express = 'express';
const User = require('./users/userDb.js');
const Post = require('../posts/postDb.js');
const router = express.Router();

router.post('/', async (req, res) => {
    
});

router.post('/:id/posts', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.getById(id);
        res.status(200).json(post.body)
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: `Error getting post with that ID: ${id}`
        })
    }
});

router.get('/', (req, res) => {
    try {
        const users = await User.get();
        res.status(200).json(users.body)
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Error getting users!'
        })
    }
});

router.get('/:id', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
