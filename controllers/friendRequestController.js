// controllers/friendRequestController.js
const db = require('../config/db');

exports.sendFriendRequest = async (req, res) => {
  const senderId = req.user.userId;
  const { receiverId } = req.body;

  try {
    await db.query('INSERT INTO friend_requests (senderId, receiverId) VALUES (?, ?)', [senderId, receiverId]);
    res.status(201).json({ message: 'Friend request sent!' });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
};
