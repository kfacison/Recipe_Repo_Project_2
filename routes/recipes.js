const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../config/ensureLoggedIn');
const recipesRouter = require("../controllers/recipes")

router.get('/', recipesRouter.index);

router.get('/new', ensureLoggedIn, recipesRouter.new);

router.post('/', ensureLoggedIn, recipesRouter.create);

module.exports = router;
