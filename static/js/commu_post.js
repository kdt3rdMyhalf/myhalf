// 좋아요 눌렀을 때
const postLikesBox = document.querySelector(".postLikesBox");

const postLikesFill = postLikesBox.addEventListener("click", () => {
  const postLikesHeart = document.querySelector(".postLikesHeart");
  postLikesHeart.innerHTML = "♥︎";
});

// comment 목록 조회 GET
// function commentGet(postId) {
//   console.log("click");
//   axios({
//     method: "GET",
//     url: `/commu/posts/${Number(postId)}`,
//     // data: data,
//     success: (data) => {
//       console.log(data);
//     },
//   });
// }

// comment 작성 POST
function commentPost(postId) {
  console.log("click");

  const comments = document.querySelector(".comments");
  const form = document.forms["commentForm"];
  if (!form.commentInput.value.length) {
    alert("내용을 입력해 주세요!");
    clearInput();
    return;
  }

  axios({
    method: "POST",
    url: "/commu/posts/:postId/postcomment",
    data: {
      comment: form.commentInput.value,
      postId: postId,
    },
  })
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      console.log("data>>>", data);

      const html = `      
      <div class="commentInfoBox">
        <div class="commentInfoDiv1">
          <div class="commentWriter">${data.userName}</div>
          <div class="commentDate">${data.commDate}</div>
        </div>
        <div class="commentInfoDiv2">
          <button type="button" class="commentEditBtn">수정</button>
          <button type="button" class="commentDeleteBtn">삭제</button>
        </div>
      </div>
      <div class="commentsContent">${data.commDoc}</div>`;

      comments.insertAdjacentHTML("beforeend", html);
      clearInput();
    });
}

// 좋아요, 조회수 기능
function likesOff() {
  let btn = document.querySelector(".btn");
  let postId = parseInt(document.querySelector(".postId").innerText);
  btn.innerHTML =
    '<button onclick="likesOn()" class="likesBtn">❤하트 안 누름!</button>';
  axios({
    method: "post",
    url: "/commu/post/likesOff",
    data: {
      ClientPostId: postId,
    },
  }).then((result) => {
    console.log(result);
    document.querySelector(".resultLikes").innerText =
      parseInt(document.querySelector(".resultLikes").innerText, 10) - 1;
  });
}
function likesOn() {
  let totalLikes = document.querySelector(".resultLikes").innerText;
  let btn = document.querySelector(".btn");
  let postId = parseInt(document.querySelector(".postId").innerText);
  btn.innerHTML =
    '<button onclick="likesOff()" class="likesBtn">❤하트 이미 누름!</button>';
  axios({
    method: "post",
    url: "/commu/post/likesOn",
    data: {
      ClientPostId: postId,
    },
  }).then((result) => {
    console.log(result);
    document.querySelector(".resultLikes").innerText =
      parseInt(document.querySelector(".resultLikes").innerText, 10) + 1;
  });
}

// comment input 초기화
function clearInput() {
  const form = document.forms["commentForm"];
  form.commentInput.value = "";
}
