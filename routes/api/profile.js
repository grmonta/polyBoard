const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Project = require('../../models/Project');

//@route    GET api/profile/me
//@desc     Get current user's profile
//@access   Private

router.get('/me', auth, async (req, res) => {
  try {
    //profile in this request is find the one user with the id, and and get the user name part
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'email']
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

//@route    POST api/profile
//@desc     Create or update user profile
//@access   Private

router.post(
  '/',
  [
    auth,
    [
      check('color', 'Favorite Color is required')
        .not()
        .isEmpty(),
      check('title', 'Job title is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, color, bio, birthday, extension } = req.body;

    //build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (title) profileFields.title = title;
    if (color) profileFields.color = color;
    if (bio) profileFields.bio = bio;
    if (birthday) profileFields.birthday = birthday;
    if (extension) profileFields.extension = extension;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      //if a profile is found
      if (profile) {
        //update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }

      //create profile
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route    GET api/profile
//@desc     Get all profiles
//@access   Public

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'email']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    GET api/profile/user/:user_id
//@desc     Get profile by user ID
//@access   Public

router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'email']);

    //if no profile send a message
    if (!profile) return res.status(400).json({ msg: 'Profile not found' });
    //else return profiles
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

//@route    DELETE api/profile
//@desc     Delete Profile, user & post
//@access   Private

router.delete('/', auth, async (req, res) => {
  try {
    //  @todo = reomove users posts

    // await this.post.deleteMany({ user: req.user.id })

    //remove profile
    await Profile.findOneAndRemove({ user: req.user.id });

    //this will remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
