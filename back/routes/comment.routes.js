/* ******************** comment.routes ******************** */

// imports
const router = require('express').Router();
const commentController = require('../controllers/comment.controllers');

// routes
router.patch('/:id/comment-post', commentController.commentPost);
router.get('/read-comment-post', commentController.readCommentPost);
router.delete('/:id/delete-comment-post', commentController.deleteCommentPost);

// exports 
module.exports = router;