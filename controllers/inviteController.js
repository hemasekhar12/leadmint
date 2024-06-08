// controllers/inviteController.js
const db = require('../config/db');
const jwt = require('jsonwebtoken');

exports.inviteParticipant = async (req, res) => {
  const { roomId, userId } = req.body;
  const inviterId = req.user.userId;

  try {
    const token = jwt.sign({ roomId, userId }, 'invite_secret', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error generating invite token' });
  }
};

exports.joinRoom = async (req, res) => {
  const { token } = req.body;

  try {
    const decoded = jwt.verify(token, 'invite_secret');
    const { roomId, userId } = decoded;

    const [roomRows] = await db.query('SELECT * FROM chatrooms WHERE roomId = ?', [roomId]);
    if (roomRows.length === 0) return res.status(404).json({ error: 'Room not found' });

    const [userRows] = await db.query('SELECT * FROM users WHERE userId = ?', [userId]);
    if (userRows.length === 0) return res.status(404).json({ error: 'User not found' });

    // Check room capacity
    const [participantRows] = await db.query('SELECT COUNT(*) as count FROM participants WHERE roomId = ?', [roomId]);
    if (participantRows[0].count >= 6) return res.status(403).json({ error: 'Room is full' });

    // Add participant to room
    await db.query('INSERT INTO participants (roomId, userId) VALUES (?, ?)', [roomId, userId]);
    res.status(200).json({ message: 'Joined room successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error joining room' });
  }
};
