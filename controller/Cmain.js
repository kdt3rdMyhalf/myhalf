const { render } = require('ejs');
const models = require('../models');




exports.getMain = (req, res) => {
    const userSession = req.session.user;
    console.log("main userSession: ", userSession);
    
    if (userSession !== undefined) {
        res.render('index', {
            result : true,
            userName : userSession.userName,
            userImg : userSession.userImg,
        })
    } 
    else {
        res.render('index', { result: false });
    }
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
            req.session.user = {
                result: true,
                userName : db_result.userName,
                userImg : db_result.userImg,
                userId : db_result.userId,
                userBirth: db_result.userBirth,
            }
            res.redirect('/')
        }
    })
    .catch(err => {
        console.log(err);
    })
}

exports.getLogout = (req, res) => {
    let session = req.session;
    if (session.user){
        session.destroy();
        res.redirect('/');
    }
    else {
        res.redirect('/');
    }
}


exports.postImgUpload = async (req, res) => {
    res.send({path : req.file.path});
}

exports.postSignup = (req, res) => {
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


exports.getMyPage = (req, res) => {
    const userSession = req.session.user;
    
    if (userSession !== undefined) {
        res.render('mypage', {
            result : true,
            userId : userSession.userId,
            userName : userSession.userName,
            userBirth : userSession.userBirth,
            userImg : userSession.userImg,
        })
    } 
    else {
        res.render('index', { result: false });
    }
}


exports.getIdCheck = (req, res) => {
    models.User.findOne({
        where: { userId: req.query.idValue }
    }).then((result) => {
        if (result === null) {
            res.send({result: false})
        }
        else {
            res.send({ result: true });
        }
    })
    .catch(err => {
        console.log(err);
    })
};

exports.getNameCheck = (req, res) => {
    console.log(req.query);
    models.User.findOne({
        where: { userName: req.query.nameValue }
    }).then((result) => {
        if (result === null) {
            res.send({result: false})
        }
        else {
            res.send({ result: true });
        }
    })
    .catch(err => {
        console.log(err);
    })
};



