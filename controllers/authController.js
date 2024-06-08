// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.register = async (req, res) => {
  const { deviceId, name, phone, password, availCoins } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const [rows] = await db.query(
      'INSERT INTO users (deviceId, name, phone, password, availCoins) VALUES (?, ?, ?, ?, ?)',
      [deviceId, name, phone, hashedPassword, availCoins]
    );

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
};
// controllers/authController.js
exports.login = async (req, res) => {
    const { phone, password } = req.body;
  
    try {
      const [rows] = await db.query('SELECT * FROM users WHERE phone = ?', [phone]);
      const user = rows[0];
  
      if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ userId: user.userId, isPrime: user.isPrime }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(200).json({ token });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Database error' });
    }
  };
  