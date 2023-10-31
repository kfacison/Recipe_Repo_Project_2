const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../config/ensureLoggedIn');
const recipesRouter = require("../controllers/recipes")

router.get('/', recipesRouter.index);

router.get('/new', ensureLoggedIn, recipesRouter.new);
router.get('/:recipesId', ensureLoggedIn, recipesRouter.show);
router.post('/', ensureLoggedIn, recipesRouter.create);
router.put('/recipes/:recipesId', ensureLoggedIn, recipesRouter.new);

module.exports = router;
