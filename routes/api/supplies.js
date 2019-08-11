const express = require('express');
const router = express.Router();

//@route    GET api/supplies
//@desc     Test Route
//@access   Public

router.get('/', (req, res) => res.send('supplies route'));

module.exports = router;
