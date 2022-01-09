const express = require("express");
const cors = require("cors");
const logger = require("morgan");
require("dotenv").config({ path: `${__dirname}/../.env` });
const db = require("./db/db");
const employeesRouter = require("./routes/employees");
const app = express();
// const fs = require("fs");

// async function writeFile(path) {
//   try {
//     const writeStream = fs.createWriteStream(path, {
//       flags: "w",
//     });

//     const letters = [
//       "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
//     ];

// 		for (let index = 0; index < 10000; index++) {
// 			const fName = await makeRandomName(letters);
// 			const lName = await makeRandomName(letters);
//       writeStream.write(`${fName},${lName},email${index}@mail.com\n`, (err) => {
//         if (err) throw err;
//         if (index === 10000 - 1) writeStream.end(); //I attempted close() and destroy() too, none worked
//       });
//     }

//     writeStream.on("finish", () => {
//       console.log("All files were written."); //Currently being emmited before all is written.
//     });
//   } catch (err) {
//     throw err;
//   }
// }

// writeFile("./src/assets/upload.csv");


// function getRandomInt(min, max) {
//   min = Math.ceil(min);
// 	max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
// }

// function makeRandomName(letters) {
// 	let name = "";
// 	for (let i = 0; i < 6; i++) {
// 		const letterIndex = getRandomInt(0, 26);
// 		name = 	name + letters[letterIndex]
// 	}

// 	return name;
// }



db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Re sync done!");
  })
  .catch((err) => console.trace(err));

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/employees", employeesRouter);

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      status: error.status || 500,
      message: error.message,
    },
  });
});

module.exports = app;
