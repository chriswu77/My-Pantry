const mongoose = require('mongoose');

const { Schema } = mongoose;

const recipeSchema = new Schema({
  id: Number,
  title: String,
  image: String,
  imageType: String,
  servings: Number,
  readyInMinutes: Number,
  license: String,
  sourceName: String,
  sourceUrl: String,
  spoonacularSourceUrl: String,
  aggregateLikes: Number,
  healthScore: Number,
  spoonacularScore: Number,
  pricePerServing: Number,
  analyzedInstructions: [],
  cheap: Boolean,
  creditsText: String,
  cuisines: [],
  dairyFree: Boolean,
  diets: [],
  gaps: String,
  glutenFree: Boolean,
  instructions: String,
  ketogenic: Boolean,
  lowFodmap: Boolean,
  occasions: [],
  sustainable: Boolean,
  vegan: Boolean,
  vegetarian: Boolean,
  veryHealth: Boolean,
  veryPopular: Boolean,
  whole30: Boolean,
  weightWatcherSmartPoints: Number,
  dishTypes: [String],
  extendedIngredients: [
    {
      aisle: String,
      amount: Number,
      consitency: String,
      id: Number,
      image: String,
      measures: {
        metric: {
          amount: Number,
          unitLong: String,
          unitShort: String,
        },
        us: {
          amount: Number,
          unitLong: String,
          unitShort: String,
        },
      },
      meta: [],
      name: String,
      original: String,
      originalName: String,
      unit: String,
    },
  ],
  summary: String,
  winePairing: {
    pairedWines: [String],
    pairingText: String,
    productMatches: [
      {
        id: Number,
        title: String,
        description: String,
        price: String,
        imageUrl: String,
        averageRating: Number,
        ratingCount: Number,
        score: Number,
        link: String,
      },
    ],
  },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
