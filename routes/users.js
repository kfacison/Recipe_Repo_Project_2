const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users');
//const ensureLoggedIn = require('../config/ensureLoggedIn');

router.put('/user/',usersCtrl.funcName);


module.exports = router;