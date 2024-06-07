const mongoose = require("mongoose")
const IngredientsSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true,
    },
});

const IngredientsModel = mongoose.model("ingredients", IngredientsSchema);
module.exports = IngredientsModel;

    