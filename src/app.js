const express = require("express");
const cors = require("cors");
const logger = require("morgan");
require("dotenv").config({ path: `${__dirname}/../.env` });
const db = require("./db/db");
const employeesRouter = require("./routes/employees");
const app = express();

db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Re sync done!");
  })
  .catch((err) => console.trace(err));

// app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/employees", employeesRouter);

app.use((error, req, res, next) => {
  // if (res.headerSent) {
  //   next("There was a problem");
  // } else {
  //   res.status(error.status || 500);
  //   res.json({
  //     error: {
  //       status: error.status || 500,
  //       message: error.message,
  //     },
  //   });
  // }
	res.status(error.status || 500);
    res.json({
      error: {
        status: error.status || 500,
        message: error.message,
      },
    });
});

module.exports = app;
