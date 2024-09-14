// routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

const users = []; // In-memory store (replace with a database in production)

// Helper function to validate password strength
const isPasswordStrong = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// User Registration
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;

  // Validate presence of username and password
  if (!username || !password || !role) {
    return res.status(400).send('Username, password, and role are required');
  }

  // Validate role
  const validRoles = ['Admin', 'User', 'Guest'];
  if (!validRoles.includes(role)) {
    return res.status(400).send('Invalid role. Valid roles are Admin, User, and Guest');
  }

  // Check if the username already exists
  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.status(400).send('Username already taken');
  }

  // Validate password strength
  if (!isPasswordStrong(password)) {
    return res.status(400).send('Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.');
  }

  // Hash password and save the user
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword, role });

  res.status(201).send('User registered successfully');
  console.log(users);
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
  
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send('Invalid credentials');
    }
  
    const token = jwt.sign({ username: user.username, role: user.role }, 'hello', { expiresIn: '1h' });
    console.log(token);
    res.json({ token });
  });
  

module.exports = router;
