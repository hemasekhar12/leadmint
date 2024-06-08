// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

exports.authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');

  if (token) {
    jwt.verify(token, 'your_jwt_secret', (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

exports.ensurePrimeMember = (req, res, next) => {
  if (req.user.isPrime) {
    next();
  } else {
    res.status(403).json({ error: 'Only prime members can perform this action' });
  }
};
