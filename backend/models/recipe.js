const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  recipeId: { type: Number, required: true },  
  savedBy: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true},  
  url: { type: String, required: true }
});



const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;