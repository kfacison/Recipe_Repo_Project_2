const Recipe = require('../models/recipe');
const Ingredient = require('../models/ingredient');
const User = require('../models/user');

module.exports = {
    index,
    new: newRecipeForm,
    create,
    show,
    delete: deleteRecipe,
    update
}

async function index(req, res) {
    //return list of all recipes in database
    const recipeList = await Recipe.find({}).populate('chef', 'name');
    //render index page
    res.render("recipes/index", {title: "All Recipes" , recipeList});
}

async function newRecipeForm(req, res){
    //if recipie has id then pass it's info to new page to populate and edit
    if(req.params.recipesId){
        const recipe = await Recipe.findById(req.params.recipesId).populate('ingredientList').populate('chef', 'name');
        res.render("recipes/new", {title:"Edit Recipe", recipe})
    }
    else{
        res.render("recipes/new", {title:"New Recipe", recipe: false})
    }
}

async function show(req, res){
    //finds the recipe with the id in the url
    const recipe = await Recipe.findById(req.params.recipesId).populate('ingredientList').populate('chef', 'name');
    //renders the show page
    res.render('recipes/show', {title:"Recipe", recipe})
}

async function create(req, res){
    //all ingredients in the data base name and id
    const allingredients = await Ingredient.find({},{name: 1, _id:1});
    //takes off spaces on string of the ingredents
    req.body.ingredientList = req.body.ingredientList.trim();
    //makes an arrray seperated by commas
    req.body.ingredientList = req.body.ingredientList.split(/\s*,\s*/);
    const finalList = [];
    //filters out ingredent that already exist and create those that dont
    //id is pushed to finalList array and stored in req.body
    for(let j=0; j<req.body.ingredientList.length;j++){
        let wasFound = false;
        for(let i=0; i<allingredients.length;i++){
            //loops through the ingredentList and see if it already exists
            if(allingredients[i].name===req.body.ingredientList[j]){
                //pushes to temp array and set wasFound to true
                finalList.push(allingredients[i]._id);
                wasFound = true
            }
        }
        //if wasFound is false aka does not exist in collection then is created
        if(wasFound===false){
        const newIng = await Ingredient.create({name: req.body.ingredientList[j], foodCategory: 'Misc.'});
        //pushes to temp array
        finalList.push(newIng._id);
        }
    }
    req.body.ingredientList = finalList;
    req.body.chef = req.user._id;
    const recipe = await Recipe.create(req.body);
    //add recipe to user cookbook
    const userCookbook = await User.findById(req.user._id);
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
    //removes recipie from recipe colection
    if (!recipeinfo) return res.redirect(`/recipes/${req.params.recipesId}`);
    if (req.user._id.equals(recipeinfo.chef)){
        await Recipe.findByIdAndDelete(req.params.recipesId);
        res.redirect('/recipes');
    }
    else{
        res.redirect(`/recipes/${req.params.recipesId}`);
    }
}

async function update(req, res){
    const allingredients = await Ingredient.find({},{name: 1, _id:1});
    //takes off spaces on string of the ingredents
    req.body.ingredientList = req.body.ingredientList.trim();
    //makes an arrray seperated by commas
    req.body.ingredientList = req.body.ingredientList.split(/\s*,\s*/);
    const finalList = [];
    //filters out ingredent that already exist and create those that dont
    //id is pushed to finalList array and stored in req.body
    for(let j=0; j<req.body.ingredientList.length;j++){
        let wasFound = false;
        for(let i=0; i<allingredients.length;i++){
            //loops through the ingredentList and see if it already exists
            if(allingredients[i].name===req.body.ingredientList[j]){
                //pushes to temp array and set wasFound to true
                finalList.push(allingredients[i]._id);
                wasFound = true
            }
        }
        //if wasFound is false aka does not exist in collection then is created
        if(wasFound===false){
            const newIng = await Ingredient.create({name: req.body.ingredientList[j], foodCategory: 'Misc.'});
            //pushes to temp array
            finalList.push(newIng._id);
        }
    }
    req.body.ingredientList = finalList;
    
    const newRecipe = await Recipe.findOneAndUpdate({'_id':req.params.recipesId, 'chef': req.user._id}, req.body);
    
    try{
        res.redirect(`/recipes/${req.params.recipesId}`);
    }
    catch (err){
        res.redirect(`/`);
    }
}