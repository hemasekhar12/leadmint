// routes/authRoutes.js
const express = require('express');
const { register, login } = require('../controllers/authController');
const { validateRegistration } = require('../middlewares/validateInput');
const router = express.Router();

router.post('/api/register', validateRegistration, register);
router.post('/api/login', login);

module.exports = router;
