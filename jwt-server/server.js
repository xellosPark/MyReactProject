const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cors({
  origin: ['http://192.168.0.140:5055', 'http://localhost:3000'], // Adjust to your client's origin, necessary for CORS with credentials
  credentials: true, // To accept cookies via CORS
}));
app.use(express.json());
app.use(cookieParser());



const SECRET_KEY = '1234'; // 실제 환경에서는 환경 변수에서 이 값을 로드해야 합니다.
const REFRESH_SECRET_KEY = '1234'; // 리프레시 토큰을 위한 별도의 시크릿 키

// 로그인 라우트 설정: 토큰 발행
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // 일반적으로 여기에서 데이터베이스에 대해 사용자 이름과 비밀번호를 검증합니다.
  if (username && password) {
    // 인증이 성공하면 접근 토큰과 리프레시 토큰을 발행합니다.
    const accessToken = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1m" }); // 수명이 짧은 접근 토큰
    const refreshToken = jwt.sign({ username }, REFRESH_SECRET_KEY, { expiresIn: '7d' }); // 수명이 긴 리프레시 토큰

    // 수명이 짧은 접근 토큰을 HttpOnly 쿠키에 설정
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: false, // HTTPS를 사용하는 경우 true로 설정
      sameSite: 'None', // CSRF 보호를 위해 'Strict' 또는 'Lax'로 설정, 크로스 사이트 요청의 경우 'None'
    });

    // 선택적으로, 수명이 긴 리프레시 토큰을 별도의 HttpOnly 쿠키에 전송
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false, // HTTPS를 사용하는 경우 true로 설정
      sameSite: 'None', // 위와 동일한 이유로 설정
    });

    // 사용자에게 토큰 발행을 로그로 남기고 JSON 형식으로 두 토큰 모두 클라이언트에 응답으로 전송
    console.log(`사용자 ${username}에 대한 접근 및 리프레시 토큰이 발행되었습니다.`);
    res.json({
      message: '인증 성공',
      accessToken,  // 참고: 실제 애플리케이션에서는 HttpOnly 쿠키에 설정하는 경우 JSON 응답에서 접근 토큰을 보내지 마세요.
      refreshToken  // 클라이언트가 안전하게 저장해야 하는 경우 리프레시 토큰을 응답 본문에 전송할 수 있습니다.
    });
  } else {
    res.status(401).json({ message: '인증 실패' });
  }
});

app.get('/check-token-presence', (req, res) => {
  const token = req.cookies.token; // The name of the cookie your server sets
  console.log("여기요",token);
  if (token) {
    res.json({ tokenPresent: true });
  } else {
    res.json({ tokenPresent: false });
  }
});

app.post('/some-protected-route', (req, res) => {
  console.log("여기요");
  const { email } = req.body;

  // Extracting the Authorization header and Bearer token
  const authHeader = req.headers['authorization'];
  const accessToken = authHeader && authHeader.split(' ')[1]; // Assuming format "Bearer TOKEN"
  console.log(`토큰체크 Header : ${accessToken}`);

  // Accessing the refreshToken from cookies
  const refreshToken = req.cookies.refreshToken;
  console.log(`토큰체크 refresh : ${refreshToken}`);

  // Your logic to verify accessToken and refreshToken...
  // For example, use them to authenticate/authorize the user or refresh the accessToken

  res.json({ message: "Token information logged." });
});

app.get('/verify-token', (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return res.json({ message: `Token is valid. User: ${decoded.username}` });
  } catch (error) {
    return res.status(401).json({ message: 'Token is invalid' });
  }
});

// A protected route that requires a token
app.get('/protected', (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'A token is required for authentication' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log(`Protected route accessed by: ${decoded.username}`); // Log access
    res.json({ message: 'Welcome to the protected route!', user: decoded.username });
  } catch (error) {
    console.log('Invalid token detected');
    return res.status(401).json({ message: 'Invalid Token' });
  }
});

const port = 5055;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});