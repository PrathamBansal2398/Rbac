// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const authorize = require('../middleware/authorize');

// Public route accessible by anyone
router.get('/public', (req, res) => {
  res.send('This is a public route accessible by anyone.');
});

// User route accessible by User and Admin
router.get('/user', authorize(['User', 'Admin']), (req, res) => {
    console.log('User route');
  res.send('This is the user route, accessible by User and Admin.');
});

// Admin route accessible only by Admin
router.get('/admin', authorize(['Admin']), (req, res) => {
  res.send('This is the admin route, accessible only by Admin.');
});

module.exports = router;
