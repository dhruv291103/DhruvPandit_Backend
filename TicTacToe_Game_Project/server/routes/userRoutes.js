const express = require('express');
const userController = require('../controllers/userControllers');
const router = express.Router();

router.post('/register', userController.register);
router.get('/checkUsername', userController.checkUsername);
router.post('/login', userController.login);
router.get('/validateToken', userController.validateToken);

module.exports = router;
