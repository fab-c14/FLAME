import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; 


const router = express.Router();

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const payload = {
      user: {
        id: user._id,
        role: user.role
      }
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } else {
    res.status(401).json("Invalid Username or Passowrd");
  }
});

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
router.post('/register',async (req, res) => {
  const { name, email, password, role } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json("User Already Exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
  }); // if the database is ready

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(400).json('Invalid user data');
  }
});

export default router;
