// THIS IS THE USER SCHEMA FILE

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  twitterpassword: {
    type: String,
    required: true
    // unique: true
  },
  outlookpwd: {
    type: String,
    required: true
  }
});

module.exports = UserData = mongoose.model('userdataPuppeteer', UserSchema); // takes in model name and schema
