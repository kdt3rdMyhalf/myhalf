const { render } = require('ejs');
const models = require('../models');



exports.getMain = (req, res) => {
    res.render('index', {result: false });
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
                userName: db_result.userName,
                userImg : db_result.userImg,
            })
        }
    })
    .catch(err => {
        console.log(err);
    })
}



exports.postImgUpload = async (req, res) => {
    console.log(req.file);
    res.send({path : req.file.path});
}

exports.postSignup = (req, res) => {
    console.log("req.body: ", req.body);
    console.log("req.file: ", req.file);
    models.User.create({
        userId: req.body.userId,
        userPw: req.body.userPw,
        userBirth: req.body.userBirth,
        userName: req.body.userName,
        userImg: "/" + req.file.path,
    }).then((result) => {
        res.render('login');
    }).catch(err => {
        console.log(err);
    })
};


