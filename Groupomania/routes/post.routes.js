/* ******************** routes/post.routes.js ******************** */

// imports
const router = require('express').Router();
const postController = require('../controllers/post.controller');
const multer = require('multer');
const upload = multer();

// routes
router.get('/', postController.readPost);
router.get('/read-one-post/:id', postController.readOnePost);
router.post('/', upload.single('file'), postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

// exports
module.exports = router;