const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
//12
const {
  login,
  accessToken,
  refreshToken,
  loginSuccess,
  logout,
} = require("./controller");

//2
const app = express();
dotenv.config();

//3
// 기본설정을 해줍니다.
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

//4 ,//13
app.post("/login", login);
app.get("/accesstoken", accessToken);
app.get("/refreshtoken", refreshToken);
app.get("/login/success", loginSuccess);
app.post("/logout", logout);

//1
app.listen(process.env.PORT, () => {
  console.log(`server is on ${process.env.PORT}`);
});
