let express = require('express');
let router = express.Router();

// Define a route to handle a GET request for posts
router.get('/', function(req, res, next) {
    // Replace this with your actual data or logic to retrieve posts
    const posts = [
        { title: 'Post 1', description: 'Description 1' },
        { title: 'Post 2', description: 'Description 2' },
        // Add more posts here
    ];

    res.json(posts);
});

module.exports = router;
