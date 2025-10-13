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
        // Set token as HttpOnly cookie for secure persistence
        res.cookie('token', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 });
        res.json({ token });
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
      // Set token cookie
      res.cookie('token', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 });
      res.status(201).json({ token });
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json('Server error');
  }
});

// Return current user by verifying token (supports Authorization header Bearer <token>)
router.get('/me', (req, res) => {
  try {
    // Try Authorization header first
    const authHeader = req.headers.authorization;
    let token = null;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }
    // If no token, check cookies (optional)
    if (!token && req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }
    if (!token) return res.status(401).json({ msg: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ msg: 'Invalid token' });
      // decoded may be { user: { ... } } or the user object directly
      const user = decoded.user ? decoded.user : decoded;
      return res.json(user);
    });
  } catch (err) {
    console.error('Error in /me:', err);
    return res.status(500).json({ msg: 'Server error' });
  }
});

export default router;
