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

router.get("/signup", controller.getSignup);
router.get("/signup/idcheck", controller.getIdCheck);
router.get("/signup/namecheck", controller.getNameCheck);
router.post(
  "/signup/imgUpload",
  uploadDetail.single("userImg"),
  controller.postImgUpload
);

router.get("/user/mypage", controller.getMyPage);

router.get("/commu", controller.getCommunity);
router.get("/commu/post", controller.getCommunityPost);
router.post("/commu/post", controller.postCommunityPost);

// 커뮤니티 게시글 전체 조회
router.get("/commu/posts", controller.getCommunityPosts);

// 커뮤니티 게시글 상세 조회
router.get("/commu/posts/:postId", controller.getCommunityPostId);

// 반려장터 페이지

// router.patch('/commu/post/edit', controller.patchPost); // 하나 수정

// router.delete('/commu/post/delete', controller.deletePost); // 하나 삭제

module.exports = router;
