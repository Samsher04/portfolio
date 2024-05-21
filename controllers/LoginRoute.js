const bcrypt = require("bcrypt");
const User = require("../models/User");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("Request Body:", req.body);

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found");
      return res.status(401).json({ message: "Incorrect username or password." });
    }

    if (!password || !user.password) {
      console.log("Password missing or user has no password");
      return res.status(400).json({ message: "Password missing or invalid." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("Password does not match");
      return res.status(401).json({ message: "Incorrect username or password." });
    }

    const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    return res.status(200).json({ user, token,mess:"successful" });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { loginUser };
