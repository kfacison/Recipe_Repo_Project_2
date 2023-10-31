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
    console.log(recipeList);
    res.render("recipes/index", {title: "All Recipes" , recipeList});
}

async function newRecipeForm(req, res){

    res.render("recipes/new", {title:"New Recipe"})
}

async function show(req, res){
    const recipe = await Recipe.findById(req.params.id).populate('ingredientList');
    console.log(`In the show finction and this should be the recipe id: ${req.params.id}`);
    res.render('recipes/show', {title:"Recipe", recipe})
}

async function create(req, res){
    //all ingredients in the data base name and id
    const allingredients = await Ingredient.find({},{name: 1, _id:1});
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
            console.log(`the ingredent at index ${j} is ${req.body.ingredientList[j]} and in the database at index ${i} is ${allingredients[i].name}`);
            if(allingredients[i].name===req.body.ingredientList[j]){
                finalList.push(allingredients[i]._id);
                console.log(finalList)
                break;
            }
        }
        const newIng = await Ingredient.create({name: req.body.ingredientList[j], foodCategory: 'Misc.'});
        finalList.push(newIng._id);
        console.log(finalList)
    }
    req.body.ingredientList = finalList;
    req.body.chef = req.user._id;
    const recipe = await Recipe.create(req.body);
    console.log(`the newly created recipe - ${recipe}`);
    
    try{
        res.redirect(`/recipes/${recipe._id}`);
    }
    catch (err){
        //res.redirect(`/`);
    }
}