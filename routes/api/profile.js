const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

//@route    GET api/profile/me
//@desc     Get current user's profile
//@access   Private

router.get('/me', auth, async (req, res) => {
  try {
    //profile in this request is find the one user with the id, and and get the user name part
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name']
    );

    //if no profile return an error that can display on front ened
    if (!profile) {
      return res
        .status(400)
        .json({ msg: 'There is not a profile for this user' });
    }
    //if there is a profile return it
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
