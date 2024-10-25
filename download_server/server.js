const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const multer = require('multer');
const cors = require('cors'); // CORS 패키지 가져오기
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: ['http://localhost:3000', 'http://localhost:3001'], // 클라이언트 URL 허용
        methods: ['GET', 'POST'], // 허용 메서드 설정
        credentials: true, // 인증 정보 포함 설정
    },
});

const PORT = 5000;
const uploadDirectory = path.join('D:', 'uploads'); // 업로드 파일을 저장할 기본 디렉토리

// 업로드 디렉토리가 없는 경우 생성
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

// CORS 미들웨어 사용
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'], // Allow both localhost:3000 and localhost:3001
    methods: ['GET', 'POST'], // Allow GET and POST methods
    credentials: true
}));

app.use(express.json()); // JSON 바디 파싱

let currentUuid = null; // 현재 UUID 저장

/* 소켓 연결 설정 */
io.on('connection', (socket) => {
    console.log('클라이언트가 연결되었습니다.');

    // UUID 수신 및 확인 응답
    socket.on('sendUuid', (uuid, callback) => {
        console.log(`수신된 UUID: ${uuid}`);
        currentUuid = uuid; // 수신된 UUID 저장

        // UUID에 해당하는 폴더 생성
        const uuidDirectory = path.join(uploadDirectory, uuid);
        if (!fs.existsSync(uuidDirectory)) {
            fs.mkdirSync(uuidDirectory, { recursive: true });
            console.log(`디렉토리 생성됨: ${uuidDirectory}`);
        }

        // 클라이언트에 응답 전송
        callback('UUID received');
    });

    // 클라이언트 연결 종료 시 로그 출력
    socket.on('disconnect', () => {
        console.log('클라이언트 연결이 끊겼습니다.');
    });
});

/* Multer 설정: UUID 폴더 내에 파일을 저장 */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uuid = req.body.uuid || currentUuid || 'default'; // UUID 가져오기
        const uuidDirectory = path.join(uploadDirectory, uuid); // UUID 폴더 경로 설정
        cb(null, uuidDirectory); // 해당 폴더에 저장
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // 원래 파일 이름 사용
    },
});

const upload = multer({ storage });

/* 파일 업로드를 위한 POST 라우트 */
app.post('/upload', upload.single('file'), (req, res) => {
    console.log(`파일 업로드 성공: ${req.file.filename}`); // 업로드된 파일 이름 로그
    res.status(200).send({ message: 'File uploaded successfully!' });
});

// 서버 시작
server.listen(PORT, () => {
    console.log(`서버가 실행 중입니다: http://localhost:${PORT}`);
});
