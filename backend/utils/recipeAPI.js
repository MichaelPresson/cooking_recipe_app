const axios = require('axios');

const BASE_URL = 'https://api.spoonacular.com/recipes';

const getRecipesByIngredients = async (ingredients, apiKey) => {
  let ingStr = ingredients.join(',');

  try {
    const response = await axios.get(`${BASE_URL}/findByIngredients`, {
      params: {
        ingredients: ingStr,
        number: 5, 
        ranking: 1,
        ignorePantry: false, 
        apiKey: apiKey,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

const getInstructions = async (id, apiKey) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}/information`, {
      params: {
        includeNutrition: false,
        apiKey: apiKey,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error getting recipe instructions:', error);
    throw error;
  }
};

module.exports = {
  getRecipesByIngredients,
  getInstructions
};
