import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; // Import bcrypt

import User from '../models/User.js'; 

const router = express.Router();


router.post('/login', async (req, res) => {
  const { email, password,userType } = req.body;
  console.log(userType);
  
  try {
    const user = await User.findOne({ email });
    // console.log(user.role,userType);
    if (user && (await user.matchPassword(password)) && user.role==userType) {
      const payload = {
        user: {
          id: user._id,
          name:user.name,
          role: user.role,
          joined:user.createdAt,
          stats:user.stats,
          batches:user.batches
        },
      };

      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3d' }, (err, token) => {
        if (err) throw err;
        // Send additional user data along with the token
        res.json({token});
      });
    } else {
      res.status(401).json("Invalid Username or Password");
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json('Server error');
  }
});


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
        name:user.name,
        role: user.role,
        joined:user.createdAt,
        stats:user.stats,
        batches:user.batches
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3d' }, (err, token) => {
      if (err) throw err;
      // Send additional user data along with the token
      res.status(201).json({token});
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json('Server error');
  }
});

export default router;
