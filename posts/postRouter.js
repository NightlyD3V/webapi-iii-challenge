const express = require('express');

const router = express.Router();

const Post = require('./postDb.js');

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

router.get('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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

router.put('/:id', (req, res) => {
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

};

module.exports = router;