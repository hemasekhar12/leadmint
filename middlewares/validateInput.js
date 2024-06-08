// middlewares/validateInput.js
const { check, validationResult } = require('express-validator');

exports.validateRegistration = [
  check('deviceId').not().isEmpty(),
  check('name').not().isEmpty(),
  check('phone').isMobilePhone(),
  check('password').isLength({ min: 6 }),
  check('availCoins').isInt({ min: 0 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
