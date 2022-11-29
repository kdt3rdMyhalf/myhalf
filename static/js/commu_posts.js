// 좋아요 눌렀을 때
const postLikesBox = document.querySelector(".postLikesBox");

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

// comment input 초기화
function clearInput() {
  const form = document.forms["commentForm"];
  form.commentInput.value = "";
}

// 카테고리 적용 검색 및 보여주기
function check() {
  // 체크된 값 조회
  var checkBox = document.querySelectorAll(
    'input[name="searchCheckbox"]:checked'
  );
  // 체크된 값 resultBox에 저장
  var resultBox = [];

  if (checkBox.length < 1) {
    return alert("동물 유형을 골라주세요");
  } else {
    checkBox.forEach((checkBox) => {
      resultBox.push(checkBox.value);
    });
    axios({
      method: "POST",
      url: "/commu/posts/category",
      data: {
        resultBox: resultBox,
      },
    }).then((res) => {
      // html 재구성
      const html = res.data;

      // console.log("카테고리 응답", res.data)
      document.querySelector("html").innerHTML = "";
      document.querySelector("html").innerHTML = html;
      //체크되어 있던 값 다시 불러와서 체크
      if (resultBox.length >= 1) {
        resultBox.forEach((resultBox) => {
          document.querySelector(`input[value="${resultBox}"]`).checked = true;
        });
      }
    });
  }
}
