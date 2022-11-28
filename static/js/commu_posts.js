// 카테고리 적용 검색 및 보여주기
function check() {
    // 체크된 값 조회
    var checkBox = document.querySelectorAll('input[name="searchCheckbox"]:checked');
    // 체크된 값 resultBox에 저장
    var resultBox = []

    if (checkBox.length < 1) {
        return alert('동물 유형을 골라주세요')
    } else {
        checkBox.forEach((checkBox) => {
            resultBox.push(checkBox.value)
        });
        axios({
            method: "POST",
            url: "/commu/posts/category",
            data: {
                resultBox: resultBox
            },
        }).then((res) => {
            // html 재구성
            const html = res.data

            // console.log("카테고리 응답", res.data)
            document.querySelector('html').innerHTML = ''
            document.querySelector('html').innerHTML = html
            //체크되어 있던 값 다시 불러와서 체크 
            if (resultBox.length >= 1) {
                resultBox.forEach((resultBox) => {
                    document.querySelector(`input[value="${resultBox}"]`).checked = true
                })
            }
        })
    }
}
