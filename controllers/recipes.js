const Recipe = require('../models/recipe');


module.exports = {
    index,
    new: newRecipeForm,
    create
}

async function index(req, res) {
    //return list of all recipes in database
    const recipeList = await Recipe.find({});
    res.render("recipes/index", {title: "All Recipes" , recipeList});
}

async function newRecipeForm(req, res){

    res.render("recipes/new", {title:" New Recipe"})
}

async function create(req, res){

}