const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth.routes'));
router.use('/specialties', require('./specialty.route'));
router.use('/doctors', require('./doctor.route'));

module.exports = router;
