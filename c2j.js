const csv = require('csvtojson');
const PhoneReal = require('./model/PhoneReal');
const connectDB = require('./config/db.js');

const c2j = async () => {
  connectDB();
  console.log('start');
  for (i = 6; i <= 26; i++) {
    const jsonArray = await csv().fromFile(`./verizon/new-${i}.csv`);
    console.log('file to test ', `./verizon/new-${i}.csv`);

    console.log(jsonArray);
    // JSON.stringify(jsonArray);
    try {
      console.log('trying inserting all');
      await PhoneReal.collection.insertMany(jsonArray);
      console.log('success');
    } catch (error) {
      console.log(error);
    }
  }
};

c2j();
