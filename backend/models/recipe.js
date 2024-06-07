const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      name: String,
      quantity: String,
    },
  ],
  instructions: {
    type: String,
    required: true,
  },
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;
