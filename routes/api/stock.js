const express = require('express');
const router = express.Router();

//@route    GET api/stock
//@desc     Test Route
//@access   Public

router.get('/', (req, res) => res.send('stock route'));

module.exports = router;
