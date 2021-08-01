const mongoose = require('mongoose');

const { Schema } = mongoose;

const recipeSchema = new Schema({
  vegetarian: Boolean,
  vegan: Boolean,
  glutenFree: Boolean,
  dairyFree: Boolean,
  veryHealthy: Boolean,
  cheap: Boolean,
  veryPopular: Boolean,
  sustainable: Boolean,
  weightWatcherSmartPoints: Number,
  gaps: String,
  lowFodmap: Boolean,
  aggregateLikes: Number,
  spoonacularScore: Number,
  healthScore: Number,
  creditsText: String,
  license: String,
  sourceName: String,
  pricePerServing: Number,
  extendedIngredients: [
    {
      id: Number,
      aisle: String,
      image: String,
      consistency: String,
      name: String,
      nameClean: String,
      original: String,
      originalString: String,
      originalName: String,
      amount: Number,
      unit: String,
      meta: [],
      metaInformation: [],
      measures: {
        us: {
          amount: Number,
          unitShort: String,
          unitLong: String,
        },
        metric: {
          amount: Number,
          unitShort: String,
          unitLong: String,
        },
      },
    },
  ],
  id: Number,
  title: String,
  readyInMinutes: Number,
  servings: Number,
  sourceUrl: String,
  image: String,
  imageType: String,
  summary: String,
  cuisines: [String],
  dishTypes: [String],
  diets: [String],
  occasions: [],
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
  instructions: String,
  analyzedInstructions: [
    {
      name: String,
      steps: [
        {
          number: Number,
          step: String,
          ingredients: [
            {
              id: Number,
              name: String,
              localizedName: String,
              image: String,
            },
          ],
          equipment: [
            {
              id: Number,
              name: String,
              localizedName: String,
              image: String,
            },
          ],
        },
      ],
    },
  ],
  originalId: Number,
  spoonacularSourceUrl: String,
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
