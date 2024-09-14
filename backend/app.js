// app.js
const express = require('express');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());
const cors = require('cors'); // Add this
app.use(cors()); // Add this line
// Routes
app.use('/auth', authRoutes);
app.use('/routes', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
