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

exports.postLogin = (req, res) => {
    console.log(req.body);
    models.User.findAll().then((result) => {
        console.log(result);
    }).catch(err => {
        console.log(err);
    })
}