const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const aboutSchema = new mongoose.Schema({
  my_pic: {
    type: String,
  },
  my_self: {
    type: String,
    required: true,
  },
  my_journey: {
    type: String,
    required: true,
  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("About", aboutSchema);
