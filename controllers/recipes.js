const Recipe = require('../models/recipe');
const Ingredient = require('../models/ingredient');
const User = require('../models/user');

module.exports = {
    index,
    new: newRecipeForm,
    create,
    show,
    delete: deleteRecipe
}

async function index(req, res) {
    //return list of all recipes in database
    const recipeList = await Recipe.find({}).populate('chef', 'name');
    //render index page
    res.render("recipes/index", {title: "All Recipes" , recipeList});
}

async function newRecipeForm(req, res){
    console.log(req.params.recipesId);
    if(req.params.recipesId){
        const recipe = await Recipe.findById(req.params.recipesId).populate('ingredientList').populate('chef', 'name');
        res.render("recipes/new", {title:"New Recipe", recipe})
    }
    else{
        res.render("recipes/new", {title:"New Recipe"})
    }
}

async function show(req, res){
    //finds the recipe with the id in the url
    const recipe = await Recipe.findById(req.params.recipesId).populate('ingredientList').populate('chef', 'name');
    //renders the show page
    //console.log(recipe);
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
    const finalList = [];
    //filters out ingredent that already exist and create those that dont
    //id is pushed to finalList array and stored in req.body
    for(let j=0; j<req.body.ingredientList.length;j++){
        for(let i=0; i<allingredients.length;i++){
            console.log(`the ingredent at index ${j} is ${req.body.ingredientList[j]} and in the database at index ${i} is ${allingredients[i].name}`);
            if(allingredients[i].name===req.body.ingredientList[j]){
                finalList.push(allingredients[i]._id);
                //once pushed needs to leave embedded for loop
                console.log(finalList)
                break;
            }
        }
        console.log('outside the emebeded for loop');
        const newIng = await Ingredient.create({name: req.body.ingredientList[j], foodCategory: 'Misc.'});
        finalList.push(newIng._id);
        console.log("should not see this is ingredent is in database");
    }
    req.body.ingredientList = finalList;
    req.body.chef = req.user._id;
    const recipe = await Recipe.create(req.body);
    //add recipe to user cookbook
    const userCookbook = await User.findById(req.user._id);
    console.log(userCookbook);
    userCookbook.cookbook.push(recipe._id);
    await userCookbook.save();
    //redirects to the show page
    try{
        res.redirect(`/recipes/${recipe._id}`);
    }
    catch (err){
        res.redirect(`/`);
    }
}

async function deleteRecipe(req, res){
    const recipeinfo = await Recipe.findOne({'_id':req.params.recipesId, 'chef': req.user._id});
    console.log(req.user._id);
    console.log(recipeinfo.chef);
    if (!recipeinfo) return res.redirect(`/recipes/${req.params.recipesId}`);
    if (req.user._id.equals(recipeinfo.chef)){
        //Recipe.findByIdAndDelete(req.params.recipesId);
        res.redirect('/recipes');
    }
    else{
        res.redirect(`/recipes/${req.params.recipesId}`);
    }
}