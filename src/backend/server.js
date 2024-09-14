const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');
const User = require('./models/User'); // Make sure this path is correct

const app = express();
const port = 5000; // Make sure this port matches the one in your frontend

app.use(cors());
app.use(bodyParser.json()); // For parsing application/json

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mydb', { // Update with your MongoDB connection string
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Register endpoint
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send({ message: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).send({ message: 'User created successfully' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).send({ message: 'Email already exists' });
    }
    console.error('Error creating user:', error);
    res.status(500).send({ message: 'Error creating user', error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});
