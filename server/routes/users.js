const users = require('express').Router();
const passport = require('../passport/index');
const usersController = require('../controllers/users');

users
  .route('/')
  .get(usersController.getUserId)
  .post(usersController.createUser);

users.route('/login').post(
  (req, res, next) => {
    console.log('login route, req.body: ', req.body);
    next();
  },
  passport.authenticate('local'),
  usersController.login
);

users.route('/logout').get(usersController.logout);

users.route('/:userId').get(usersController.getUser);

users
  .route('/:userId/ingredients')
  .get(usersController.getIngredients)
  .post(usersController.addIngredients);

users
  .route('/:userId/ingredients/:ingredientId')
  .delete(usersController.removeIngredient);

users
  .route('/:userId/recipes')
  .get(usersController.getRecipes)
  .post(usersController.addRecipe);

users.route('/:userId/recipes/:recipeId').delete(usersController.removeRecipe);

module.exports = users;
