const express = require('express');
const { getPosts, getPostByTitle, getAllTitles, editPost, deletePost } = require('./controllers/postsController');
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(express.json());
// PORT 번호 기본값 5050으로 설정
const PORT = process.env.PORT || 5055;

app.use(express.json());
app.use(cookieParser()); //// get요청이 오면 uri변수들이 파싱되어 req.cookies객체에 저장된다.
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
    })
);

// 라우트에서 컨트롤러 함수 사용
app.get('/api/posts', getPosts);

// 'POST' 라우트 추가
app.post('/api/posts/title', getPostByTitle);

// 모든 제목을 가져오는 라우트
app.get('/api/posts/titles', getAllTitles);

// 게시물 편집 라우트
app.post('/api/posts/edit', editPost); 

// 게시물 삭제 라우트
app.delete('/api/posts/:id', deletePost); 

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});