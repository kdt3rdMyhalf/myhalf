const express = require('express');
const router = express.Router();
const controller = require('../controller/Cmain');

router.get('/', controller.getMain);


router.get('/login',controller.getLogin);

router.post('/user/login', controller.postLogin);
router.post('/user/signup', controller.postSignup);

router.post('/user/login/', controller.postLogin);

router.get('/signup', controller.getSignup);
router.get('/signup/idcheck', controller.getIdCheck);

router.get('/signup/namecheck', controller.getNameCheck);

module.exports = router;