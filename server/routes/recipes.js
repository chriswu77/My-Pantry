const recipes = require('express').Router();
const recipesController = require('../controllers/recipes');

recipes.route('/:recipeId').get(recipesController.getRecipe);

recipes.route('/search').post(recipesController.searchRecipes);

module.exports = recipes;
