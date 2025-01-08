const fs = require('fs');
const crypto = require('crypto');

hash = crypto.getHashes();

fs.readFile('data/log_output.txt', (err, data) => {
  if (err) throw err;

  hashData = crypto.createHash('sha256').update(data).digest('hex');

  console.log(hashData);
});
