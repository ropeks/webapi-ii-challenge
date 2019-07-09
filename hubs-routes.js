const express = require('express');
const db = require('./data/db');
const route = express.Router();

route.post('/', async (req, res) => {
    const { title, contents } = req.body;
    if ( title && contents ) {
        try {
            const posts = await db.insert(req.body);
            res.status(201).json(posts);
        } catch (error) {
            res.status(500).json({ 
                error: "There was an error while saving the post to the database" 
            });
        }
    } else {
        res.status(400).json({ 
            errorMessage: "Please provide title and contents for the post." 
        });
    }
});

route.post('/:id/comments', async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    const commentInfo = { ...req.body, post_id: id };
    // const post = await db.findById(id);
    // if (!post) {
    //     res.status(404).json({
    //         message: "The post with the specified ID does not exist."
    //     });
    // } else 
    if (!text) {
        res.status(400).json({
            errorMessage: "Please provide text for the comment."
        });
    } else {
        try {
            const comment = await db.insertComment(commentInfo);
            res.status(201).json(comment);
        } catch {
            res.status(500).json({
                error: "There was an error while saving the comment to the database"
            });
        }
    }
})

route.get('/', async (req, res) => {
    try {
        const posts = await db.find();
        res.status(200).json(posts);
    } catch {
        res.status(500).json({
            error: "The posts information could not be retrieved."
        });
    }
})

route.get('/:id', async (req, res) => {
    try {
        const post = await db.findById(req.params.id);
        if (post) {
           res.status(200).json(post); 
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        }
    } catch {
        res.status(500).json({
            error: "The posts information could not be retrieved."
        });
    }
})

route.get('/:id/comments', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await db.findById(id);
        if (post) {
            const comments = await db.findPostComments(id);
            res.status(200).json(comments);
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            });
        }
    } catch {
        res.status(500).json({
            error: "The comments information could not be retrieved."
        });
    }
});

route.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await db.remove(id);
        if (post > 0) {
            res.status(200).json({
                message: "The post has been removed."
            });
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            });
        }
    } catch {
        res.status(500).json({
            error: "The post could not be removed"
        });
    }
});

module.exports = route;