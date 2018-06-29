const fs = require('fs');
const path = require('path');
const report = require('../complexity/report.json');
const csv = require('fast-csv');

const csvStream = csv.createWriteStream({ headers: true });
const writableStream = fs.createWriteStream(path.join(__dirname, '../complexity/complexity.csv'));

writableStream.on('finish', () => {
  console.log('DONE!');
});

csvStream.pipe(writableStream);

report.reports.forEach((r) => {
  csvStream.write({
    Complexity: r.complexity.aggregate.complexity.cyclomatic,
    Product: 'react-components',
    File: r.info.file,
  });
});

csvStream.end();

