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


exports.postImgUpload = async (req, res) => {
    const img = req.file.path;
    console.log(req.file);
    if (img === undefined) {
        return res.send('이미지가 없어용');
    }
    res.send({path : req.file.path});
}