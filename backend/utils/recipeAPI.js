const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const API_KEY = process.env.SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com/recipes/findByIngredients';

const getRecipesByIngredients = async (ingredients) => {
  const ingredientNames = ingredients.map(ingredient => ingredient.name).join(',');
  
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        ingredients: ingredientNames,
        number: 10,
        apiKey: API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

module.exports = getRecipesByIngredients;
