const UserData = require("../models/User");
const Project = require("../models/Project");
const Skill = require("../models/Skill");
const About = require("../models/About");
const Socail = require("../models/Socail");
const bcrypt = require("bcrypt");
require("dotenv").config();

const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  } catch (error) {
    console.error("Error hashing password:", error);
    throw new Error("Error hashing password");
  }
};

const registerUser = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const { name, email, password, job_title, phone, location, birthday } =
      req.body;

    const hashedPassword = await hashPassword(password);

    const newUser = new UserData({
      name,
      email,
      password: hashedPassword,
      job_title,
      phone,
      location,
      birthday,
      avatar: req.file ? req.file.filename : undefined,
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: savedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error registering user",
      error: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    console.log(req.body.user_id);
    const { name, email, job_title, phone, location, birthday } = req.body;

    const updatedUserData = await UserData.findByIdAndUpdate(
      req.body.user_id,
      {
        name,
        email,
        job_title,
        phone,
        location,
        birthday,
        avatar: req.file ? req.file.filename : undefined,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Profile updated successfully",
      updatedUserData,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const Projuct = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const { title, dis, tool, pro_url } = req.body;

    const myProject = new Project({
      title,
      dis,
      tool,
      pro_url,
      image: req.file ? req.file.filename : undefined,
      user: req.body.user_id,
    });

    const savedProject = await myProject.save();

    res.status(201).json({
      message: "Project Created Successfully",
      project: savedProject,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Project Created",
      error: error.message,
    });
  }
};

const updateProject = async (req, res) => {
  try {
    console.log(req.body.user_id);
    const { title, dis, tool, pro_url } = req.body;

    const updatedUserData = await Project.findByIdAndUpdate(
      req.body.user_id,
      {
        title,
        dis,
        tool,
        pro_url,
        image: req.file ? req.file.filename : undefined,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Product updated successfully",
      updatedUserData,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const NewSkill = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const { Skill_Description } = req.body;

    const MySkill = new Skill({
      Skill_Description,
      Skill_Img: req.file ? req.file.filename : undefined,
      user: req.body.user_id,
    });

    const saveMySkill = await MySkill.save();

    res.status(201).json({
      message: "Skill Created Successfully",
      Skills: saveMySkill,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Skill Created",
      error: error.message,
    });
  }
};

const updateSkill = async (req, res) => {
  try {
    console.log(req.body.user_id);
    const { Skill_Description } = req.body;

    const updatedSkill = await Skill.findByIdAndUpdate(
      req.body.user_id,
      {
        Skill_Description,
        Skill_Img: req.file ? req.file.filename : undefined,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Product updated successfully",
      updatedSkill,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const MyAbout = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const { my_self, my_journey, user_id } = req.body;
    const my_pic = req.file ? req.file.filename : undefined;

    let about = await About.findOne({ user: user_id });

    if (about) {
      about.my_self = my_self;
      about.my_journey = my_journey;
      if (my_pic) {
        about.my_pic = my_pic;
      }
    } else {

      about = new About({
        my_self,
        my_journey,
        my_pic,
        user: user_id,
      });
    }

    const savedAbout = await about.save();

    res.status(201).json({
      message: about.isNew ? "About Created Successfully" : "About Updated Successfully",
      about: savedAbout,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating or updating About",
      error: error.message,
    });
  }
};


const updateAbout = async (req, res) => {
  try {
    console.log(req.body.user_id);
    const { my_self, my_journey } = req.body;

    const updatedUserData = await About.findByIdAndUpdate(
      req.body.user_id,
      {
        my_self,
        my_journey,
        my_pic: req.file ? req.file.filename : undefined,
      },
      { new: true }
    );

    res.status(200).json({
      message: "About updated successfully",
      updatedUserData,
    });
  } catch (error) {
    console.error("Error updating About:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const MySocail = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const { instagram, facebook, linkedin, behance, user_id } = req.body;

    if (!instagram || !facebook || !linkedin || !behance || !user_id) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }


    let socail = await Socail.findOne({ user: user_id });

    if (socail) {

      socail.instagram = instagram;
      socail.facebook = facebook;
      socail.linkedin = linkedin;
      socail.behance = behance;
    } else {

      socail = new Socail({
        instagram,
        facebook,
        linkedin,
        behance,
        user: user_id,
      });
    }

    const savedSocail = await socail.save();

    res.status(201).json({
      message: socail.isNew ? "Socail Created Successfully" : "Socail Updated Successfully",
      socail: savedSocail,
    });
  } catch (error) {
    console.error("Error creating or updating social media links:", error);
    res.status(500).json({
      message: "Error creating or updating social media links",
      error: error.message,
    });
  }
};






const updateSocail = async (req, res) => {
  try {
    console.log(req.body.user_id);
    const { instagram, facebook, linkedin, behance, } = req.body;

    const updatedSocail = await Socail.findByIdAndUpdate(
      req.body.user_id,
      {
        instagram,
        facebook,
        linkedin,
        behance,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Product updated successfully",
      updatedSocail,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const user_data = async (req, res) => {
  const userId = req.params.userId;
  console.log(userId);
  try {
    const users = await UserData.findById(userId).select("-password");
    if (!users) {
      return res.status(404).json({ error: "User not found" });
    }
    const posts = await Project.find({ user: userId }).populate("user");
    const Skills = await Skill.find({ user: userId }).populate("user");
    const Socails = await Socail.find({ user: userId }).populate("user");
    const Abouts = await About.find({ user: userId }).populate("user");

    res.json({ posts, Skills, Socails, Abouts, users });
  } catch (error) {
    console.error("Error fetching user data and projects:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  registerUser,
  updateProfile,
  Projuct,
  updateProject,
  NewSkill,
  updateSkill,
  MyAbout,
  updateAbout,
  MySocail,
  updateSocail,
  user_data,
};
