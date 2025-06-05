const express= require("express");
const { registerUser, loginUser, getUserInfo } = require("../controllers/authController");
const { protect } = require("../midllewares/authMiddleware");
const upload = require("../midllewares/uploadMiddleware");

const router = express.Router();

// Route for user registration
router.post("/register", registerUser);

// Route for user login
router.post("/login", loginUser);

// Route for getting user information
router.get("/getuser",protect, getUserInfo);

router.post("/upload-image",upload.single("image"), (req, res) => {
    try {
    return res.json({
      message: "Upload successful",
      imageUrl: req.file.path, // Cloudinary URL
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Upload failed" });
  }
});

module.exports = router;