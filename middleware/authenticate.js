const jwt = require('jsonwebtoken');
const config = require('./config'); 

function authenticateJWT(req, res, next) {
  const token = req.header('Authenticate'); 

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    console.log("token",decoded)
    req.user = decoded;
   
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token.' });
  }
}

module.exports = authenticateJWT;
