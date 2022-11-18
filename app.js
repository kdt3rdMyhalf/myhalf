const express = require('express');
const app = express();
const PORT = 8000;

// 뷰 엔진 설정
app.set('view engine', 'ejs');
// 스태틱 파일 설정
app.use('/views', express.static(__dirname + '/views'));
app.use('/static', express.static(__dirname + '/static'));
app.use('/uploads', express.static(__dirname + '/uploads'));

// 파일 인코딩 설정
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// 라우터 연결
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// 잘못된 url 경로 처리
app.get('*', (req, res) => {
    res.render('404');
})

// 포트 연결
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})