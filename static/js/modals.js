const modal = document.querySelector('#myModal');
const modalBtn = document.querySelector('#modalBtn');
const closeBtn = document.querySelector('.close');

// Events
modalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

// Open
function openModal() {
  modal.style.display = 'block';
}

// Close
function closeModal() {
  modal.style.display = 'none';
}

// Close If Outside Click
function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}

function signup() {
    var userPw = document.getElementById('userPw').value;
    var userPwCheck = document.getElementById('userPwCheck').value;
        if( userPw != userPwCheck ) {
            userPwCheck.setCustomValidity("패스워드 불일치");
        }
    else{
            userPwCheck.setCustomValidity('');
        }
    }
    // <!-- 아이디 중복 체크 axios -->
        function idCheck() {
            const idValue = document.querySelector('#userId').value
            if(idValue === '' || idValue.indexOf('@') === -1 || idValue.indexOf('.') === -1){
            alert('이메일 형식으로 아이디를 입력해주세요.');
            document.querySelector('#userId').value = '';
            return}
        axios({
            method: 'GET',
            url: '/signup/idcheck',
            params: { idValue: idValue }
        }).then((res) => {
            console.log(res.data.result);
            if (res.data.result === false) {
                document.querySelector('.idCheck').textContent = '아이디 사용 가능!'
                document.querySelector('.idCheck').style.color = 'green'
            }else {
                document.querySelector('.idCheck').textContent = '사용중인 아이디입니다.'
                document.querySelector('.idCheck').style.color = 'red'
            }
        });
        };
    // 유저네임 중복 체크 axios
    function nameCheck() {
            const nameValue = document.querySelector('#userName').value
            console.log(nameValue)
        if(nameValue === ''){
            alert('유저네임을 입력해주세요.');
            document.querySelector('.nameCheck').textContent = ''
            return
        };
        axios({
            method: 'GET',
            url: '/signup/namecheck',
            params: { nameValue: nameValue }
        }).then((res) => {
            console.log(res.data.result);
            if (res.data.result === false) {
                document.querySelector('.nameCheck').textContent = '유저네임 사용 가능!'
                document.querySelector('.nameCheck').style.color = 'green'
                document.querySelector('.btnSignup').removeAttribute('disabled')
            }
            else {
                document.querySelector('.nameCheck').textContent = '사용중인 유저네임입니다.'
                document.querySelector('.nameCheck').style.color = 'red'
            }
        });
    };
        function fileUpload() {
            console.log("uploading~!");
            const formData = new FormData(); // 멀티미디어 데이터는 폼데이터에 넣어서 전달
            const file = document.getElementById('userImg');
            formData.append('userImg', file.files[0]);
            console.log(formData);
            axios({
                method: "POST",
                url : '/signup/imgUpload',
                data : formData,
                headers: {
                    // 멀티미디어 파일 통신시 유의!
                    'Content-Type' : 'multipart/form-data',
                },
            })
            .then(function (res) {
                console.log(res);
                document.querySelector('img').src = res.data.path;
            })
        }