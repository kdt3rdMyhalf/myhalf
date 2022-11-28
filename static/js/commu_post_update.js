var quill = new Quill("#editor", {
  modules: {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      ["image", "code-block"],
    ],
  },
  placeholder: "여기에 게시글을 작성해주세요",
  theme: "snow",
});
// quill innercontent 설정
postDoc = document.querySelector(".postDoc").textContent;
quill.root.innerHTML = postDoc;

// Quill data axios 비동기 통신
function postUpdate() {
  const form = document.forms["postForm"];
  const postId = document.querySelector(".postId").textContent;
  axios({
    method: "post",
    url: "/commu/update",
    data: {
      postId: postId,
      title: form.title.value,
      doc: quill.root.innerHTML,
      category: form.category.value,
      tag: form.tag.value,
    },
  }).then(() => {
    alert("수정 완료!");
  });
  window.location = "/commu/posts";
}
