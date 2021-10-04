const { getOrSetCache } = require('../../redis/helpers');
const {
  getRecipeInfo,
  searchRecipesByIngredients,
} = require('../../apiHelpers/spoonacular');

const recipesController = {
  getRecipe: async (req, res) => {
    const { recipeId } = req.params;

    try {
      const recipeData = await getOrSetCache(
        `recipes:${recipeId}`,
        async () => {
          const data = await getRecipeInfo(recipeId);
          return data;
        }
      );
      res.status(200).send(recipeData);
    } catch (err) {
      res.status(404).send(err);
    }
  },

  searchRecipes: async (req, res) => {
    const { ingredientsArr, ignorePantry = false } = req.body;

    try {
      const data = await getOrSetCache(
        `recipes/search:${ingredientsArr.join()}`,
        async () => {
          const searchResults = await searchRecipesByIngredients(
            ingredientsArr,
            ignorePantry
          );
          return searchResults;
        }
      );

      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(err);
    }
  },
};

export default recipesController;
