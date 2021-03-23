/* ******************** routes/like.routes.js ******************** */

// imports
const router = require('express').Router();
const likeController = require('../controllers/like.controller');

// routes
router.patch('/:id/like-post/:liker', likeController.likePost);
router.delete('/:id/unlike-post/:liker', likeController.deleteLike);
router.get('/read-like-post', likeController.readLikePost);

// exports
module.exports = router;
