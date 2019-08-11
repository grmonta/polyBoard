const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },

  bio: {
    type: String
  },
  birthday: {
    type: String
  },
  extension: {
    type: Number
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
