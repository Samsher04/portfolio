const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const skillSchema = new mongoose.Schema({
  Skill_Description: {
    type: String,
  },
  Skill_Img: {
    type: String,

  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Skill", skillSchema);
