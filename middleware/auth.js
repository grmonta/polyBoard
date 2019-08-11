const jwt = require('jsonwebtoken');
const config = require('config');

//middleware function has acces to req, res, and next is a cb that we will run
//when done and will move on to next piece of middelware - like password hasher or something
module.exports = function(req, res, next) {
  //get token from header
  const token = req.header('x-auth-token');

  //Check if no toke
  if (!token) {
    return res.status(401).json({ msg: 'no token, authorization denied' });
  }

  //verify token if one
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    //take req object and set a value to user
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
