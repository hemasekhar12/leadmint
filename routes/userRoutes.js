// routes/userRoutes.js
const express = require('express');
const { viewProfile } = require('../controllers/profileController');
const { sendFriendRequest } = require('../controllers/friendRequestController');
const { authenticateJWT } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/api/profile/:userId', authenticateJWT, viewProfile);
router.post('/api/friend-requests', authenticateJWT, sendFriendRequest);

module.exports = router;
