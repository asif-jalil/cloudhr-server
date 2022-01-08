const csv = require("csv-parser");
const fs = require("fs");
let results = [];

module.exports.parseCSV = function (req, res, next) {
  const acceptedColumn = ["firstName", "lastName", "email"];
  fs.createReadStream(`${req.file.destination}${req.file.filename}`)
    .on("error", (error) => {
      fs.unlinkSync(`${req.file.destination}${req.file.filename}`);
      console.log(error);
    })
    .pipe(
      csv({
        mapHeaders: ({ header, index }) => (acceptedColumn.includes(header) ? header : null),
        mapValues: ({ header, index, value }) => (value ? value : null),
      })
    )
    .on("data", (data) => {
      results.push(data);
    })
    .on("end", () => {
      req.csvData = results;
      results = [];
      next();
    });
};
