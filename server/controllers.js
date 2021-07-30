const User = require('../database/models/user');

const controllers = {
  createUser: async (req, res) => {
    console.log('user sign up');

    try {
      const { username, password } = req.body;

      const foundUser = await User.findOne({ username });

      if (foundUser) {
        res.status(200).send({
          error: `Username is already taken`,
        });
      } else {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(200).send({ _id: newUser._id });
      }
    } catch (err) {
      console.log('signup error:', err);
    }
  },

  login: (req, res) => {
    console.log('logged in', req.user);
    res.status(200).send({ _id: req.user._id });
  },

  getUserId: (req, res) => {
    console.log('get user route');
    console.log(req.user);
    if (req.user) {
      res.status(200).send({ userId: req.user._id });
    } else {
      res.status(200).send({ userId: null });
    }
  },
};

module.exports = controllers;
