const { render } = require('ejs');
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
    models.User.findOne({
        where: {
            userId: req.body.userId,
            userPw : req.body.userPw
        }
    })
    .then((db_result) => {
        if (db_result === null) {
            res.send({result: false})
        }
        else {
            res.render('index', {
                result: true,
                userName: db_result.userName
            })
        }
    })
    .catch(err => {
        console.log(err);
    })
}

exports.postSignup = (req, res) => {
    console.log(req.body);
    models.User.create({
        userId: req.body.userId,
        userPw: req.body.userPw,
        userBirth: req.body.userBirth,
        userName: req.body.userName,
    }).then((result) => {
        res.render('login');
    }).catch(err => {
        console.log(err);
    })
};



