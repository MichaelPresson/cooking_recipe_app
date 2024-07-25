require('dotenv').config()

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")
const bcrypt = require('bcryptjs')
const session = require('express-session')
const { getRecipesByIngredients, getInstructions } = require('./utils/recipeAPI');

const IngredientsModel = require('./models/ingredients');
const Recipe = require('./models/recipe')
const User = require('./models/user');
const user = require('./models/user');

// MongoDB connection parameters fetched from environment variables
const apiKey = process.env.API_KEY;  
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const cluster = process.env.MONGODB_CLUSTER;



// MongoDB connection string
const connectionString = `mongodb+srv://${username}:${password}@${cluster}.mutzcxw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const app = express();

// Connect to MongoDB database
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: false })
    .then(() => console.log('MongoDB connected'))  
    .catch(err => console.error('MongoDB connection error:', err)); 

app.use(express.json());  

app.use(cors({
    origin: 'http://localhost:3000',  // Ensure this matches your front-end origin
    credentials: true,
}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(session({
    secret: 'key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: connectionString })
})) 

// Server listens on port 3001
app.listen(3001, () => {
    console.log("Server is running now......");
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username })
  
    if ( user && await bcrypt.compare(password, user.password)) {
        req.session.userID = user._id
        res.status(200).json({ message: 'login successful'})
    } else {
        res.status(401).json({ message: 'invalid username or password'})
    }
})

app.post('/logout', (req,res) => {
    req.session.destroy()
    res.status(200).json({ message: 'logout successful'})
})

app.post('/register', async (req,res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username })
    if ( user ) {
        console.log('user already exists')
    } else {
        const hashedPassword = await bcrypt.hash(password,10)
        const user = new User({ username, password: hashedPassword })
        await user.save()
        res.status(201).json({ message: 'user registered'})
    }
})

// POST endpoint to fetch online recipe recommendations based on ingredients
app.post("/getOnlineRecommendations", async (req, res) => {
    const { ingredients } = req.body;  // Extracts ingredients array from request body

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

    try {
        // Calls external API to fetch recipe instructions based on recipe ID and API key
        const instructions = await getInstructions(id, apiKey);
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

// POST endpoint to add ingredients to database
app.post('/addRecipe', async (req, res) => {
    const { savedBy, title, header, url } = req.body;

    try {
      // Create a new Recipe document
      const newRecipe = new Recipe({savedBy, title, header, url });
      // Save the recipe to MongoDB
      await newRecipe.save();
      // Send the saved recipe back as JSON response
      res.json(newRecipe);
    } catch (error) {
      console.error('Error adding recipe:', error);
      res.status(500).json({ message: error.message });
    }
});

//Get endpoint to retrieve saved recipes
app.get('/getSavedRecipes', async (req, res) => {
    try {
        const { savedBy }= req.query
   
        const recipes = await Recipe.find({ savedBy }); 

        res.json(recipes); 
    } catch (error) {
        console.error('Error fetching saved recipes:', error);
        res.status(500).json({ message: 'Failed to fetch saved recipes' });
    }
});
