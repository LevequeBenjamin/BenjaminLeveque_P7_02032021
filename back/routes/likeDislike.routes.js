/* ******************** likeDislike.routes ******************** */

// imports
const router = require('express').Router();
const likeController = require('../controllers/like.controller');
const disLikeController = require('../controllers/dislike.controller')

// routes
router.patch('/like-post/:id', likeController.likePost);
router.patch('/dislike-post/:id', disLikeController.dislikePost);
router.patch('/unlike-post/:id', likeController.deleteLike);
router.patch('/undislike-post/:id', disLikeController.deleteDisLike);

// exports
module.exports = router;