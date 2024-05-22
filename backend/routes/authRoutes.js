import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; // Import bcrypt

import User from '../models/User.js'; 

const router = express.Router();

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const payload = {
        user: {
          id: user._id,
          role: user.role,
        },
      };

      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
        if (err) throw err;
        // Send additional user data along with the token
        res.json({
          token,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            joinedDate: user.createdAt,
            stats: user.stats,
          },
        });
      });
    } else {
      res.status(401).json("Invalid Username or Password");
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json('Server error');
  }
});

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json("User Already Exists");
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword, // Save the hashed password
      role,
    });

    // Generate a token for the newly registered user
    const payload = {
      user: {
        id: user._id,
        role: user.role,
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
      if (err) throw err;
      // Send additional user data along with the token
      res.status(201).json({
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          joinedDate: user.createdAt,
          stats: {
            totalRuns: 0,
            successfulRuns: 0,
            failedRuns: 0,
            lastActive: Date.now(),
          },
        },
      });
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json('Server error');
  }
});

export default router;
