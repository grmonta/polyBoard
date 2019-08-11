const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

//@route    GET api/auth
//@desc     Test Route
//@access   Public

router.get('/', auth, async (req, res) => {
  try {
    //save a variable user that you find by id, the select is to not return password
    const user = await User.findById(req.user.id).select('-password');
    //return the user so on front end can access data
    res.json(user);
  } catch (err) {
    console.error(500).send('Server Error');
  }
});

//@route    POST api/auth
//@desc     Authenticate User and send get token to make request to private routes
//@access   Public

router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],

  async (req, res) => {
    //first run the validation and send errors if necessary - you will display req.errors on front end
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //just deconstructing so don't 'have to req.body.name ...etc
    const { email, password } = req.body;

    try {
      //See if User Exists
      let user = await User.findOne({ email });

      //if no user exist will send an error
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      //user is found and password matches

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      //return jsonwebtoken
      //create your payload to send
      const payload = {
        user: {
          id: user.id
        }
      };
      //signture for jwt - takes a secret and send token

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
