const express= require("express");
const { registerUser, loginUser, getUserInfo } = require("../controllers/authController");
const { protect } = require("../midllewares/authMiddleware");

const router = express.Router();

// Route for user registration
router.post("/register", registerUser);

// Route for user login
router.post("/login", loginUser);

// Route for getting user information
router.get("/getuser",protect, getUserInfo);

module.exports = router;