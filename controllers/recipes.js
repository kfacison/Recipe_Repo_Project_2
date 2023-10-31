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
    const allingredients = await Ingredient.find({},{name: 1, _id:0});
    const ingList = allingredients.map(i => i.name);
    req.body.ingredientList = req.body.ingredientList.trim();
    req.body.ingredientList = req.body.ingredientList.split(/\s*,\s*/);
    console.log(ingList);
    const finalList = [];
    for(let ing of req.body.ingredientList){
        if(ingList.includes(ing)===false){
            console.log(ing)
            const newIng = await Ingredient.create({name: ing, foodCategory: 'Misc.'});
            finalList.push(newIng._id);
            console.log(finalList)
        }
        else{
            const newIng = await Ingredient.find({name: ing});
            finalList.push(newIng._id);
            console.log(finalList)
        }
    }
    req.body.ingredientList = finalList;
    req.body.chef = req.user._id;
    console.log(req.body);
    try{
        const recipe = await Recipe.create(req.body);
        res.redirect(`/recipes/${recipe._id}`);
    }
    catch (err){
        console.log(err);
        res.redirect('/recipes/:recipesId', { errorMsg: err.message });
    }
}