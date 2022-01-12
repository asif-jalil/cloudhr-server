const express = require("express");
const cors = require("cors");
const logger = require("morgan");
require("dotenv").config({ path: `${__dirname}/../.env` });
const db = require("./db/db");
const employeesRouter = require("./routes/employees");
const app = express();

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Re sync done!");
  })
  .catch((err) => console.trace(err));

// Using middleware
app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Using routing middleware
app.use("/employees", employeesRouter);


// Error handling middleware
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
