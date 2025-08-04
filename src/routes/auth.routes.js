const express = require('express');
const router = express.Router();
const { Auth } = require('../middlewares/auth.middleware');
const { register, login, getCurrentUser, getRoles } = require('../controllers/auth.controller');
const { Roles } = require('../utils/constants');

router.post('/register', register);
router.post('/login', login);
router.get('/roles', getRoles);
router.get('/me', getCurrentUser);

module.exports = router;
