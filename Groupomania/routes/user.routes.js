/* ******************** routes/user.routes.js ******************** */

// imports
const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const bruteForceReg = require('../middleware/bruteForceReg.middleware');
const bruteForceLog = require('../middleware/bruteForceLog.middleware');

// auth routes
router.post('/register', bruteForceReg, authController.signUp);
router.post('/login', bruteForceLog, authController.login);
router.get('/logout', authController.logout);

// user routes
router.get('/:id', userController.getUser);
router.get('/', userController.getAllUsers);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

// exports
module.exports = router;
