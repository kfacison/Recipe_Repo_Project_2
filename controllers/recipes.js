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
    const recipe = await Recipe.findById(req.params);
    console.log(req.params);
    res.render('recipes/show', {title:"Recipe", recipe})
}

async function create(req, res){
    //all ingredients in the data base name and id
    const allingredients = await Ingredient.find({},{name: 1, _id:0});
    //make into an array of just names
    //const ingList = allingredients.map(i => i.name);
    //takes off spaces on string of the ingredents
    req.body.ingredientList = req.body.ingredientList.trim();
    //makes an arrray seperated by commas
    req.body.ingredientList = req.body.ingredientList.split(/\s*,\s*/);
    //console.log(ingList);

    const finalList = [];
    for(let j=0; j<req.body.ingredientList.length;j++){
        for(let i=0; i<allingredients.length;i++){
            if(allingredients[i].name===j){
                finalList.push(allingredients[i]._id);
                console.log(finalList)
            }
        }
        const newIng = await Ingredient.create({name: req.body.ingredientList[j], foodCategory: 'Misc.'});
        finalList.push(newIng._id);
        console.log(finalList)
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
        res.redirect(`/recipes/new`, { errorMsg: err.message });
    }
}