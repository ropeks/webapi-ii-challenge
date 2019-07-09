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
            console.log(error);
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

module.exports = route;