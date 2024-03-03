// jwt 모듈을 불러옵니다.
const jwt = require('jsonwebtoken');

// 비밀키는 환경변수에서 가져오거나 직접 지정할 수 있습니다.
//const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';
const SECRET_KEY = '1234';


// 토큰을 검증하고 새로운 토큰을 발행하는 미들웨어 함수입니다.
const verifyTokenAndRenew = (req, res, next) => {
  // 요청 헤더에서 'authorization'을 통해 토큰을 가져옵니다.
  const token = req.headers['authorization'];

  // 토큰이 없는 경우 에러 메시지를 반환합니다.
  if (!token) {
    return res.status(403).send({ message: '토큰이 필요합니다.' });
  }

  try {
    // 토큰을 검증합니다.
    const decoded = jwt.verify(token, SECRET_KEY);

    // 토큰이 유효한 경우, 새로운 토큰을 발행합니다.
    const newToken = jwt.sign({ id: decoded.id }, SECRET_KEY, { expiresIn: '1h' });

    // 새로운 토큰을 response header에 추가합니다.
    res.setHeader('Authorization', newToken);

    // 다음 미들웨어로 넘어갑니다.
    next();
  } catch (error) {
    // 토큰이 유효하지 않은 경우 에러 메시지를 반환합니다.
    return res.status(401).send({ message: '유효하지 않은 토큰입니다.' });
  }
};

// 미들웨어를 모듈로 내보냅니다.
module.exports = verifyTokenAndRenew;