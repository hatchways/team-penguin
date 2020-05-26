const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema( {
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true,
    default: 'English'
  },
  referral_id: {
    type: mongoose.Types.ObjectId,
    default: mongoose.Types.ObjectId()
  }
});

module.exports = mongoose.model('User', userSchema);