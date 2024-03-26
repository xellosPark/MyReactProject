const express = require('express');
const { getPosts, getPostByTitle, getAllTitles, editPost, deletePost, UploadFilePost } = require('./controllers/postsController');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const multer = require('multer'); // Multer 모듈 추가
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(cookieParser()); 
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
}));

const PORT = process.env.PORT || 5055;

const dir = path.join(__dirname, 'uploadFiles');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true }); // recursive: true 옵션으로 중첩 폴더도 생성 가능
}

// Multer 설정: 파일 저장소 구성
const storage = multer.diskStorage({
  // 파일이 저장될 위치 설정
  destination: function(req, file, cb) {
    cb(null, 'uploadFiles/'); // 'uploads/' 폴더에 파일 저장
  },
  // 저장될 파일의 이름 설정
  filename: function(req, file, cb) {
    file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
    console.log(file.originalname);
    cb(null, file.originalname); // 원본 파일 이름 사용
  }
});

const upload = multer({ storage: storage }); // 저장소 설정을 사용하여 Multer 인스턴스 생성

app.get('/api/posts', getPosts);
app.post('/api/posts/title', getPostByTitle);
app.get('/api/posts/titles', getAllTitles);
app.post('/api/posts/edit', editPost); 
app.delete('/api/posts/:id', deletePost); 
// 파일 업로드를 위한 라우트에 Multer 미들웨어 적용
app.post('/upload', upload.single('file'), UploadFilePost);


app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`);
});