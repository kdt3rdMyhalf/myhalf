const express = require('express');
const router = express.Router();
const controller = require('../controller/Cmain');

router.get('/', controller.getMain);


router.get('/login',controller.getLogin);

router.get('/signup',controller.getSignup);

module.exports = router;