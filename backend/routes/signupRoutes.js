const express = require('express');
const router = express.Router();
const UploadUsers = require('../models/UploadUsers'); // Import the Sequelize model

// Route to handle sign up
router.post('/signup', async (req, res) => {
  try {
    const { name, username, email, gender, password } = req.body;

    // Create a new user in the database
    const newUser = await UploadUsers.create({
      name,
      username,
      email,
      gender,
      password,
    });

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
