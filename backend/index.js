const express = require("express");
const app = express();
const mongoose = require("mongoose");
const IngredientsModel = require('./models/ingredients');
const RecipeModel = require('./models/recipe');
const getRecipesByIngredients = require('./utils/recipeAPI');

const cors = require("cors")
app.use(express.json());
app.use(cors());


mongoose.connect("mongodb+srv://mmjp17:4kns0Jc1gsoV8DWt@cookingrecipeapp.vruiasr.mongodb.net/");
app.listen(3001, () => {
    console.log("Server is running now......");
});

app.get("/getIngredients", (req, res) => {
    IngredientsModel.find().then((data) => {
        console.log(data);
        res.json(data);
    });
});

app.post("/addIngredients", async (req, res) => {
    const ingredient = req.body;
    const newIngredient = new IngredientsModel(ingredient);
    await newIngredient.save();
    res.json(ingredient);
});

app.post("/getOnlineRecommendations", async (req, res) => {
    const { ingredients } = req.body;
    try {
      const recipes = await getRecipesByIngredients(ingredients);
      res.json(recipes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
    
// mongodb+srv://mmjp17:4kns0Jc1gsoV8DWt@cookingrecipeapp.vruiasr.mongodb.net/