const csvSplitStream = require('csv-split-stream');
const fs = require('fs');
return csvSplitStream
  .split(
    fs.createReadStream('new.csv'),

    {
      lineLimit: 100000
    },

    index => fs.createWriteStream(`./verizon/new-${index + 1}.csv`)
  )
  .then(csvSplitResponse => {
    console.log('csvSplitStream succeeded', csvSplitResponse);
  })
  .catch(csvSplitError => {
    console.log('csvSplitStreamFailed', csvSplitError);
  });
