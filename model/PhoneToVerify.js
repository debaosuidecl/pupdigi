// THIS IS THE USER SCHEMA FILE

const mongoose = require('mongoose');

const PhoneNumberToVerify = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = PhoneNumberToVerifyData = mongoose.model(
  'phoneNumberPuppeteer',
  PhoneNumberToVerify
); // takes in model name and schema
