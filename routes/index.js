const express = require("express");
const router = express.Router();
const controller = require("../controller/Cmain");
const multer = require("multer");
const path = require("path");
const uploadDetail = multer({
  storage: multer.diskStorage({
    // done => callback 함수 (parameter a => error일떄, b => sucess일때)
    destination(req, res, done) {
      done(null, "uploads/");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname); // extname => 확장자 이름 추출하는 함수
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
      //  파일이름+확장자 => 확장자 제거 + 데이트 객체 now 삽입 + 다시 확장자 더하기
    },
  }),
  limits: { fieldSize: 5 * 1024 * 1024 },
});

router.get("/", controller.getMain);

router.get("/login", controller.getLogin);
router.get("/logout", controller.getLogout);

router.post("/user/login", controller.postLogin);
router.post(
  "/user/signup",
  uploadDetail.single("userImg"),
  controller.postSignup
);
router.get("/user/delete", controller.getUserDelete);

router.get("/signup", controller.getSignup);
router.get("/signup/idcheck", controller.getIdCheck);
router.get("/signup/namecheck", controller.getNameCheck);
router.post(
  "/signup/imgUpload",
  uploadDetail.single("userImg"),
  controller.postImgUpload
);

// 카카오
router.post("/kakaologin", controller.getKakao);

router.get("/user/mypage/:pageNum", controller.getMyPage);
router.get("/mypage-post", controller.getMyPagePost);
router.post(
  "/mypage-post",
  uploadDetail.single("userImg"),
  controller.postMyPagePost
);

// 커뮤니티 게시글 쓰기 GET
router.get("/commu/post", controller.getCommunityPostWrite);

// 커뮤니티 게시글 쓰기 POST
router.post("/commu/post", controller.postCommunityPost);

// 커뮤니티 게시글 수정 GET
router.get("/commu/update/:postId", controller.getCommunityPostUpdate);

// 커뮤니티 게시글 쓰기 POST
router.post("/commu/update", controller.postCommunityPostUpdate);

// 커뮤니티 게시글 전체 조회 GET
router.get("/commu/posts/p:pageNum", controller.getCommunityPosts);
router.get("/commu/posts/p", controller.getCommunityPostsMain);
router.get("/commu/posts/", controller.getCommunityPostsMain);

// // 커뮤니티 게시글 전체 조회 GET
// router.get("/commu/posts/p:pageNum", controller.getCommunityPosts);

// 커뮤니티 게시글 상세 조회 GET
router.get("/commu/posts/:postId", controller.getCommunityPostId);

// 커뮤니티 게시글 삭제 POST
router.post("/commu/posts/:postId/delete", controller.postCommunityDelete);

// 커뮤니티 게시글 좋아요 GET
router.post("/commu/post/likesOn", controller.postLikesOn);
router.post("/commu/post/likesOff", controller.postLikesOff);

//커뮤니티 체크박스 조회
router.get(
  "/commu/posts/category/p:pageNum",
  controller.getCommunityPostsCheckBox
);

// 댓글 쓰기 POST
// router.get("/commu/post/:postId/postcomment", controller.postCommentPostId);

// 게시글 댓글 전체 조회 GET
router.get("/commu/posts/:postId/comments", controller.getCommentsGet);

// 게시글 댓글 쓰기 POST
router.post("/commu/posts/:postId/postcomment", controller.postCommentPost);

// 게시글 댓글 수정 POST
router.post("/commu/comment/update", controller.postCommentUpdate);

// 게시글 댓글 삭제 DELETE
router.delete("/commu/posts/:postId/deletecomment", controller.deleteComment);

// 반려장터 게시글 전체 조회 GET
router.get("/market/posts", controller.getMarketPosts);

// 반려장터 게시글 상세 조회 GET
router.get("/market/posts/:marketId", controller.getMarketId);

module.exports = router;
