const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const StockItem = require('../../models/StockItem');
const User = require('../../models/User');

const Profile = require('../../models/Profile');

//@route    POST api/stock
//@desc     Create an out of stock itme
//@access   Private

router.post(
  '/',
  [
    auth,
    [
      check('itemNumber', 'Item number is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      //if stock item exist
      //if a stockItem is found

      //create a new object

      const newStockItem = new StockItem({
        itemNumber: req.body.itemNumber,

        createdDate: req.body.createdDate,

        name: user.name,
        user: req.user.id
      });

      const stockItem = await newStockItem.save();

      //once it's save make sure to send it
      res.json(stockItem);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route    GET api/stock
//@desc     Get all posts
//@access   Private

router.get('/', auth, async (req, res) => {
  try {
    const stockItems = await StockItem.find().sort({ date: -1 });
    res.json(stockItems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    GET api/stock/:id
//@desc     Get single stock item by ID
//@access   Private

router.get('/:id', auth, async (req, res) => {
  try {
    const stockItem = await StockItem.findById(req.params.id);
    if (!stockItem) {
      return res.status(404).json({ msg: 'stock request not found' });
    }

    res.json(stockItem);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'stock request  not found' });
    }
    res.status(500).send('Server Error');
  }
});

//@route    Delete api/stock
//@desc     Delete a posts
//@access   Private

router.delete('/:id', auth, async (req, res) => {
  try {
    const stockItem = await StockItem.findById(req.params.id);

    await stockItem.remove();
    res.json({ msg: 'item removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'outage not found' });
    }
    res.status(500).send('Server Error');
  }
});

//@route    POST api/stock/notes/:id
//@desc     Adding notes to Stock Post
//@access   Private

router.post(
  '/notes/:id',

  auth,

  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      const stockItem = await StockItem.findById(req.params.id);

      //if stock item exist
      //if a stockItem is found

      //create a new object

      const newNote = {
        issue: req.body.issue,
        inStockDate: req.body.inStockDate,
        name: user.name,
        user: req.user.id
      };

      stockItem.notes.unshift(newNote);

      await stockItem.save();

      //once it's save make sure to send it
      res.json(stockItem.notes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/sstock/note/:id/:note_id
// @desc     Delete comment
// @access   Private
router.delete('/notes/:id/:notes_id', auth, async (req, res) => {
  try {
    const stockItem = await StockItem.findById(req.params.id);

    // Pull out note
    const notes = stockItem.notes.find(
      notes => notes.id === req.params.notes_id
    );

    // Make sure note exists
    if (!notes) {
      return res.status(404).json({ msg: 'Notes do not exist' });
    }

    // Get remove index
    const removeIndex = stockItem.notes
      .map(note => notes.id)
      .indexOf(req.params.notes_id);

    stockItem.notes.splice(removeIndex, 1);

    await stockItem.save();

    res.json(stockItem.notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
