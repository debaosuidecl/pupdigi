// THIS IS THE USER SCHEMA FILE

const mongoose = require('mongoose');

const Actual = new mongoose.Schema({
  phone: {
    type: String,
    required: true
    // unique: true
  },
  name: {
    type: String,
    required: true
    // unique: true
  }
});

module.exports = ActualData = mongoose.model('Actual', Actual); // takes in model name and schema
