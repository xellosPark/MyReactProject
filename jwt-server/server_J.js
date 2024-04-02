require('dotenv').config(); // 환경 변수를 .env 파일에서 불러옵니다.
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cors({
    origin: ['http://192.168.0.140:5055', 'http://localhost:3000'], // Adjust to your client's origin, necessary for CORS with credentials
    credentials: true, // To accept cookies via CORS
  }));
  app.use(express.json());
  app.use(cookieParser());


const PORT = process.env.PORT || 3000;

// 실제 환경에서는 환경 변수에서 시크릿 키를 가져와야 합니다.
const ACCESS_TOKEN_SECRET = process.env.ACCESS_SECRET ;
const REFRESH_TOKEN_SECRET = process.env.REFRECH_SECRET ;

app.use(bodyParser.json());

// 데모 목적의 가상 사용자
const user = {
  id: 1,
  username: "1234",
  password: "1234" // 실제 어플리케이션에서는 이렇게 비밀번호를 저장하지 마세요.
};

const refreshTokens = [];

// 로그인 엔드포인트: 사용자 인증 성공 시 토큰 발급
app.post('/login', (req, res) => {
    
    const { username, password } = req.body;
    
  // 실제 어플리케이션에서는 여기에서 데이터베이스를 통해 사용자를 검증합니다.
    if (username && password) {
        const accessToken = jwt.sign({ id: user.id, username: user.username }, ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
        const refreshToken = jwt.sign({ id: user.id, username: user.username }, REFRESH_TOKEN_SECRET, { expiresIn: '3m' });
        
        // 리프레시 토큰을 메모리에 저장하는 예시입니다.
        // 실제 어플리케이션에서는 데이터베이스나 다른 영구 저장소에 저장해야 합니다.
        refreshTokens.push(refreshToken);

    return res.json({ accessToken, refreshToken });
  } else {
    return res.status(401).send('Username or password incorrect');
  }
});

app.post('/refresh', (req, res) => {
    console.log("여기");
    const { refreshToken } = req.body;
    if (!refreshToken || !refreshTokens.includes(refreshToken)) {
        return res.sendStatus(403);
    }
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        const newAccessToken = jwt.sign({ id: user.id, username: user.username }, ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
        res.json({ accessToken: newAccessToken });
    });
});

// 토큰 인증 미들웨어
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN" 형식

  if (!token) return res.sendStatus(401);

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // 토큰이 유효하지 않음
    req.user = user;
    next();
  });
};

// 보호된 라우트
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: "보호된 라우트에 오신 것을 환영합니다!", user: req.user });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});



// 주요 포인트 설명:
// .env 파일을 사용하여 시크릿 키와 같은 중요한 정보를 안전하게 관리합니다.
// /login 엔드포인트에서는 사용자 이름과 비밀번호가 유효한 경우 접근 토큰과 리프레시 토큰을 발급합니다.
// authenticateToken 미들웨어는 특정 라우트의 보안을 강화하기 위해 사용됩니다. 요청 헤더에 포함된 토큰을 검증하여 접근을 제어합니다.
// /protected 라우트는 토큰 인증을 요구하는 보호된 자원을 제공하는 예시입니다.
// 서버 실행 및 테스트
// 터미널에서 node server.js를 실행하여 서버를 시작합니다.
// Postman 또는 cURL 같은 도구를 사용하여 /login