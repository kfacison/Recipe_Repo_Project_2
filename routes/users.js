const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../config/ensureLoggedIn');
const usersCtrl = require('../controllers/users');

// GET /users/user:id
router.get('/:userId', ensureLoggedIn, usersCtrl.userIndex);


module.exports = router;