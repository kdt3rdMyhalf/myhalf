const express = require("express");
const app = express();
const PORT = 8000;
const session = require("express-session");
const cookieParser = require("cookie-parser");

// 뷰 엔진 설정
app.set("view engine", "ejs");
// 스태틱 파일 설정
app.use("/views", express.static(__dirname + "/views"));
app.use("/static", express.static(__dirname + "/static"));
app.use("/uploads", express.static(__dirname + "/uploads"));

// 파일 인코딩 설정
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 세션 옵션 설정
app.use(
  session({
    secret: "ourSecureKey",
    resave: false,
    saveUninitialized: true,
  })
);
// 쿠키 사용 
app.use(cookieParser());

// 라우터 연결
const indexRouter = require("./routes/index");

app.use("/", indexRouter);

// 잘못된 url 경로 처리
app.get("*", (req, res) => {
  res.render("404");
});

// 포트 연결
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});




// const server = require('http').Server(app)
// const io = require('socket.io')(server)

// app.set('views', './views')
// app.set('view engine', 'ejs')
// app.use(express.static('public'))
// app.use(express.urlencoded({ extended: true }))

// const rooms = {}

// app.get('/', (req, res) => {
//   res.render('index', { rooms: rooms })
// })

// app.post('/room', (req, res) => {
//   if (rooms[req.body.room] != null) {
//     return res.redirect('/')
//   }
//   rooms[req.body.room] = { users: {} }
//   res.redirect(req.body.room)
//   // Send message that new room was created
//   io.emit('room-created', req.body.room)
// })

// app.get('/:room', (req, res) => {
//   if (rooms[req.params.room] == null) {
//     return res.redirect('/')
//   }
//   res.render('room', { roomName: req.params.room })
// })

// server.listen(3000)

// io.on('connection', socket => {
//   socket.on('new-user', (room, name) => {
//     socket.join(room)
//     rooms[room].users[socket.id] = name
//     socket.to(room).broadcast.emit('user-connected', name)
//   })
//   socket.on('send-chat-message', (room, message) => {
//     socket.to(room).broadcast.emit('chat-message', { message: message, name: rooms[room].users[socket.id] })
//   })
//   socket.on('disconnect', () => {
//     getUserRooms(socket).forEach(room => {
//       socket.to(room).broadcast.emit('user-disconnected', rooms[room].users[socket.id])
//       delete rooms[room].users[socket.id]
//     })
//   })
// })

// function getUserRooms(socket) {
//   return Object.entries(rooms).reduce((names, [name, room]) => {
//     if (room.users[socket.id] != null) names.push(name)
//     return names
//   }, [])
// }