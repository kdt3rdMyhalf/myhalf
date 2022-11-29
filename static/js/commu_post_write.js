// let quillData =
// editor Quill 불러오는 코드

var quill = new Quill("#editor", {
  modules: {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      ["image", "code-block"],
    ],
  },
  placeholder: "글 내용을 작성해 주세요",
  theme: "snow",
});

const form = document.forms["postForm"];

// Quill data axios 비동기 통신
function postPost() {
  if (!form.title.value.length) {
    alert("제목을 입력해주세요!");
    return;
  }
  axios({
    method: "post",
    url: "/commu/post",
    data: {
      title: form.title.value,
      doc: quill.root.innerHTML,
      category: form.category.value,
      tag: form.tag.value,
    },
  });
  window.location = "/commu/posts";
}
