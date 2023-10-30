const express = require('express');
const router = express.Router();
const passport = require('passport');
const recipesRouter = require("../controllers/recipes")

router.get('/', recipesRouter.index);

module.exports = router;
