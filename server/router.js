const router = require('express').Router();
const controllers = require('./controllers');
const passport = require('./passport/index');

router.get('/users', controllers.getUserId);
router.post('/users', controllers.createUser);

router.post(
  '/users/login',
  (req, res, next) => {
    console.log('login route, req.body: ', req.body);
    next();
  },
  passport.authenticate('local'),
  controllers.login
);

router.get('/users/logout', controllers.logout);

router.post('/ingredients/search', controllers.searchIngredient);

router.post('/recipes/search', controllers.searchRecipes);

router.get('/recipes/:recipeId', controllers.getRecipeInfoTest);

router.get('/users/:userId', controllers.getUser);

router.get('/users/:userId/ingredients', controllers.getIngredients);
// router.post('/users/:userId/ingredients', controllers.addIngredient);
router.post('/users/:userId/ingredients', controllers.addIngredients);
router.delete(
  '/users/:userId/ingredients/:ingredientId',
  controllers.removeIngredient
);

router.get('/users/:userId/recipes', controllers.getRecipes);
router.post('/users/:userId/recipes', controllers.addRecipe);
router.delete('/users/:userId/recipes/:recipeId', controllers.removeRecipe);

module.exports = router;
