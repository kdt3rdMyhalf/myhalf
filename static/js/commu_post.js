// comment 작성 POST
function commentPost(postId) {
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
      const html = `      
      <div class="commentInfoBox id${data.commId}">
        <div class="commentInfoDiv1">
          <div class="commentWriter">&#128054; ${data.userName}</div>
          <div class="commentDate">${data.commDate
            .substr(0, 19)
            .replace("T", " ")}</div>
          <div class="commentsContent">${data.commDoc}</div>
        </div>
        <div class="commentInfoDiv2${data.commId}">
          <button type="button" onclick="editComment('${
            data.commId
          }')" class="commentEditBtn">수정</button>
          <button type="button" onclick="deleteComment(this, '${
            data.commId
          }')" class="commentDeleteBtn">삭제</button>
          </div>
      </div>
      `;

      comments.insertAdjacentHTML("beforeend", html);
      clearInput();
    });
}

// 좋아요, 조회수 기능
let btnSec = document.querySelector(".btnSec");
function likesOff() {
  let btnSec = document.querySelector(".btnSec");
  let postId = parseInt(document.querySelector(".postId").innerText);
  btnSec.innerHTML = `<button onclick="likesOn()" class="likesBtn">🖤</button><div class="postLikes">${
    parseInt(document.querySelector(".postLikes").innerText, 10) - 1
  }</div>`;
  axios({
    method: "post",
    url: "/commu/post/likesOff",
    data: {
      ClientPostId: postId,
    },
  }).then((result) => {
    // document.querySelector(".postLikes").innerText =
    //   parseInt(document.querySelector(".postLikes").innerText, 10) - 1;
  });
}
function likesOn() {
  let btnSec = document.querySelector(".btnSec");
  let postId = parseInt(document.querySelector(".postId").innerText);
  btnSec.innerHTML = `<button onclick="likesOff()" class="likesBtn">❤</button><div class="postLikes">${
    parseInt(document.querySelector(".postLikes").innerText, 10) + 1
  }</div>`;

  axios({
    method: "post",
    url: "/commu/post/likesOn",
    data: {
      ClientPostId: postId,
    },
  }).then((result) => {
    //   document.querySelector(".postLikes").innerText =
    //     parseInt(document.querySelector(".postLikes").innerText, 10) + 1;
  });
}

// comment input 초기화
function clearInput() {
  const form = document.forms["commentForm"];
  form.commentInput.value = "";
}

let postDoc = document.querySelector(".postDoc").innerText;
let postContent = document.querySelector(".postContent");
postContent.innerHTML = postDoc;

// 게시글 댓글 수정
function editComment(commId) {
  let commBtnBox = document.querySelector(`.commentInfoDiv2${commId}`);
  let commText = document.querySelector(
    `.id${commId} .commentsContent`
  ).textContent;
  const html = `<br>
  <input type="text" class="edit${commId}" value='${commText}'>
  <button type="button" class="commentEditBtn" onclick="editCommentDo('${commId}')">등록</button>
  <button type="button" class="commentDeleteBtn" onclick="editCommentCancel('${commId}')">취소</button>`;
  commBtnBox.innerHTML = html;
}

function editCommentCancel(commId) {
  let commBtnBox = document.querySelector(`.commentInfoDiv2${commId}`);

  const html = `
  <button type="button" class="commentEditBtn" onclick="editComment('${commId}')">수정</button>
  <button type="button" class="commentDeleteBtn" onclick="deleteComment(this, '${commId}')">삭제</button>`;

  commBtnBox.innerHTML = html;
}

function editCommentDo(commId) {
  let commValue = document.querySelector(`.edit${commId}`).value;
  let now = new Date().toISOString().slice(0, 19).replace("T", " ");

  axios({
    method: "POST",
    url: "/commu/comment/update",
    data: {
      commId: commId,
      commValue: commValue,
      commDate: now,
    },
  }).then((result) => {
    let commBtnBox = document.querySelector(`.commentInfoDiv2${commId}`);
    let commText = document.querySelector(`.id${commId} .commentsContent`);
    let commentDate = document.querySelector(`.id${commId} .commentDate`);
    commText.innerText = `${commValue}`;
    commentDate.innerText = `${now}`;
    commBtnBox.innerHTML = `
    <button type="button" class="commentEditBtn" onclick="editComment('${commId}')">수정</button>
    <button type="button" class="commentDeleteBtn" onclick="deleteComment(this, '${commId}')">삭제</button>`;
  });
}

// 게시글 댓글 삭제
async function deleteComment(obj, commId) {
  if (!confirm("댓글을 삭제하시겠습니까?")) {
    return;
  }

  axios({
    method: "DELETE",
    url: `/commu/posts/:postId/deletecomment`,
    data: {
      commId: commId,
    },
  })
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      alert(data);
      obj.parentElement.parentElement.remove();
    });
}
