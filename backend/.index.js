// Import the Express framework and create an Express application
const express = require("express");
const app = express();

// Load environment variables from .env file
require("dotenv").config();

// Import functions for interacting with external API and database
const { getRecipesByIngredients, getInstructions } = require('./utils/recipeAPI');

// Import CORS middleware for enabling Cross-Origin Resource Sharing
const cors = require("cors");

// Retrieve API key from environment variables
const apiKey = process.env.SPOONACULAR_API_KEY;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to enable CORS for all origins
app.use(cors());

// Start the server on port 3001 and log a message to indicate server start
app.listen(3001, () => {
    console.log("Server is running now...");
});

// POST endpoint to fetch recipe recommendations based on ingredients
app.post("/getOnlineRecommendations", async (req, res) => {
    // Extract 'ingredients' array from request body
    const { ingredients } = req.body;

    try {
        // Call external API function to fetch recipes based on ingredients and API key
        const recipes = await getRecipesByIngredients(ingredients, apiKey);
        // Respond with JSON containing fetched recipes
        res.json(recipes);
    } catch (error) {
        // Handle and respond with 500 Internal Server Error if an error occurs
        res.status(500).json({ message: error.message });
    }
});

// GET endpoint to fetch recipe instructions by recipe ID
app.get("/getRecipeInstructions/:id", async (req, res) => {
    // Extract 'id' parameter from request URL
    const { id } = req.params;

    try {
        // Call external API function to fetch recipe instructions by recipe ID and API key
        const instructions = await getInstructions(id, apiKey);
        // Respond with JSON containing fetched instructions
        res.json(instructions);
    } catch (error) {
        // Handle and respond with 500 Internal Server Error if an error occurs
        res.status(500).json({ message: error.message });
    }
});
