const express = require('express');
// const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors'); // cors 모듈을 불러옵니다.

const app = express();
const port = 5050;
// 수정 후
app.use(express.json());

// JWT 비밀 키 (실제 환경에서는 보안을 위해 환경 변수 등으로 관리)
const SECRET_KEY = 'your_secret_key';
const corsOptions = {
  origin: 'http://localhost:3000', // 클라이언트 애플리케이션이 호스팅되는 도메인
  credentials: true, // 쿠키를 포함시키기 위해 필요
};

app.use(cors(corsOptions));

// 사용자 데이터 예제 (실제 환경에서는 데이터베이스에서 관리)
const users = [
  {
    name: 'John Doe',
    email: 'john@example.com',
  },
];

//https://expressjs.com/ko/guide/routing.html 참조
app.get('/', function(req, res) {
  res.send('hello world');
});

app.post('/login', (req, res) => {
  console.log("login 시도");
  console.log(req.body);
  const { userId, phoneLast4Digits } = req.body;
  console.log(`로그인 시도: id = ${userId}, pw = ${phoneLast4Digits}`);

  // 로그인 로직 처리...
  const token = jwt.sign({ type: 'JWT', id: userId }, 'your_secret_key', {
      expiresIn: '15m', // 만료 시간 설정
      issuer: 'YourIssuer'
  });

   // 쿠키에 토큰 설정
   res.cookie("accessToken", token, {
    maxAge: 900000, // 쿠키 만료 시간(밀리초 단위), 여기서는 15분
    secure: true, // HTTPS를 사용하는 프로덕션 환경에서는 true로 설정
    httpOnly: true, // 클라이언트 측 JS가 쿠키에 접근하지 못하도록 설정
    sameSite: 'none', // 크로스 사이트 요청에 대한 쿠키 전송 설정
});
  // 응답 전송
  res.send("로그인 성공");
});

// 미들웨어를 불러옵니다.
const verifyTokenAndRenew = require('./middleware/middleware');

// 특정 경로에 대한 요청을 처리하기 전에 미들웨어를 적용합니다.
app.use('/api/protected', verifyTokenAndRenew);

app.get('/getOrderList', (req, res) => {
  console.log(`여기 ${error}`);
  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwiaWQiOiJhYmNkIiwiaWF0IjoxNzA5MTMwNzU1LCJleHAiOjE3MDkxMzE2NTUsImlzcyI6InlodyJ9.gk4SQ1I73m2Tv4NGd2KeEDftrZiSuqxTcNwJ5mN47nI'
  jwt.verify(token, '1234', (error, decoded) => {
    if (error) {
      console.log(`에러가 났습니다\n ${error}`);
    }

    // DB 조회
    // select * from table where u_id = '${decoed.id}'

    console.log(decoded);
    res.send(decoded);
  })
});

// 인증(로그인) 없이 바로 JWT 생성 및 반환 엔드포인트
app.post('/generate-token', (req, res) => {
  const { name, email } = req.body;

  // 사용자 존재 여부 확인
  const user = users.find(u => u.name === name && u.email === email);

  if (user) {
    // 사용자 정보를 바탕으로 JWT 생성
    const token = jwt.sign({ name: user.name, email: user.email }, SECRET_KEY, {
      expiresIn: '1h', // 토큰 유효 시간
    });

    res.json({ token });
  } else {
    // 사용자 정보 불일치
    res.status(404).json({ message: 'User not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
