const express = require('express');
const router = express.Router();
const { login, refresh, logout } = require('./authController');

router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', logout);

module.exports = router;