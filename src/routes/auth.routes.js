const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/auth.middleware');
const { register, login, getCurrentUser } = require('../controllers/auth.controller');

router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticateToken, getCurrentUser);

module.exports = router;
