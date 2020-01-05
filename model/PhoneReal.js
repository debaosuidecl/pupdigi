// THIS IS THE USER SCHEMA FILE

const mongoose = require('mongoose');

const PhoneReal = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = PhoneRealData = mongoose.model('phoneReal', PhoneReal); // takes in model name and schema
