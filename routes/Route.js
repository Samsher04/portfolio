const express = require("express");
const authenticateToken = require("../middleware/authenticateToken");
const {
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
  user_data
} = require("../controllers/PostRoute");

const { loginUser } = require("../controllers/LoginRoute");
const upload = require("../middleware/multer");

const router = express.Router();

router.post("/user", upload.single("avatar"), registerUser);

router.put("/update", authenticateToken, upload.single("avatar"), updateProfile);

router.post("/project", authenticateToken, upload.single("image"), Projuct);
router.put("/updateProject", authenticateToken, upload.single("image"), updateProject);

router.post("/Skill", authenticateToken, upload.single("Skill_Img"), NewSkill);
router.put("/updateSkill", authenticateToken, upload.single("Skill_Img"), updateSkill);

router.post("/about", authenticateToken, upload.single("my_pic"), MyAbout);
router.put("/updateAbout", authenticateToken, upload.single("my_pic"), updateAbout);

router.post("/MySocail", authenticateToken, MySocail);
router.put("/updateSocail", authenticateToken, updateSocail);

router.get("/userdata/:userId", authenticateToken, user_data);

router.post("/login", loginUser);

module.exports = router;
