const router = require('express').Router();
const controllers = require('./controllers');
const passport = require('./passport/index');

router.get('/user', controllers.getUserId);
router.post('/user', controllers.createUser);

router.post(
  '/user/login',
  (req, res, next) => {
    console.log('login route, req.body: ', req.body);
    next();
  },
  passport.authenticate('local'),
  controllers.login
);

router.get('/user/logout', controllers.logout);

router.post('/ingredients/search', controllers.searchIngredient);

router.post('/recipes/search', controllers.searchRecipes);

router.get('/recipes/:recipeId', controllers.getRecipeInfoTest);

router.get('/user/:userId', controllers.getUser);

router.get('/user/:userId/ingredients', controllers.getIngredients);
// router.post('/user/:userId/ingredients', controllers.addIngredient);
router.post('/user/:userId/ingredients', controllers.addIngredients);
router.delete(
  '/user/:userId/ingredients/:ingredientId',
  controllers.removeIngredient
);

router.get('/user/:userId/recipes', controllers.getRecipes);
router.post('/user/:userId/recipes', controllers.addRecipe);
router.delete('/user/:userId/recipes/:recipeId', controllers.removeRecipe);

module.exports = router;
