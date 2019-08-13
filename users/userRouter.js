const express = require('express');
const User = require('./userDb.js');
const Post = require('../posts/postDb.js');
const router = express.Router();

router.post('/', async (req, res) => {
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

router.get('/:id', async (req, res) => {
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

router.get('/:id/posts', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.getById(id);
        req.status(200).json({
            message: `User with ID: ${id} deleted`
        })
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: `Error deleting user with ID: ${id}`
        })
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const update = await User.update(id);
        res.status(200).json({UserUpdate: `${update}`})
    }
});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
