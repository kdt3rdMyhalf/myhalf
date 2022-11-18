const models = require('../models');

exports.getMain = (req, res) => {
    res.render('index');
}

exports.getLogin = (req, res) => {
    res.render('login');
}

exports.getSignup = (req, res) => {
    res.render('signup');
}
exports.getPost = (req, res) => {
    res.render('post');
}