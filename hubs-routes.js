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
        };
    } else {
        res.status(400).json({ 
            errorMessage: "Please provide title and contents for the post." 
        });
    }
});

module.exports = route;