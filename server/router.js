const router = require('express').Router();
const User = require('../database/models/user');

router.get('/user', (req, res) => {
  console.log('get user');
});

router.post('/user', async (req, res) => {
  console.log('user sign up');

  try {
    const { username, password } = req.body;

    // req.session.username = username;

    const foundUser = await User.findOne({ username });

    if (foundUser) {
      res.status(200).send({
        error: `Sorry, username is already taken!`,
      });
    } else {
      const newUser = new User(req.body);
      await newUser.save();
      res.status(200).send({ _id: newUser._id });
    }
  } catch (err) {
    console.log('signup error:', err);
  }
});

module.exports = router;
