const User = require('../models/user');
const Recipe = require('../models/recipe');

module.exports = {
    userIndex
}

async function userIndex(req, res) {
    //return list of all recipes in database
    const Cookbook = await User.findById(req.params.id).populate('cookbook');
    console.log(Cookbook);
    res.render("users/index", {title: "Your Cookbook", Cookbook });
}
