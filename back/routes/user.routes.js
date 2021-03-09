/* ******************** user.routes ******************** */

// imports
const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');

// auth routes
router.post('/register', authController.signUp);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

// user routes
router.get('/:id', userController.getUser);
router.get('/', userController.getAllUsers);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

// exports
module.exports = router;
