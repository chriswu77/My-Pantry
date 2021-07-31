const mongoose = require('mongoose');

const { Schema } = mongoose;

const ingredientSchema = new Schema({
  id: Number,
  name: String,
  image: String,
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;
