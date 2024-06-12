const express = require("express");
const app = express();
require("dotenv").config();
const { getRecipesByIngredients, getInstructions } = require('./utils/recipeAPI');
const cors = require("cors");
const apiKey = process.env.API_KEY;

app.use(express.json());
app.use(cors());

app.listen(3001, () => {
    console.log("Server is running now...");
});

app.post("/getOnlineRecommendations", async (req, res) => {
    const { ingredients } = req.body;
    try {
      const recipes = await getRecipesByIngredients(ingredients, apiKey);
      res.json(recipes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

app.get("/getRecipeInstructions/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const instructions = await getInstructions(id, apiKey);
      res.json(instructions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});
