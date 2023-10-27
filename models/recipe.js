const mongoose = require('mongoose');
const ingredient = require('./ingredient');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    mealType: {
        type: String,
        enum: ['Breakfast','Lunch','Dinner','Snack','Misc.']
    },
    cuisineType:{
        type: String,
        enum: ['Italian','Mexican','Chinese','Indian','Japanese','Thai','French','Greek','Spanish','Korean','Lebanese','Vietnamese','Mediterranean','Brazilian','German','Turkish','Moroccan','Peruvian','Russian','Caribbean','American','Misc.']
    },
    cookTime: Number,
    ingredientList: {
        type: Schema.Types.ObjectId,
        ref: 'ingredient'
    },
    instruction: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Recipe', recipeSchema);