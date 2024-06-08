// routes/chatroomRoutes.js
const express = require('express');
const { createChatRoom } = require('../controllers/chatroomController');
const { authenticateJWT, ensurePrimeMember } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/api/chatrooms', authenticateJWT, ensurePrimeMember, createChatRoom);

module.exports = router;
