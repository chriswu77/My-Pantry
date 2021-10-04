const ingredients = require('express').Router();
const ingredientsController = require('../controllers/ingredients');

ingredients.route('/search').post(ingredientsController.searchIngredient);

module.exports = ingredients;
