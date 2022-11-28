function idCheck() {
  const idValue = document.querySelector("#userId").value;
  if (
    idValue === "" ||
    idValue.indexOf("@") === -1 ||
    idValue.indexOf(".") === -1
  ) {
    alert("이메일 형식으로 아이디를 입력해주세요.");
    document.querySelector("#userId").value = "";
    return;
  }

  axios({
    method: "GET",
    url: "/signup/idcheck",
    params: { idValue: idValue },
  }).then((res) => {
    console.log(res.data.result);
    if (res.data.result === false) {
      document.querySelector(".idCheck").textContent = "사용 가능합니다!";
      document.querySelector(".idCheck").style.color = "green";
    } else {
      document.querySelector(".idCheck").textContent =
        "사용 중인 아이디입니다.";
      document.querySelector(".idCheck").style.color = "red";
    }
  });
}

// 유저네임 중복 체크 axios
function nameCheck() {
  const nameValue = document.querySelector("#userName").value;
  console.log(nameValue);
  if (nameValue === "") {
    alert("이름을 입력해주세요.");
    document.querySelector(".nameCheck").textContent = "";
    return;
  }

  axios({
    method: "GET",
    url: "/signup/namecheck",
    params: { nameValue: nameValue },
  }).then((res) => {
    console.log(res.data.result);
    if (res.data.result === false) {
      document.querySelector(".nameCheck").textContent = "사용 가능합니다!";
      document.querySelector(".nameCheck").style.color = "green";
      document.querySelector(".btnSignup").removeAttribute("disabled");
    } else {
      document.querySelector(".nameCheck").textContent = "사용중인 이름입니다.";
      document.querySelector(".nameCheck").style.color = "red";
    }
  });
}

function fileUpload() {
  const formData = new FormData(); // 멀티미디어 데이터는 폼데이터에 넣어서 전달
  const file = document.getElementById("userImg");
  formData.append("userImg", file.files[0]);
  console.log(formData);

  axios({
    method: "POST",
    url: "/signup/imgUpload",
    data: formData,
    headers: {
      // 멀티미디어 파일 통신시 유의!
      "Content-Type": "multipart/form-data",
    },
  }).then(function (res) {
    console.log(res);
    document.querySelector("img").src = res.data.path;
  });
}
