const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const port = 5050;

// JWT 비밀 키 (실제 환경에서는 보안을 위해 환경 변수 등으로 관리)
const SECRET_KEY = 'your_secret_key';

app.use(bodyParser.json());

// 사용자 데이터 예제 (실제 환경에서는 데이터베이스에서 관리)
const users = [
  {
    name: 'John Doe',
    email: 'john@example.com',
  },
];

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
//https://expressjs.com/ko/guide/routing.html 참조
app.get('/', function(req, res) {
  res.send('hello world');
});

app.get('/login', (req, res) => {
   let id = 'abcd'
   let pw = '1234'

   // DB확인
   // selet = from user where id = '${id}' and pw = '${pw}'

   // 데이터 존재
   // 토큰 존재

   //https://awlhdla.tistory.com/144 참조

   // https://www.npmjs.com/package/jsonwebtoken
   token = jwt.sign({
    type: 'JWT',
    id: id,
  }, '1234', {
    expiresIn: '15m', // 만료시간 15분
    issuer: 'yhw',
  });
  res.send(token)
});

app.get('/getOrderList', (req, res) => {

  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwiaWQiOiJhYmNkIiwiaWF0IjoxNzA5MTI3MzAwLCJleHAiOjE3MDkxMjgyMDAsImlzcyI6InlodyJ9.LhavjAU4tQNu3Z_XnyDJVzoWhKc69_jNZ1AORpYix8g'
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



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
