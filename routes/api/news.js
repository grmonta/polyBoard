const express = require('express');
const router = express.Router();

//@route    GET api/news
//@desc     Test Route
//@access   Public

router.get('/', (req, res) => res.send('news route'));

module.exports = router;
