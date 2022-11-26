// let quillData =
// editor Quill 불러오는 코드
let check = document.querySelector(".check");
check.addEventListener("click", () => {
  console.log(quill.root.innerHTML);
});

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
// Quill data axios 비동기 통신
function postPost() {
  const form = document.forms["postForm"];

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
