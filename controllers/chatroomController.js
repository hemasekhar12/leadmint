// controllers/chatroomController.js
const db = require('../config/db');

exports.createChatRoom = async (req, res) => {
  const { name } = req.body;
  const creatorId = req.user.userId;

  try {
    const [rows] = await db.query(
      'INSERT INTO chatrooms (name, creatorId) VALUES (?, ?)',
      [name, creatorId]
    );

    res.status(201).json({ message: 'Chat room created successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
};
