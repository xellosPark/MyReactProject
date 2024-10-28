// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const multer = require('multer');
// const cors = require('cors'); // CORS 패키지 가져오기
// const fs = require('fs');
// const path = require('path');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {
//     cors: {
//         origin: ['http://localhost:3000', 'http://localhost:3001'], // 클라이언트 URL 허용
//         methods: ['GET', 'POST'], // 허용 메서드 설정
//         credentials: true, // 인증 정보 포함 설정
//     },
// });

// const PORT = 5000;
// const uploadDirectory = path.join('D:', 'uploads'); // 업로드 파일을 저장할 기본 디렉토리

// // 업로드 디렉토리가 없는 경우 생성
// if (!fs.existsSync(uploadDirectory)) {
//     fs.mkdirSync(uploadDirectory, { recursive: true });
// }

// // CORS 미들웨어 사용
// app.use(cors({
//     origin: ['http://localhost:3000', 'http://localhost:3001'], // Allow both localhost:3000 and localhost:3001
//     methods: ['GET', 'POST'], // Allow GET and POST methods
//     credentials: true
// }));

// app.use(express.json()); // JSON 바디 파싱

// let currentUuid = null; // 현재 UUID 저장

// /* 소켓 연결 설정 */
// io.on('connection', (socket) => {
//     console.log('클라이언트가 연결되었습니다.');

//     // UUID 수신 및 확인 응답
//     socket.on('sendUuid', (uuid, callback) => {
//         console.log(`수신된 UUID: ${uuid}`);
//         currentUuid = uuid; // 수신된 UUID 저장

//         // UUID에 해당하는 폴더 생성
//         const uuidDirectory = path.join(uploadDirectory, uuid);
//         if (!fs.existsSync(uuidDirectory)) {
//             fs.mkdirSync(uuidDirectory, { recursive: true });
//             console.log(`디렉토리 생성됨: ${uuidDirectory}`);
//         }

//         // 클라이언트에 응답 전송
//         callback('UUID received');
//     });

//     // 클라이언트 연결 종료 시 로그 출력
//     socket.on('disconnect', () => {
//         console.log('클라이언트 연결이 끊겼습니다.');
//     });
// });

// /* Multer 설정: UUID 폴더 내에 파일을 저장 */
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const uuid = req.body.uuid || currentUuid || 'default'; // UUID 가져오기

//         // 로그 추가 - UUID 값 확인
//         console.log(`사용할 UUID: ${uuid}`);
//         console.log(`현재 저장된 UUID (currentUuid): ${currentUuid}`);
//         const uuidDirectory = path.join(uploadDirectory, uuid); // UUID 폴더 경로 설정
//         cb(null, uuidDirectory); // 해당 폴더에 저장
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname); // 원래 파일 이름 사용
//     },
// });

// const upload = multer({ storage });

// /* 파일 업로드를 위한 POST 라우트 */
// app.post('/upload', upload.single('file'), (req, res) => {
//     console.log(`파일 업로드 성공: ${req.file.filename}`); // 업로드된 파일 이름 로그
//     res.status(200).send({ message: 'File uploaded successfully!' });
// });

// // 서버 시작
// server.listen(PORT, () => {
//     console.log(`서버가 실행 중입니다: http://localhost:${PORT}`);
// });


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const multer = require('multer');
// const cors = require('cors');
// const fs = require('fs');
// const path = require('path');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {
//     cors: {
//         origin: ['http://localhost:3000', 'http://localhost:3001'],
//         methods: ['GET', 'POST'],
//         credentials: true,
//     },
// });

// const PORT = 5000;
// const uploadDirectory = path.join('D:', 'uploads');
// if (!fs.existsSync(uploadDirectory)) {
//     fs.mkdirSync(uploadDirectory, { recursive: true });
// }

// app.use(cors({
//     origin: ['http://localhost:3000', 'http://localhost:3001'],
//     methods: ['GET', 'POST'],
//     credentials: true,
// }));

// app.use(express.json());

// let currentUuid = null;

// io.on('connection', (socket) => {
//     console.log('클라이언트가 소켓으로 연결되었습니다.');

//     socket.on('sendUuid', (uuid, callback) => {
//         console.log(`수신된 UUID: ${uuid}`);
//         currentUuid = uuid;
//         const uuidDirectory = path.join(uploadDirectory, uuid);
//         if (!fs.existsSync(uuidDirectory)) {
//             fs.mkdirSync(uuidDirectory, { recursive: true });
//             console.log(`디렉토리 생성됨: ${uuidDirectory}`);
//         }
//         callback('UUID received');
//     });

//     socket.on('requestSaveProgress', () => {
//         let progress = 0;
//         const interval = setInterval(() => {
//             progress += 10;
//             if (progress >= 100) {
//                 clearInterval(interval);
//                 socket.emit('saveProgress', 100);
//             } else {
//                 socket.emit('saveProgress', progress); // 저장 진행 상태 전송
//             }
//         }, 500); // 500ms 간격으로 진행률 전송
//     });

//     socket.on('disconnect', () => {
//         console.log('클라이언트 연결이 끊겼습니다.');
//     });
// });

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const uuid = req.body.uuid || currentUuid || 'default';
//         const uuidDirectory = path.join(uploadDirectory, uuid);
//         if (!fs.existsSync(uuidDirectory)) {
//             fs.mkdirSync(uuidDirectory, { recursive: true });
//         }
//         cb(null, uuidDirectory);
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//     },
// });

// const upload = multer({ storage });

// app.post('/upload', upload.single('file'), (req, res) => {
//     console.log(`파일 업로드 성공: ${req.file.filename}`);
//     res.status(200).send({ message: 'File uploaded successfully!' });

//     // 파일 업로드 완료 후 서버에서 저장 진행률 전송 시작 요청
//     io.emit('startSavingProgress');
// });

// server.listen(PORT, () => {
//     console.log(`서버가 실행 중입니다: http://localhost:${PORT}`);
// });

// 파일 업로드:

// 클라이언트가 파일을 서버로 전송하는 과정입니다.
// 이 과정에서 axios의 onUploadProgress를 통해 클라이언트는 파일이 서버에 도달하는 진행 상태를 확인할 수 있습니다.
// 파일은 서버의 메모리나 임시 디렉토리에 전달됩니다.
// 파일 저장 (HDD에 저장):

// 서버로 전송된 파일을 실제 스토리지(예: HDD)에 저장하는 과정입니다.
// 파일이 서버에 도착한 이후, 서버가 파일을 원하는 디렉토리로 옮기거나, 지정한 파일명으로 저장하게 됩니다.
// 이 과정에서는 파일을 읽어들이고(fs.createReadStream), 특정 위치로 쓰는(fs.createWriteStream) 작업을 통해 클라이언트에 실시간 저장 진행률을 전송할 수 있습니다.

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: ['http://localhost:3000', 'http://localhost:3001'], // 허용할 클라이언트 URL 설정
        methods: ['GET', 'POST'], // 허용할 HTTP 메서드 설정
        credentials: true, // 인증 정보 허용
    },
});

const PORT = 5000;
const uploadDirectory = path.join('D:', 'uploads'); // 업로드된 파일을 저장할 기본 경로

// 업로드 디렉토리 없으면 생성
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

// CORS 설정
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'], // 클라이언트 도메인 허용
    methods: ['GET', 'POST'], // 허용 HTTP 메서드
    credentials: true,
}));

app.use(express.json()); // JSON 데이터 파싱

let currentUuid = null; // 현재 사용중인 UUID 저장

// 소켓 연결 설정
io.on('connection', (socket) => {
    console.log('클라이언트가 소켓으로 연결되었습니다.');

    // 클라이언트가 UUID 전송 시 이벤트 처리
    socket.on('sendUuid', (uuid, callback) => {
        console.log(`수신된 UUID: ${uuid}`);
        currentUuid = uuid;

        // UUID에 해당하는 폴더 생성
        const uuidDirectory = path.join(uploadDirectory, uuid);
        if (!fs.existsSync(uuidDirectory)) {
            fs.mkdirSync(uuidDirectory, { recursive: true });
            console.log(`디렉토리 생성됨: ${uuidDirectory}`);
        }
        callback('UUID received'); // UUID 수신 확인 응답
    });

    // 클라이언트가 소켓 연결을 끊었을 때 이벤트 처리
    socket.on('disconnect', () => {
        console.log('클라이언트 연결이 끊겼습니다.');
    });
});

// Multer 설정: 업로드 파일을 UUID 폴더에 저장
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uuid = req.body.uuid || currentUuid || 'default';
        const uuidDirectory = path.join(uploadDirectory, uuid);

        // UUID 폴더 없으면 생성
        if (!fs.existsSync(uuidDirectory)) {
            fs.mkdirSync(uuidDirectory, { recursive: true });
        }
        cb(null, uuidDirectory); // 파일 저장 위치 지정
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // 원본 파일 이름 사용
    },
});

const upload = multer({ storage });

/* 업로드 완료 후 실제 파일 저장 프로세스에서 진행률 전송 */
app.post('/upload', upload.single('file'), (req, res) => {
    console.log(`파일 업로드 성공: ${req.file.filename}`);
    res.status(200).send({ message: 'File uploaded successfully!' });

    // 업로드된 파일을 저장할 경로
    const sourcePath = path.join(req.file.destination, req.file.filename); // 업로드된 파일 경로
    const destinationPath = path.join(req.file.destination, `saved_${req.file.filename}`); // 저장될 파일 경로

    const readStream = fs.createReadStream(sourcePath); // 원본 파일 읽기 스트림
    const writeStream = fs.createWriteStream(destinationPath); // 대상 파일 쓰기 스트림

    let totalSize = req.file.size; // 전체 파일 크기
    let bytesWritten = 0; // 현재까지 쓰인 바이트 크기

    // 읽기 스트림에서 데이터를 받을 때마다 실행
    readStream.on('data', (chunk) => {
        writeStream.write(chunk, () => { // 대상 파일에 데이터 쓰기
            bytesWritten += chunk.length; // 현재까지 쓰인 바이트 증가
            const progress = Math.round((bytesWritten / totalSize) * 100); // 저장 진행 상태 계산
            io.emit('saveProgress', progress); // 저장 진행 상태 클라이언트에 전송
            console.log(`저장 진행 상태: ${progress}%`);
        });
    });

    // 읽기 스트림이 끝나면 실행
    readStream.on('end', () => {
        writeStream.end(); // 쓰기 스트림 종료
        console.log('파일 저장 완료');
        io.emit('saveProgress', 100); // 저장 완료 상태 전송
    });

    // 읽기 또는 쓰기 중 오류 발생 시 처리
    readStream.on('error', (err) => {
        console.error('파일 읽기 중 오류 발생:', err);
        io.emit('saveProgress', 'error'); // 오류 상태 전송
    });

    writeStream.on('error', (err) => {
        console.error('파일 쓰기 중 오류 발생:', err);
        io.emit('saveProgress', 'error'); // 오류 상태 전송
    });
});

// 서버 시작
server.listen(PORT, () => {
    console.log(`서버가 실행 중입니다: http://localhost:${PORT}`);
});


// 확실하게 이해하기 위해 다음 질문들에 대한 설명을 제공하겠습니다.

// 1. 서버에서 업로드 완료와 실제 저장의 차이점은 무엇인가요?
// 업로드 완료와 저장은 일반적으로 다릅니다:

// 업로드 완료: 클라이언트가 서버에 파일을 전송하여 서버가 이를 수신하는 단계입니다. 서버는 Multer와 같은 미들웨어를 사용하여 파일을 일시적인 위치에 저장합니다. 이 단계에서는 클라이언트에서 전송한 파일이 서버에 도달한 상태입니다.

// 저장: 서버에 도달한 파일을 원하는 위치로 옮기거나 데이터베이스, 로컬 스토리지, 또는 원격 스토리지(예: AWS S3)에 저장하는 단계입니다. 여기서는 보통 파일이 지정된 폴더에 최종적으로 기록되거나 특정 방식으로 관리됩니다. 이 과정은 업로드가 완료된 후 진행됩니다.

// 즉, 업로드는 파일이 서버에 도착하는 작업이고, 저장은 그 파일을 최종 위치에 보관하는 작업입니다.

// 2. 업로드가 완료되는 위치와 실제 저장되는 위치는 어디인가요?
// 업로드 완료 위치:

// Multer를 사용하여 파일을 업로드할 때, multer.diskStorage()를 통해 임시 경로에 파일을 저장할 수 있습니다.
// 예를 들어, destination 옵션에서 uuidDirectory와 같은 폴더를 지정하여 파일이 업로드되도록 설정할 수 있습니다.
// 이 단계에서 req.file 객체를 통해 파일 정보를 얻을 수 있으며, 파일은 임시적으로 서버에 저장된 상태입니다.
// 최종 저장 위치:

// 파일이 업로드된 후, 서버에서는 이 파일을 원하는 폴더나 스토리지 위치로 이동하여 최종 저장할 수 있습니다.
// fs.rename을 사용하여 파일을 새로운 위치로 이동하거나, fs.createReadStream 및 fs.createWriteStream을 사용하여 다른 위치로 쓰는 방식으로 최종 저장 위치에 기록할 수 있습니다.
// 저장 진행률을 보고하려면 fs.createReadStream 및 fs.createWriteStream을 사용하여 읽기와 쓰기를 통해 실시간으로 진행률을 클라이언트에 전송할 수 있습니다.

// filename 옵션에서 사용할 수 있는 정보는 req, file 객체에 담겨 있는 데이터에 한정됩니다. Multer의 filename 함수는 기본적으로 업로드할 파일의 이름을 설정하는 용도로 사용됩니다. 이 함수 안에서 특정 정보를 추가하거나 진행률을 추적하는 것은 불가능합니다.

// 하지만 다음과 같은 정보는 filename 함수 안에서 얻을 수 있습니다:

// req 객체에 담긴 요청 데이터 (req.body 등)와 클라이언트에서 보내온 UUID 같은 데이터를 사용할 수 있습니다.
// file 객체에는 업로드되는 파일에 대한 메타데이터가 포함됩니다. 여기에는 파일 이름, MIME 타입, 크기 등의 정보가 포함됩니다.
// 진행률이나 저장 상태와 같은 정보는 이 단계에서는 사용할 수 없으며, 이는 파일이 서버에 업로드가 완료된 이후에야 추적할 수 있습니다.