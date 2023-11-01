const User = require('../models/user');

module.exports = {
    userIndex,
    index
}

async function userIndex(req, res) {
    //return list of all recipes in database
    const UserInfo = await User.findById(req.user._id).populate('cookbook');
    //console.log(UserInfo);
    res.render("users/index", {title: "Your Cookbook", UserInfo });
}

function index(req, res) {
    res.render("index", {title: "Homepage"});
}
