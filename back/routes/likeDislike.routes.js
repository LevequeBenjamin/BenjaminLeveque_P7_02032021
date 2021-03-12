/* ******************** likeDislike.routes ******************** */

// imports
const router = require('express').Router();
const likeController = require('../controllers/like.controller');

// routes
router.patch('/like-post/:id', likeController.likePost);
router.patch('/unlike-post/:id', likeController.deleteLike);
router.get('/read-like-post', likeController.readLikePost);

// exports
module.exports = router;