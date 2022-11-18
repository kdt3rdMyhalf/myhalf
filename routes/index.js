const express = require('express');
const router = express.Router();
const controller = require('../controller/Cmain');
const multer = require('multer');
const path = require('path');
const uploadDetail = multer({
    storage: multer.diskStorage({
        // done => callback 함수 (parameter a => error일떄, b => sucess일때)
        destination(req, res, done){
            done(null, 'uploads/');
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname); // extname => 확장자 이름 추출하는 함수
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
            //  파일이름+확장자 => 확장자 제거 + 데이트 객체 now 삽입 + 다시 확장자 더하기
        },
    }),
    limits: {fieldSize: 5 * 1024 * 1024},
});

router.get('/', controller.getMain);


router.get('/login',controller.getLogin);

router.post('/user/login', controller.postLogin);
router.post('/user/signup', uploadDetail.single('userImg'), controller.postSignup);


router.post('/user/login/', controller.postLogin);

router.get('/signup', controller.getSignup);
router.get('/signup/idcheck', controller.getIdCheck);

router.get('/signup/namecheck', controller.getNameCheck);

router.post('/signup/imgUpload', uploadDetail.single('userImg'), controller.postImgUpload);
module.exports = router;