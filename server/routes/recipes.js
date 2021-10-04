const recipes = require('express').Router();
const recipesController = require('../controllers/recipes');

recipes.route('/recipes/:recipeId').get(recipesController.getRecipe);

recipes.route('/recipes/search').post(recipesController.searchRecipes);

export default recipes;
