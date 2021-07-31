const axios = require('axios');
const apiKey = require('../api_key');

const searchIngredients = async (query) => {
  const response = await axios.get(
    'https://api.spoonacular.com/food/ingredients/autocomplete',
    {
      params: {
        apiKey,
        query,
        number: 10,
        metaInformation: true,
      },
    }
  );
  return response.data;
};

const searchRecipesByIngredients = async (ingredientsArr, ignorePantry) => {
  const response = await axios.get(
    'https://api.spoonacular.com/recipes/findByIngredients',
    {
      params: {
        apiKey,
        ingredients: ingredientsArr.join(','),
        number: 10,
        ignorePantry,
      },
    }
  );
  return response.data;
};

const getRecipeInfo = async (id) => {
  const response = await axios.get(
    `https://api.spoonacular.com/recipes/${id}/information`,
    {
      params: {
        apiKey,
      },
    }
  );
  return response.data;
};

module.exports = {
  searchIngredients,
  searchRecipesByIngredients,
  getRecipeInfo,
};
