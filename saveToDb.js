const fsExtra = require('fs-extra');
const connectDB = require('./config/db.js');
const csv = require('csv-parser');

const express = require('express');
const app = express();
const fs = require('fs');

const Names = require('./model/PhoneToVerify');
const saveToDbPhone = async row => {
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
};
const savePhones = () => {
  let i = 1;
  fs.createReadStream('VerizonNew.csv')
    .pipe(csv())
    .on('data', async row => {
      await saveToDbPhone(row);
      // setTimeout(() => saveToDbPhone(row), 1000);
      // console.log(row);
      // if (i < 858411) {
      //   console.log('no', i);
      // } else {
      //   console.log('transfer');
      //   await fsExtra.appendFile(
      //     'VerizonNew.csv',
      //     `"${row['Phone']}","${row['FirstName']}",${row['TimeZone']},${row['Gender']}\n`
      //   );
      // }
      // i++;
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
