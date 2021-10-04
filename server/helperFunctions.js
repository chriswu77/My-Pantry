const User = require('../database/models/user');
const Recipe = require('../database/models/recipe');
const Ingredient = require('../database/models/ingredient');
const { getRecipeInfo } = require('../apiHelpers/spoonacular');
const { getOrSetCache } = require('../redis/helpers');

const resolveIngredient = async (ingredient, foundUser) => {
  const foundIngredient = await Ingredient.findOne({
    id: ingredient.id,
  });

  if (foundIngredient) {
    const alreadyHasIngredient = await User.findOne({
      ingredients: foundIngredient._id,
    });

    if (!alreadyHasIngredient) {
      foundUser.ingredients.push(foundIngredient);
      await foundUser.save();
    }
  } else {
    const newIngredient = new Ingredient({
      id: ingredient.id,
      name: ingredient.name,
      image: ingredient.image,
    });
    await newIngredient.save();
    foundUser.ingredients.push(newIngredient);
    await foundUser.save();
  }
};

const resolveRecipe = async (recipeId, foundUser) => {
  const foundRecipe = await Recipe.findOne({ id: recipeId });

  if (foundRecipe) {
    const alreadyHasRecipe = await User.findOne({
      recipes: foundRecipe._id,
    });

    if (!alreadyHasRecipe) {
      foundUser.recipes.push(foundRecipe);
      await foundUser.save();
    }
  } else {
    const recipeData = await getOrSetCache(`recipes:${recipeId}`, async () => {
      const data = await getRecipeInfo(recipeId);
      return data;
    });
    const newRecipe = new Recipe(recipeData);
    await newRecipe.save();
    foundUser.recipes.push(newRecipe);
    await foundUser.save();
  }
};

module.exports = { resolveIngredient, resolveRecipe };
