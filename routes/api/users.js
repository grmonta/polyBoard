const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

//@route    POST api/users
//@desc     Register User
//@access   Public

router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more passwords'
    ).isLength({ min: 6 })
  ],

  async (req, res) => {
    //first run the validation and send errors if necessary - you will display req.errors on front end
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //just deconstructing so don't 'have to req.body.name ...etc
    const { name, email, password } = req.body;

    try {
      //See if User Exists
      let user = await User.findOne({ email });

      //if user exist will send an error
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      //create an instance of a user - you will save after usings user.save()
      user = new User({
        name,
        email,
        password
      });

      //get encrypt password - use await to whatever returns a promise
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
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
