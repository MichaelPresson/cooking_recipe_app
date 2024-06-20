// Import Mongoose library for MongoDB object modeling
const mongoose = require("mongoose");

// Define a Mongoose Schema for Ingredients
const IngredientsSchema = new mongoose.Schema({
    // Define a field 'name' of type String, which is required (mandatory)
    name: {
        type: String,
        required: true,
    },
});

// Create a Mongoose Model named 'IngredientsModel' based on the IngredientsSchema
const IngredientsModel = mongoose.model("ingredients", IngredientsSchema);

// Export the IngredientsModel to be used elsewhere in the application
module.exports = IngredientsModel;
