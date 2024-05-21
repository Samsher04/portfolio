const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const socailSchema = new mongoose.Schema({
  instagram: {
    type: String,
    required: true,
  },
  facebook: {
    type: String,
    required: true,
  },
  linkedin: {
    type: String,
    required: true,
  },
  behance: {
    type: String,
    required: true,
  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Socail", socailSchema);
