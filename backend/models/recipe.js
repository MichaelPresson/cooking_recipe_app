const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String },
  url: { type: String }
});


const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;