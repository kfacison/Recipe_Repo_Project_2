const Ingredient = require('../models/ingredient');


module.exports = {
    index
}

async function index(req, res) {
    //return list of all ingredients in database
    const ingredientList = await Ingredient.find({});
    res.render("ingredients/index", {title: "All ingredients" , ingredientList});
}
