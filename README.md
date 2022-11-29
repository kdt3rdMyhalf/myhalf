# 반려인들을 위한 커뮤니티, 반쪽♡
<a href="https://imgbb.com/"><img src="https://i.ibb.co/gVQ0mZH/logo.png" alt="logo" border="0" width="100"></a>


## ✔️ 프로젝트 소개
* [🐶 반쪽 바로가기 🐱](http://118.67.142.45:8888/)

반려인들을 위한 커뮤니티 반쪽입니다. 편안한 분위기에서 반려동물을 자랑해 봐요!


## 📆 프로젝트 기간 및 환경
2022/11/16 ~ 2022/11/29<br/>
<h4>- Language</h4>
<p float="left">
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=CSS&logoColor=white">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white">
</p>

<h4>- Framework / Library</h4>
<p float="left">
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
<img src="https://img.shields.io/badge/jquery-%230769AD.svg?style=for-the-badge&logo=jquery&logoColor=white">
<img src="https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white">
</p>

<h4> - DB / ORM
<p float="left">
<img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white">
<img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white">
</p>

<h4>- Server<h4>
<p float="left">
<img src="https://img.shields.io/badge/NAVER-03C75A?style=for-the-badge&logo=NAVER&logoColor=FFFFFF">
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white">
</p>

<h4>- Editor</h4>
<p float="left">
<img src="https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white">
</p>

<h4>- 협업</h4>
<p float="left">
<img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
<img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">
<img src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white">
</p>

## 📌 설치 방법
```bash
git clone https://github.com/kdt3rdMyhalf/myhalf.git    
npm install        
node app.js    
```
- localhost:8888 접속

## 와이어프레임
* [피그마 바로가기](https://www.figma.com/file/NbS5EkDU4qstReHy6DNPcH/kdt3rd-%EB%B0%98%EC%AA%BD?node-id=105%3A99&t=x0YO4VpBEcKiLYnE-0</details>
)

## API 설계
* [노션 바로가기](https://www.notion.so/API-cdbc942835c740b8a9562acc1c3ca33c)

## DB 설계
* [구글 문서 바로가기](https://docs.google.com/document/d/1j0UiyXMxIIHUVO5oTggXwkXNKa_D6jp0McmH5kPJtVg/edit)

## 기능구현
<a href="https://ibb.co/N1S0ZgK"><img src="https://i.ibb.co/jVRCg9D/1.png" alt="1" border="0"></a>
<a href="https://ibb.co/71ND51V"><img src="https://i.ibb.co/gRF8pRw/2.png" alt="2" border="0"></a>
<a href="https://ibb.co/Ms5MRjZ"><img src="https://i.ibb.co/s2JyFDb/3.png" alt="3" border="0"></a>
<a href="https://ibb.co/xMwWG5J"><img src="https://i.ibb.co/Bgvbjsq/4.png" alt="4" border="0"></a>
<a href="https://ibb.co/mRbrd7r"><img src="https://i.ibb.co/grmbQCb/5.png" alt="5" border="0"></a>
<a href="https://ibb.co/RyPpbjD"><img src="https://i.ibb.co/xHGSLF7/6.png" alt="6" border="0"></a>
<a href="https://ibb.co/kQ3kVyb"><img src="https://i.ibb.co/V2Hr0Nn/7.png" alt="7" border="0"></a>
<a href="https://ibb.co/RQkChJD"><img src="https://i.ibb.co/p4B3WkL/8.png" alt="8" border="0"></a>
<a href="https://ibb.co/HgjMqzz"><img src="https://i.ibb.co/tC9NDss/9.png" alt="9" border="0"></a>


## ⚙ 주요 기능
- **회원가입**: 정규식 사용과 mysql User table 생성 및 지정, multer을 통한 프로필 이미지 업로드 기능을 통한 회원가입 기능 구현
- **로그인**: 정규식 사용 과 mysql User table 생성 및 지정, Session을 통한 로그인 기능 구현
- **카카오 로그인**: 카카오 api 사용을 통한 카카오 로그인 기능 구현
- **게시글 작성/삭제/수정**: WebEditor Quill, mysql User table 과 Community table 사이의 외래키 설정과 Community table 생성 및 지정을 통한 게시글 기능 구현
- **댓글 작성/삭제/수정**: User table을 참조하는 Community table을 참조하는 Comment table의 생성 및 지정을 통한 댓글 기능 구현 // 모든 참조 외래키에는 CASCADE ON UPDATE, DELETE 조건 있음!!
- **게시글 조회수**: Session 과 Cookie를 이용한 조회 조건 설정 및 Community table 이용을 통한 조회수 기능 구현
- **게시글 좋아요**: Community table 과 User table을 참조하는 Likes 생성 테이블 생성 및 이용과 Session을 이용한 좋아요 기능 구현
- **카테고리 모아보기**: sqeulize 문법을 이용한 카테고리 별 검색기능 구현
- **페이지네이션**: routes의 url 변수 선언과 Community table 조회를 이용한 페이지네이션 구현
  
## 👨‍💻 팀원소개
| Name                 | GitHub / Contact                          
| -------------------- | --------------------------------------   
| 강민선             |  https://github.com/MinseonKang             
| 문준영               | https://github.com/mooonne              
| 오성인              | https://github.com/dhtjddls                
| 임태욱               | https://github.com/Teabag225                 
| 최재인                | https://github.com/JaeinChoii                 




