const mongoose = require("mongoose");
require("dotenv").config();

const DbConnect = () => {
  mongoose
    .connect(process.env.MONGO_DB, {})
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch(() => {
      console.log("Database cannot be connected");
    });
};

module.exports = DbConnect;
