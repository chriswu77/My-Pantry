const mongoose = require('mongoose');
const User = require('../database/models/user');
const Ingredient = require('../database/models/ingredient');
const Recipe = require('../database/models/recipe');
const {
  searchIngredients,
  searchRecipesByIngredients,
  getRecipeInfo,
} = require('../apiHelpers/spoonacular');
const { resolveIngredient } = require('./helperFunctions');

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

  searchIngredient: async (req, res) => {
    console.log('search ingredients');
    try {
      const { query } = req.body;
      const results = await searchIngredients(query);
      res.status(200).send(results);
    } catch (err) {
      res.status(400).send(err);
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

  addIngredient: async (req, res) => {
    const { userId } = req.params;
    const ingredient = req.body;

    try {
      const foundUser = await User.findById(userId);
      const foundIngredient = await Ingredient.findOne({ id: ingredient.id });

      if (foundIngredient) {
        const alreadyHasIngredient = await User.findOne({
          ingredients: foundIngredient._id,
        });

        if (alreadyHasIngredient) {
          res.status(200).send('User already added this ingredient');
        } else {
          foundUser.ingredients.push(foundIngredient);
          await foundUser.save();
          res.status(200).send('Saved ingredient to user');
        }
      } else {
        const newIngredient = new Ingredient({
          id: ingredient.id,
          name: ingredient.name,
          image: ingredient.image,
        });
        await newIngredient.save();
        foundUser.ingredients.push(newIngredient);
        await foundUser.save();
        res.status(200).send('Saved ingredient to user');
      }
    } catch (err) {
      res.status(400).send(err);
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

  searchRecipes: async (req, res) => {
    const { ingredientsArr, ignorePantry = false } = req.body;

    try {
      const searchResults = await searchRecipesByIngredients(
        ingredientsArr,
        ignorePantry
      );
      res.status(200).send(searchResults);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  getRecipeInfoTest: async (req, res) => {
    const { recipeId } = req.params;

    try {
      const results = await getRecipeInfo(recipeId);
      res.status(200).send(results);
    } catch (err) {
      res.status(404).send(err);
    }
  },

  addRecipe: async (req, res) => {
    const { userId } = req.params;
    const { recipeId } = req.body;

    try {
      const foundUser = await User.findById(userId);
      const foundRecipe = await Recipe.findOne({ id: recipeId });

      if (foundRecipe) {
        const alreadyHasRecipe = await User.findOne({
          recipes: foundRecipe._id,
        });

        if (alreadyHasRecipe) {
          res.status(200).send('User already added this recipe');
        } else {
          foundUser.recipes.push(foundRecipe);
          await foundUser.save();
          res.status(200).send('Saved recipe to user');
        }
      } else {
        const recipeData = await getRecipeInfo(recipeId);
        const newRecipe = new Recipe(recipeData);
        await newRecipe.save();
        foundUser.recipes.push(newRecipe);
        await foundUser.save();
        res.status(200).send('Saved recipe to user');
      }
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

module.exports = controllers;
