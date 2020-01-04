const fsExtra = require('fs-extra');
const connectDB = require('./config/db.js');
const csv = require('csv-parser');

const express = require('express');
const app = express();
const fs = require('fs');

const Names = require('./model/PhoneToVerify');

const savePhones = () => {
  fs.createReadStream('Verizon.csv')
    .pipe(csv())
    .on('data', async row => {
      try {
        let newPhoneData = new Names({
          phone: row['Phone']
        });
        const freshData = await newPhoneData.save();
        console.log(freshData, 'data saved');
        console.log('record saved in database');
      } catch (error) {
        console.log(error);
      }
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
    });
};

let PORT = process.env.PORT || 8080;
connectDB();
app.listen(PORT, () => {
  console.log('listening on PORT ', PORT);
  // savePhones();
  setTimeout(savePhones, 8000);
});
