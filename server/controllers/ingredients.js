const { getOrSetCache } = require('../../redis/helpers');
const { searchIngredients } = require('../../apiHelpers/spoonacular');

const ingredientsController = {
  searchIngredient: async (req, res) => {
    try {
      const { query } = req.body;
      const results = await getOrSetCache(
        `ingredients/query:${query}`,
        async () => {
          const data = await searchIngredients(query);
          return data;
        }
      );

      res.status(200).send(results);
    } catch (err) {
      res.status(400).send(err);
    }
  },
};

export default ingredientsController;
