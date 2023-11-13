var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const posts = [
    { title: 'Post 1', description: 'Description 1' },
    { title: 'Post 2', description: 'Description 2' },
    // Add more posts here
  ];

  res.json(posts);});
router.get('/1', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
