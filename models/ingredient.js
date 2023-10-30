const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
    name: String,
    foodCategory: {
        type: String,
        enum: ['Grains','Vegetables','Fruits','Proteins','Dairy','Fats and Oils','Beverages','Herbs and Spices','Misc.']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Ingredient', ingredientSchema);