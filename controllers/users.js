const User = require('../models/user');
const Recipe = require('../models/recipe');

module.exports = {
    userIndex
}

async function userIndex(req, res) {
    //return list of all recipes in database
    const UserInfo = await User.findById(req.user._id).populate('cookbook');
    //console.log(UserInfo);
    res.render("users/index", {title: "Your Cookbook", UserInfo });
}
