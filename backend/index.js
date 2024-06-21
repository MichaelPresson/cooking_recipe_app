const express = require("express");
const app = express();
require("dotenv").config();
const { getRecipesByIngredients, getInstructions } = require('./utils/recipeAPI');
const IngredientsModel = require('./models/ingredients');
const cors = require("cors");
const apiKey = process.env.API_KEY;  // Fetches API Key from environment variables
const mongoose = require("mongoose");

app.use(express.json());  // Middleware to parse JSON bodies
app.use(cors());  // Middleware to enable CORS

// MongoDB connection parameters fetched from environment variables
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const cluster = process.env.MONGODB_CLUSTER;
const dbName = process.env.MONGODB_DB;

// MongoDB connection string
const connectionString = `mongodb+srv://passinaultm:Redroses21$@cluster0.mutzcxw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

// Connect to MongoDB database
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))  // Success message upon successful connection
    .catch(err => console.error('MongoDB connection error:', err));  // Error message if connection fails

// Server listens on port 3001
app.listen(3001, () => {
    console.log("Server is running now......");
});

// POST endpoint to fetch online recipe recommendations based on ingredients
app.post("/getOnlineRecommendations", async (req, res) => {
    const { ingredients } = req.body;  // Extracts ingredients array from request body
    console.log('Received ingredients:', ingredients);  // Logs received ingredients to console

    try {
        // Calls external API to fetch recipes based on ingredients and API key
        const recipes = await getRecipesByIngredients(ingredients, apiKey);
        console.log('Fetched recipes:', recipes);  // Logs fetched recipes to console
        res.json(recipes);  // Sends fetched recipes as JSON response
    } catch (error) {
        // Handles errors during recipe fetching process
        console.error('Error fetching recipes:', error);
        res.status(500).json({ message: error.message });  // Sends error message as JSON response with status code 500
    }
});

// GET endpoint to fetch recipe instructions by recipe ID
app.get("/getRecipeInstructions/:id", async (req, res) => {
    const { id } = req.params;  // Extracts recipe ID from request parameters
    console.log('Received recipe ID:', id);  // Logs received recipe ID to console

    try {
        // Calls external API to fetch recipe instructions based on recipe ID and API key
        const instructions = await getInstructions(id, apiKey);
        console.log('Fetched instructions:', instructions);  // Logs fetched instructions to console
        res.json(instructions);  // Sends fetched instructions as JSON response
    } catch (error) {
        // Handles errors during instructions fetching process
        console.error('Error fetching instructions:', error);
        res.status(500).json({ message: error.message });  // Sends error message as JSON response with status code 500
    }
});

// POST endpoint to add ingredients to MongoDB database
app.post("/addIngredients", async (req, res) => {
    const ingredient = req.body;  // Extracts ingredient object from request body
    const newIngredient = new IngredientsModel(ingredient);  // Creates new instance of IngredientsModel with extracted ingredient data

    try {
        await newIngredient.save();  // Saves new ingredient to MongoDB database
        res.json(ingredient);  // Sends added ingredient as JSON response upon successful save
    } catch (error) {
        console.error('Error adding ingredient:', error);
        res.status(500).json({ message: error.message });  // Sends error message as JSON response with status code 500
    }
});
