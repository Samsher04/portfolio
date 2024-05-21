const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  job_title: {
    type: String,
  },
  phone: {
    type: String,
  },
  location: {
    type: String,
  },
  birthday: {
    type: String,
  },

  avatar: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
