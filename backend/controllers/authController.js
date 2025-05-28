const jwt= require('jsonwebtoken');
const User = require('../models/User');
//generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
};

//register user
exports.registerUser = async (req, res) => {
    const { fullName, email, password, profileImageurl } = req.body || {};

    // Validate input
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    try {
        // Create new user
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageurl,
        });

        // Generate JWT token
        const token = generateToken(user._id);

        res.status(201).json({
            id: user._id,
            user,
            token,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

//login user

exports.loginUser = async (req, res) => {
    const { email, password } = req.body || {};

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = generateToken(user._id);

        res.status(200).json({
            id: user._id,
            user,
            token,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

// Get user info
exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            id: user._id,
            user,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
