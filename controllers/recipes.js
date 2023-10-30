const Recipe = require('../models/recipe');
const Ingredient = require('../models/ingredient');

module.exports = {
    index,
    new: newRecipeForm,
    create,
    show
}

async function index(req, res) {
    //return list of all recipes in database
    const recipeList = await Recipe.find({});
    res.render("recipes/index", {title: "All Recipes" , recipeList});
}

async function newRecipeForm(req, res){

    res.render("recipes/new", {title:"New Recipe"})
}

async function show(req, res){
    
    res.render('recipes/show', {title:"Recipe"})
}

async function create(req, res){
    const allingredients = await Ingredient.find({},{name: 1});
    req.body.ingredientList = req.body.ingredientList.trim();
    req.body.ingredientList = req.body.ingredientList.split(/\s*,\s*/);
    console.log(allingredients);
    req.body.ingredientList.forEach(ing => {
        if(allingredients.includes(ing)===false){
            console.log(ing)
            const newIng = Ingredient.create({name: ing, foodCategory: 'Misc.'});
            ing = newIng._id;
            console.log(newIng._id)
        }
    });
    console.log(req.prams);
    //req.body.chef = req.prams.user.id;
    console.log(req.body);
    // try{
    //     const recipe = await Recipe.create(req.body);
    //     res.redirect(`/recipes/${recipe._id}`);
    // }
    // catch (err){
    //     console.log(err);
    //     res.redirect('/recipes/:recipesId', { errorMsg: err.message });
    // }
}