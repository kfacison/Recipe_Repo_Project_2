const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// GET /users/user:id
router.get('/:userId', ensureLoggedIn, usersCtrl.userIndex);


module.exports = router;