const models = require("../models");
const { Op } = require("sequelize");

exports.getMain = (req, res) => {
  const userSession = req.session.user;
  console.log("main userSession: ", userSession);

  if (userSession !== undefined) {
    res.render("index", {
      isUserSession: true,
      userName: userSession.userName,
      userImg: userSession.userImg,
    });
  } else {
    res.render("index", { isUserSession: false });
  }
};

// flag값을 login.html로 보냄
exports.getLogin = (req, res) => {
  res.render("login");
};

exports.getSignup = (req, res) => {
  res.render("signup");
};

// 카카오
exports.getKakao = (req, res) => {
  console.log(req.body);
  models.User.findOne({
    where: {
      userId: req.body.userId,
    },
  })
    .then((db_result) => {
      if (db_result === null) {
        //카카오 회원가입
        models.User.create({
          userId: req.body.userId,
          userPw: req.body.userId,
          userBirth: "2222-02-22",
          userName: req.body.userName,
          userImg: req.body.userImg,
        }).then(() => {
          //세션
          req.session.user = {
            result: true,
            userName: req.body.userName,
            userImg: req.body.userImg,
            userId: req.body.userId,
            userBirth: req.body.userBirth,
          };

          res.redirect("/");
        });
      } else {
        req.session.user = {
          isUserSession: true,
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
        // res.render("index", { result: false});
        //         console.log('nonononono')
        res.send(`<script>
        alert('로그인에 실패하였습니다.')
        document.location.href = '/'
        </script>`);
      } else {
        req.session.user = {
          isUserSession: true,
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
  if (req.file === undefined) {
  } else {
    res.send({ path: req.file.path });
  }
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
        res.redirect("/");
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
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

exports.getMyPage = (req, res) => {
  const userSession = req.session.user;
  let pageNum = req.params.pageNum
  let offset = 10 * (pageNum - 1);
  
  if (userSession !== undefined) {
    models.Community.findAndCountAll({
      where: { userName: userSession.userName },
      offset: offset,
      limit: 10
    })
      .then((result) => {
        res.render("mypage", {
          isUserSession: true,
          userId: userSession.userId,
          userName: userSession.userName,
          userBirth: userSession.userBirth,
          userImg: userSession.userImg,
          userPost: result,
          rows : result.rows,
          count : result.count
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.render("index", { isUserSession: false });
  }
};

exports.getMyPagePost = (req, res) => {
  const userSession = req.session.user;
  if (userSession !== undefined) {
    res.render("mypage_post", {
      isUserSession: true,
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
exports.getCommunityPostsMain = (req, res) => {
  let userSession = req.session.user;
  let pageNum = 1;
  let offset = 0;
  offset = 10 * (pageNum - 1);

  let result = {};

  if (userSession) {
    result["isUserSession"] = true;
  } else {
    result["isUserSession"] = false;
  }

  models.Community.findAll({
    limit: 9,
    order: [["postViews", "DESC"]],
  }).then((db_result) => {
    result["hotPost"] = db_result;
    models.Community.findAll().then((db_result) => {
      result["ordinaryPost"] = db_result;
      models.Community.findAndCountAll({
        offset: offset,
        limit: 10,
      }).then((db_result) => {
        result["rows"] = db_result.rows;
        result["count"] = db_result.count;
        console.log("result obj: ", result);
        res.render("commu_posts", { data: result });
      });
    });
  });
};

exports.getCommunityPosts = (req, res) => {
  let pageNum = req.params.pageNum;
  let offset = 0;
  offset = 10 * (pageNum - 1);
  let userSession = req.session.user;
  let result = {};

  if (userSession) {
    result["isUserSession"] = true;
  } else {
    result["isUserSession"] = false;
  }

  models.Community.findAll({
    limit: 9,
    order: [["postViews", "DESC"]],
  }).then((db_result) => {
    result["hotPost"] = db_result;
    models.Community.findAll().then((db_result) => {
      result["ordinaryPost"] = db_result;
      models.Community.findAndCountAll({

    offset: offset,
    limit: 10,
    order: [["postId", "ASC"]]
    }).then((db_result) => {
        result['rows'] = db_result.rows;
        result['count'] = db_result.count;
        console.log("result: ", result);

        res.render("commu_posts", { data: result });
      });
    });
  });
};

// cookie value로 설정할 사용자 ip주소 얻어오는 함수
function getUserIP(req) {
  const addr = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  return addr;
}

// 커뮤니티 게시글 상세 조회 GET

exports.getCommunityPostId = (req, res) => {
  const userSession = req.session.user;
  let result = {};

  // 조회수 기능

  // 쿠키 설정
  if (req.cookies["C" + req.params.postId] == undefined) {
    // key, value, 옵션을 설정해준다.
    res.cookie("C" + req.params.postId, getUserIP(req), {
      // 유효시간 : 360분
      maxAge: 1000,
    });
    models.Community.increment(
      { postViews: 1 },
      { where: { postId: req.params.postId } }
    ).then((result) => {
      console.log("포스트뷰 증가!: ", result);
      // 조회수 증가 쿼리
    });
  }

  // 유저 세션이 없으면
  if (userSession === undefined) {
    result["isUserSession"] = false;
    models.Likes.findAll({ where: { postId: req.params.postId } }).then(
      (post_result) => {
        result["likes"] = post_result.length;
        models.Comment.findAll({
          raw: true,
          where: { postId: req.params.postId },
        }).then((db_result) => {
          result["commentData"] = db_result;
          models.Community.findOne({
            where: { postId: req.params.postId },
            raw: true,
          }).then((db_result) => {
            // res.send(result);
            result["postInfo"] = db_result;
            models.User.findOne({
              where: { userName: db_result.userName },
            }).then((userResult) => {
              console.log("유저 조회", userResult);

              result["userImg"] = userResult.userImg;
              console.log("최종 보내는 result객체: ", result);
              res.render("commu_post", { result: result });
            });
          });
        });
      }
    );
  }
  //  유저 세션이 존재하면
  else {
    result["isUserSession"] = true;
    result["userName"] = userSession.userName;
    // 접속 유저 좋아요 기록 확인
    models.Likes.findAll({
      where: { userName: userSession.userName, postId: req.params.postId },
    }).then((name_result) => {
      result["userLikes"] = name_result.length;
      console.log("접속 유저 좋아요 기록: ", name_result);
      // 게시글 좋아요 기록 확인
      models.Likes.findAll({ where: { postId: req.params.postId } }).then(
        (post_result) => {
          result["likes"] = post_result.length;
          console.log("게시글 좋아요 기록: ", post_result);
          // 댓글 조회
          models.Comment.findAll({
            where: { postId: req.params.postId },
            raw: true,
          }).then((db_result) => {
            result["commentData"] = db_result;
            // 게시글 조회
            models.Community.findOne({
              where: { postId: req.params.postId },
              raw: true,
            }).then((db_result) => {
              // res.send(result);
              result["postInfo"] = db_result;
              models.User.findOne({
                where: { userName: db_result.userName },
              }).then((userResult) => {
                console.log(userResult);
                result["userImg"] = userResult.userImg;
                console.log("최종 보내는 result객체: ", result);
                res.render("commu_post", { result: result });
              });
            });
          });
        }
      );
    });
  }
};

// 커뮤니티 게시글 체크박스적용 조회 GET
exports.getCommunityPostsCheckBox = (req, res) => {
  console.log(req.query);
  let pageNum = req.params.pageNum;
  let offset = 0;
  offset = 10 * (pageNum - 1);

  let searchCheck = req.query.searchCheckbox
  if (searchCheck == undefined) return;


  models.Community.findAndCountAll({
    offset: offset,
    limit: 10,
    // where: { [Op.or]: [{ [Op.like]: '%' + searchInput + '%' }, {postCategory: searchCheck}] },
    where: { postCategory: searchCheck },
    raw: true,
  }).then((result) => {
    res.render("category", {
      data: result,
    });
    console.log("data: ", result);
  });
};

// cookie value로 설정할 사용자 ip주소 얻어오는 함수
function getUserIP(req) {
  const addr = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  return addr;
}

exports.postLikesOff = (req, res) => {
  const userSession = req.session.user;
  console.log(req.body, userSession);
  models.Likes.destroy({
    where: {
      postId: req.body.ClientPostId,
      userName: userSession.userName,
    },
  }).then(() => {
    res.send("삭제 성공!");
  });
};

exports.postLikesOn = (req, res) => {
  const userSession = req.session.user;
  console.log(req.body, userSession);
  models.Likes.create({
    postId: req.body.ClientPostId,
    userName: userSession.userName,
  }).then(() => {
    res.send("생성 성공!");
  });
};

// 커뮤니티 게시글 작성 GET
exports.getCommunityPostWrite = (req, res) => {
  const userSession = req.session.user;
  console.log(userSession);
  if (userSession !== undefined) {
    res.render("commu_post_write", {
      isUserSession: true,
      userId: userSession.userId,
      userName: userSession.userName,
      userBirth: userSession.userBirth,
      userImg: userSession.userImg,
    });
  } else {
    models.Community.findAll().then((result) => {
      res.send("<script>alert('로그인 해주세요!');window.location='/commu/posts';</script>");
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
    postCategory: req.body.category,
    postTag: req.body.tag,
    // userImg: ,
  })
    .then((result) => {})
    .catch((err) => {
      console.log(err);
    });
};

// 커뮤니티 게시글 수정 페이지 로드 GET
exports.getCommunityPostUpdate = (req, res) => {
  const userSession = req.session.user;
  if (userSession !== undefined) {
    models.Community.findOne({
      where: { postId: req.params.postId },
      raw: true,
    }).then((db_result) => {
      console.log(db_result);
      res.render("commu_post_update", {
        postInfo: db_result,
        isUserSession: true,
      });
    });
  } else {
    models.Community.findOne({
      where: { postId: req.params.postId },
      raw: true,
    }).then((db_result) => {
      console.log(db_result);
      res.render("commu_post_update", {
        postInfo: db_result,
        isUserSession: false,
      });
    });
  }
};

// 커뮤니티 게시글 수정 POST
exports.postCommunityPostUpdate = (req, res) => {
  const userSession = req.session.user;
  let now = new Date().toISOString().slice(0, 19).replace("T", " ");

  models.Community.update(
    {
      postDate: now,
      postTitle: req.body.title,
      postDoc: req.body.doc,
      postCategory: req.body.category,
      postTag: req.body.tag,
      // userImg: ,
    },
    { where: { postId: req.body.postId } }
  )
    .then((result) => {
      console.log("게시글 업데이트");
    })
    .catch((err) => {
      console.log(err);
    });
};

// 커뮤니티 게시글 삭제 POST
exports.postCommunityDelete = (req, res) => {
  models.Community.destroy({ where: { postId: req.params.postId } }).then(
    (db_result) => {
      console.log(db_result);
      res.redirect("/commu/posts");
    }
  );
};

// 커뮤니티 게시글 댓글 전체 조회 GET
exports.getCommentsGet = (req, res) => {
  const userSession = req.session.user;
  console.log(userSession);
  console.log("comment >>>>>>", req.params.postId);

  models.Comment.findAll({ where: { postId: req.params.postId } }).then(
    (result) => {
      res.send({ commentData: result });
      // res.render("commu_post", { commentData: result });
    }
  );
};

// 커뮤니티 게시글 댓글 쓰기 POST
exports.postCommentPost = (req, res) => {
  const userSession = req.session.user;
  let now = new Date().toISOString().slice(0, 19).replace("T", " ");
  console.log("req.body >>>> ", req.body);
  models.Comment.create({
    userName: userSession.userName,
    commDate: now,
    commDoc: req.body.comment,
    postId: req.body.postId,
  })
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

// 커뮤니티 게시글 댓글 수정 PATCH
exports.postCommentUpdate = (req, res) => {
  let now = new Date().toISOString().slice(0, 19).replace("T", " ");
  models.Comment.update(
    {
      commDoc: req.body.commValue,
      commDate: now,
    },
    {
      where: { commId: req.body.commId },
    }
  )
    .then((db_result) => {
      console.log("수정 성공", db_result);
      res.send("성공 굳");
    })
    .catch((err) => {
      console.log(err);
    });
};

// 커뮤니티 게시글 댓글 삭제
exports.deleteComment = (req, res) => {
  const userSession = req.session.user;
  models.Comment.destroy({ where: { commId: req.body.commId } })
    .then((result) => {
      console.log("destroy >> ", result);
      res.send("댓글이 삭제되었습니다.");
    })
    .catch((err) => {
      console.log(err);
    });
};

// 반려장터 게시글 전체조회 GET
exports.getMarketPosts = (req, res) => {
  models.Market.findAll().then((result) => {
    res.render("market_posts", { data: result });
  });
};

// 반려장터 게시글 상세조회 GET
exports.getMarketId = (req, res) => {
  const userSession = req.session.user;
  models.Market.findOne({
    where: { marketId: req.params.marketId },
    raw: true,
  }).then((result) => {
    res.render("market_post", { data: result });
  });
};
