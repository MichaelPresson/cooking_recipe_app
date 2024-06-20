const axios = require('axios');

// Base URL for the Spoonacular API
const BASE_URL = 'https://api.spoonacular.com/recipes';

/**
 * Fetches recipes based on a list of ingredients.
 * @param {string[]} ingredients - Array of ingredient names.
 * @param {string} apiKey - Spoonacular API key for authentication.
 * @returns {Promise<Object>} - Promise resolving to response data containing recipes.
 * @throws {Error} - If an error occurs while fetching recipes.
 */
const getRecipesByIngredients = async (ingredients, apiKey) => {
  // Convert array of ingredients to comma-separated string
  let ingStr = ingredients.join(',');

  try {
    // Make GET request to Spoonacular API endpoint to find recipes by ingredients
    const response = await axios.get(`${BASE_URL}/findByIngredients`, {
      params: {
        ingredients: ingStr,
        number: 5, 
        ranking: 1,
        ignorePantry: false, 
        apiKey: apiKey,
      }
    });
    return response.data; // Return the fetched recipes
  } catch (error) {
    // Log and throw an error if fetching recipes fails
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

/**
 * Fetches recipe instructions by recipe ID.
 * @param {number} id - ID of the recipe to fetch instructions for.
 * @param {string} apiKey - Spoonacular API key for authentication.
 * @returns {Promise<Object>} - Promise resolving to response data containing recipe instructions.
 * @throws {Error} - If an error occurs while fetching recipe instructions.
 */
const getInstructions = async (id, apiKey) => {
  try {
    // Make GET request to Spoonacular API endpoint to fetch recipe information by ID
    const response = await axios.get(`${BASE_URL}/${id}/information`, {
      params: {
        includeNutrition: false,
        apiKey: apiKey,
      }
    });
    return response.data; // Return the fetched recipe instructions
  } catch (error) {
    // Log and throw an error if fetching recipe instructions fails
    console.error('Error getting recipe instructions:', error);
    throw error;
  }
};

// Export functions for use in other modules
module.exports = {
  getRecipesByIngredients,
  getInstructions
};
