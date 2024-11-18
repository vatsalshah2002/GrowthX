const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access denied.');
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'user') throw new Error('Unauthorized.');
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
};

const authenticateAdmin = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access denied.');
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') throw new Error('Unauthorized.');
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
};

module.exports = { authenticateUser, authenticateAdmin };

