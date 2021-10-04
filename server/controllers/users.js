const mongoose = require('mongoose');
const User = require('../../database/models/user');
const { resolveIngredient, resolveRecipe } = require('../helperFunctions');

const usersController = {
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

  logout: (req, res) => {
    if (req.user) {
      req.logout();
      res.status(200).send('User logged out');
    } else {
      res.status(404).send('No user signed in');
    }
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

  getUser: async (req, res) => {
    const { userId } = req.params;

    try {
      const foundUser = await User.findById(userId);
      res.status(200).send(foundUser);
    } catch (err) {
      res.status(404).send(err);
    }
  },

  getIngredients: async (req, res) => {
    const { userId } = req.params;

    try {
      const foundUser = await User.findById(userId).populate('ingredients');

      res.status(200).send(foundUser.ingredients);
    } catch (err) {
      res.status(404).send(err);
    }
  },

  addIngredients: async (req, res) => {
    const { userId } = req.params;
    const { ingredients } = req.body;

    try {
      const foundUser = await User.findById(userId);

      for (const ingredient of ingredients) {
        // eslint-disable-next-line no-await-in-loop
        await resolveIngredient(ingredient, foundUser);
      }

      res.status(200).send('Saved ingredients to user');
    } catch (err) {
      res.status(400).send(err);
    }
  },

  removeIngredient: async (req, res) => {
    const { userId, ingredientId } = req.params;

    try {
      await User.findByIdAndUpdate(userId, {
        $pull: { ingredients: mongoose.Types.ObjectId(ingredientId) },
      });
      res.status(200).send('Successfuly removed ingredient');
    } catch (err) {
      res.status(400).send(err);
    }
  },

  getRecipes: async (req, res) => {
    const { userId } = req.params;

    try {
      const foundUser = await User.findById(userId).populate('recipes');

      res.status(200).send(foundUser.recipes);
    } catch (err) {
      res.status(404).send(err);
    }
  },

  addRecipe: async (req, res) => {
    const { userId } = req.params;
    const { recipeId } = req.body;

    try {
      const foundUser = await User.findById(userId);

      await resolveRecipe(recipeId, foundUser);
      res.status(200).send('Saved recipe to user');
    } catch (err) {
      res.status(400).send(err);
    }
  },

  removeRecipe: async (req, res) => {
    const { userId, recipeId } = req.params;

    try {
      await User.findByIdAndUpdate(userId, {
        $pull: { recipes: mongoose.Types.ObjectId(recipeId) },
      });
      res.status(200).send('Successfuly removed recipe');
    } catch (err) {
      res.status(400).send(err);
    }
  },
};

module.exports = usersController;
