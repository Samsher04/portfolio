const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const projectSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  dis: {
    type: String,
    required: true,
  },
  pro_url: {
    type: String,
    required: true,
  },
  tool: [
    {
      type: String,
    required: true,
    }
  ],
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Project", projectSchema);
