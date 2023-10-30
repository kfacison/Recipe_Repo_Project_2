module.exports = {
    index
}

async function index(req, res) {
    //return list of all recipes in database
    //const recipeList = await find()
    res.render("recipes/index", {title: "All Recipes" });
}
