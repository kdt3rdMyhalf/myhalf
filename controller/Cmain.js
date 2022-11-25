const models = require("../models");

exports.getMain = (req, res) => {
  const userSession = req.session.user;
  console.log("main userSession: ", userSession);

  if (userSession !== undefined) {
    res.render("index", {
      result: true,
      userName: userSession.userName,
      userImg: userSession.userImg,
    });
  } else {
    res.render("index", { result: false });
  }
};

exports.getLogin = (req, res) => {
  res.render("login");
};

exports.getSignup = (req, res) => {
  res.render("signup");
};

exports.postLogin = (req, res) => {
  console.log(req.body);
  models.User.findOne({
    where: {
      userId: req.body.userId,
      userPw: req.body.userPw,
    },
  })
    .then((db_result) => {
      if (db_result === null) {
        res.render("login", { result: false });
      } else {
        req.session.user = {
          result: true,
          userName: db_result.userName,
          userImg: db_result.userImg,
          userId: db_result.userId,
          userBirth: db_result.userBirth,
        };
        res.redirect("/");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getLogout = (req, res) => {
  let session = req.session;
  if (session.user) {
    session.destroy();
    res.redirect("/");
  } else {
    res.redirect("/");
  }
};

exports.getUserDelete = (req, res) => {
  models.User.destroy({ where: { userId: req.session.user.userId } });
  req.session.destroy();
  res.redirect("/");
};

exports.postImgUpload = async (req, res) => {
  res.send({ path: req.file.path });
};

exports.postSignup = (req, res) => {
  if (req.file === undefined) {
    models.User.create({
      userId: req.body.userId,
      userPw: req.body.userPw,
      userBirth: req.body.userBirth,
      userName: req.body.userName,
      userImg: "https://t1.daumcdn.net/cfile/tistory/2513B53E55DB206927",
    })
      .then((result) => {
        res.render("login");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    models.User.create({
      userId: req.body.userId,
      userPw: req.body.userPw,
      userBirth: req.body.userBirth,
      userName: req.body.userName,
      userImg: "/" + req.file.path,
    })
      .then((result) => {
        res.render("login");
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

exports.getMyPage = (req, res) => {
  const userSession = req.session.user;

  if (userSession !== undefined) {
    models.Community.findAll({
      where: { userName: userSession.userName },
    })
      .then((result) => {
        res.render("mypage", {
          result: true,
          userId: userSession.userId,
          userName: userSession.userName,
          userBirth: userSession.userBirth,
          userImg: userSession.userImg,
          userPost: result,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.render("index", { result: false });
  }
};

exports.getMyPagePost = (req, res) => {
  const userSession = req.session.user;
  if (userSession !== undefined) {
    res.render("mypage_post", {
      result: true,
      userId: userSession.userId,
      userName: userSession.userName,
      userBirth: userSession.userBirth,
      userImg: userSession.userImg,
    });
  } else {
    res.redirect("/");
  }
};
// mypage의 유저 정보 수정 POST
exports.postMyPagePost = (req, res) => {
  const userSession = req.session.user;
  console.log("req.body", req.body);
  console.log("req.file", req.file);
  if (req.file === undefined) {
    models.User.update(
      {
        userId: req.body.userId,
        userName: req.body.userName,
        userBirth: req.body.userBirth,
      },
      { where: { userId: userSession.userId } }
    )
      .then((result) => {
        res.redirect("/");
        req.session.destroy();
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    models.User.update(
      {
        userId: req.body.userId,
        userName: req.body.userName,
        userBirth: req.body.userBirth,
        userImg: req.file.path,
      },
      { where: { userId: userSession.userId } }
    )
      .then((result) => {
        res.redirect("/");
        req.session.destroy();
      })
      .catch((err) => {
        console.error(err);
      });
  }
};

exports.getIdCheck = (req, res) => {
  models.User.findOne({
    where: { userId: req.query.idValue },
  })
    .then((result) => {
      if (result === null) {
        res.send({ result: false });
      } else {
        res.send({ result: true });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getNameCheck = (req, res) => {
  console.log(req.query);
  models.User.findOne({
    where: { userName: req.query.nameValue },
  })
    .then((result) => {
      if (result === null) {
        res.send({ result: false });
      } else {
        res.send({ result: true });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCommunity = (req, res) => {
  res.render("commu");
};

// 커뮤니티 게시글 전체 조회 GET
exports.getCommunityPosts = (req, res) => {
  models.Community.findAll().then((result) => {
    res.render("commu_posts", { data: result });
  });
};

// 커뮤니티 게시글 상세 조회 GET
exports.getCommunityPostId = async (req, res) => {
  let resultPost = await models.Community.findOne({
    where: { postId: req.params.postId },
    raw: true,
  });
  // result2
  // models.Comment.findAll().then((result) => {
  // res.send({ commentData: result });
  let resultComment = await models.Comment.findAll({ raw: true }); // postId 찾아서 조건 걸기
  console.log(">>>>>>>>", resultComment);

  res.render("commu_post", {
    postData: resultPost,
    commentData: resultComment,
  });
  //   models.Community.findOne({
  //     where: { postId: req.params.postId },
  //     raw: true,
  //   }).then((result) => {
  //     // console.log("result console>>>", result);
  //     res.render("commu_post", { data: result });
  //   });
};

// 커뮤니티 게시글 작성 GET
exports.getCommunityPostWrite = (req, res) => {
  const userSession = req.session.user;
  console.log(userSession);
  if (userSession !== undefined) {
    res.render("commu_post_write", {
      result: true,
      userId: userSession.userId,
      userName: userSession.userName,
      userBirth: userSession.userBirth,
      userImg: userSession.userImg,
    });
  } else {
    models.Community.findAll().then((result) => {
      res.render("commu_posts", { data: result, result: false });
    });
  }
};

// 커뮤니티 게시글 작성 POST
exports.postCommunityPost = (req, res) => {
  const userSession = req.session.user;
  let now = new Date().toISOString().slice(0, 19).replace("T", " ");
  models.Community.create({
    userName: userSession.userName,
    postDate: now,
    postTitle: req.body.title,
    postDoc: req.body.doc,
    postViews: 0,
    postLikes: 0,
    postCategory: req.body.category,
    postTag: req.body.tag,
    // userImg: ,
  })
    .then((result) => {})
    .catch((err) => {
      console.log(err);
    });
};

// 커뮤니티 게시글 댓글보기 GET
exports.getCommentsGet = (req, res) => {
  const userSession = req.session.user;
  console.log(userSession);
  console.log("comment >>>>>>", req.params);

  models.Comment.findAll().then((result) => {
    res.send({ commentData: result });
    // res.render("commu_post", { commentData: result });
  });
};

// 커뮤니티 게시글 댓글 쓰기 POST
exports.postCommentPost = (req, res) => {
  const userSession = req.session.user;
  console.log("userSession >>>", userSession);
  let now = new Date().toISOString().slice(0, 19).replace("T", " ");
  console.log("req.body >>>> ", req.body.comment);
  models.Comment.create({
    userName: userSession.userName,
    commDate: now,
    commDoc: req.body.comment,
    postId: 1,
  })
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
