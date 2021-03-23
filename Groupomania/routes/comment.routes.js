/* ******************** routes/comment.routes.js ******************** */

// imports
const router = require('express').Router();
const commentController = require('../controllers/comment.controllers');

// routes
router.patch('/:id/comment-post/:userId', commentController.commentPost);
router.get('/read-comment-post', commentController.readCommentPost);
router.patch('/comment-post/:id', commentController.updatePost);
router.delete('/:postId/delete-comment-post/:id', commentController.deleteCommentPost);

// exports 
module.exports = router;