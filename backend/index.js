const express = require("express");
const app = express();
require("dotenv").config();
const { getRecipesByIngredients, getInstructions } = require('./utils/recipeAPI');
const IngredientsModel = require('./models/ingredients');
const cors = require("cors");
const apiKey = process.env.API_KEY;
const mongoose = require("mongoose");

console.log(apiKey)

app.use(express.json());
app.use(cors());

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const cluster = process.env.MONGODB_CLUSTER;
const dbName = process.env.MONGODB_DB;

const connectionString = `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/`

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.listen(3001, () => {
    console.log("Server is running now......");
});

app.post("/getOnlineRecommendations", async (req, res) => {
    const { ingredients } = req.body;
    console.log('Received ingredients:', ingredients);

    try {
      const recipes = await getRecipesByIngredients(ingredients, apiKey);
      console.log('Fetched recipes:', recipes);
      res.json(recipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      res.status(500).json({ message: error.message });
    }
});

app.get("/getRecipeInstructions/:id", async (req, res) => {
    const { id } = req.params;
    console.log('Received recipe ID:', id);

    try {
      const instructions = await getInstructions(id, apiKey);
      console.log('Fetched instructions:', instructions);
      res.json(instructions);
    } catch (error) {
      console.error('Error fetching instructions:', error);
      res.status(500).json({ message: error.message });
    }
});

app.post("/addIngredients", async (req, res) => {
  const ingredient = req.body;
  const newIngredient = new IngredientsModel(ingredient);
  await newIngredient.save();
  res.json(ingredient);
});