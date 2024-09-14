// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

const User = mongoose.model('User', {
  username: String,
  email: String,
  password: String
});

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  try {
    await user.save();
    res.status(201).send({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).send({ message: 'Error creating user' });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    res.status(401).send({ message: 'Invalid username or password' });
  } else {
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      const token = jwt.sign({ userId: user._id }, 'secretkey', { expiresIn: '1h' });
      res.status(200).send({ token });
    } else {
      res.status(401).send({ message: 'Invalid username or password' });
    }
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});