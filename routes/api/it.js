const express = require('express');
const router = express.Router();

//@route    GET api/it
//@desc     Test Route
//@access   Public

router.get('/', (req, res) => res.send('IT route'));

module.exports = router;
