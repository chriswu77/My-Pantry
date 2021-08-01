const User = require('../database/models/user');
const Ingredient = require('../database/models/ingredient');

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

module.exports = { resolveIngredient };
