//5
const userDatabase = require("../Database");
const jwt = require("jsonwebtoken");
//6
const login = (req, res, next) => {
  const { email, password } = req.body;

  const userInfo = userDatabase.filter((item) => {
    console.log(`email : ${item.email} pw : ${email} `);
    return item.email === email;
  })[0];

  if (!userInfo) {
      res.status(403).json("Not Authorized");
  } else {
    try {
      console.log(`id:${userInfo.id} Name:${userInfo.username} email:${userInfo.email} `);
      // access Token 발급
      const accessToken = jwt.sign({
        id : userInfo.id,
        username : userInfo.username,
        email : userInfo.email,
      }, process.env.ACCESS_SECRET, {
        expiresIn : '1m',
        issuer : 'About Tech',
      });
      console.log(`2:id:${userInfo.id} Name:${userInfo.username} email:${userInfo.email} `);

      // refresh Token 발급
      const refreshToken = jwt.sign({
        id : userInfo.id,
        username : userInfo.username,
        email : userInfo.email,
      }, process.env.REFRECH_SECRET, {
        expiresIn : '24h',
        issuer : 'About Tech',
      })

      // token 전송
      res.cookie("accessToken", accessToken, {
        secure : false,
        httpOnly : true,
      })

      res.cookie("refreshToken", refreshToken, {
        secure : false,
        httpOnly : true,
      })
      res.send(`a:${accessToken} R:${refreshToken}`);
      
      
      res.status(200).json("login success");
    } catch (error) {
      res.status(500).json(error);
    }
  }
};
//7
const accessToken = (req, res) => {
  try {
    const token = req.cookies.accessToken;
    const data = jwt.verify(token, process.env.ACCESS_SECRET);

    const userData = userDatabase.filter(item=>{
      return item.email === data.email;
    })[0];

    const {password, ...others} = userData;

    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
};
//8
const refreshToken = (req, res) => {
  // 용도 : access token을 갱신.
  try {
    const token = req.cookies.refreshToken;
    const data = jwt.verify(token, process.env.REFRECH_SECRET)
    const userData = userDatabase.filter(item=>{
      return item.email === data.email;
    })[0]

    // access Token 새로 발급
    const accessToken = jwt.sign({
      id : userData.id,
      username : userData.username,
      email : userData.email,
    }, process.env.ACCESS_SECRET, {
      expiresIn : '1m',
      issuer : 'About Tech',
    });

    res.cookie("accessToken", accessToken, {
      secure : false,
      httpOnly : true,
    })
    
    res.status(200).json("Access Token Recreated");

  } catch (error) {
    res.status(500).json(error);
  }
};
//9
const loginSuccess = (req, res) => {
  try {
    const token = req.cookies.accessToken;
    const data = jwt.verify(token, process.env.ACCESS_SECRET);

    const userData = userDatabase.filter(item=>{
      return item.email === data.email;
    })[0];

    res.status(200).json(userData);

  } catch (error) {
    res.status(500).json(error);
  }
};
//10
const logout = (req, res) => {
  try {
    res.cookie('accessToken', '');
    res.status(200).json("Logout Success");
  } catch (error) {
    res.status(500).json(error);
  }
};
//11
module.exports = {
  login,
  accessToken,
  refreshToken,
  loginSuccess,
  logout,
};
