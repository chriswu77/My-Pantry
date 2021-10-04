const ingredients = require('express').Router();
const ingredientsController = require('../controllers/ingredients');

ingredients
  .route('/ingredients/search')
  .post(ingredientsController.searchIngredient);

export default ingredients;
