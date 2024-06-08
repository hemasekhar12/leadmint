// routes/inviteRoutes.js
const express = require('express');
const { inviteParticipant, joinRoom } = require('../controllers/inviteController');
const { authenticateJWT } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/api/invite', authenticateJWT, inviteParticipant);
router.post('/api/joinroom', authenticateJWT, joinRoom);

module.exports = router;
