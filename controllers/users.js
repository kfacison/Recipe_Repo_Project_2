const User = require('../models/user');
const Recipe = require('../models/recipe');

module.exports = {
    userIndex
}

async function userIndex(req, res) {
    //return list of all recipes in database
    console.log("in the user index function")
    console.log(req.params.id);
    const Cookbook = await User.findById(req.params.id).populate('cookbook');
    res.render("users/index", {title: "Your Cookbook", Cookbook });
}
