// controllers/profileController.js
const db = require('../config/db');

exports.viewProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE userId = ?', [userId]);
    if (rows.length === 0) return res.status(404).json({ error: 'User not found' });

    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
};
