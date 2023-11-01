const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../config/ensureLoggedIn');
const recipesRouter = require("../controllers/recipes")

//all recipes page
router.get('/', recipesRouter.index);

//new recipe page
router.get('/new', ensureLoggedIn, recipesRouter.new);
//recipie details page
router.get('/:recipesId', ensureLoggedIn, recipesRouter.show);
// create new recipe
router.post('/', ensureLoggedIn, recipesRouter.create);
//new recipe page to make edits
router.get('/:recipesId/edit', ensureLoggedIn, recipesRouter.new);
//update recipe
router.put('/:recipesId', ensureLoggedIn, recipesRouter.update);
//delete recipie
router.delete('/:recipesId', ensureLoggedIn, recipesRouter.delete);

module.exports = router;
