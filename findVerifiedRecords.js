const express = require('express');
const app = express();
const Phones = require('./model/PhoneReal');
const Actual = require('./model/ActualData');
const connectDB = require('./config/db.js');
const { Parser } = require('json2csv');
const fs = require('fs');
const fsExtra = require('fs-extra');

const c2j = async () => {
  const fields = ['phone', 'name'];
  // await Actual.updateMany({ name: 'NO RECORD FOUND!' }, { name: 'Hey' });
  // console.log('updated');
  const allActual = await Actual.find({}).select('phone name -_id');
  console.log(allActual);
  const json2csvParser = new Parser({ fields });
  // return;
  const csv = json2csvParser.parse(allActual);
  // console.log(csv);
  fs.writeFile('new.csv', csv, err => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log('csv saved!');
  });
  // json to csv
};
connectDB();

c2j();
