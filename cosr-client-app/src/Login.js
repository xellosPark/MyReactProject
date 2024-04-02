import React, { useState, useEffect } from "react";
import axios from "axios";
import api from './api';
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태를 추적하는 상태 추가

  useEffect(() => {
    // 컴포넌트가 마운트될 때 로그인 상태를 로컬 스토리지에서 확인합니다.
    const storedLoginStatus = localStorage.getItem("refreshToken");
    if (storedLoginStatus) {
        setIsLoggedIn(true);    
    }
    
    if (isLoggedIn) {
        verifyToken(); // 리프레시 토큰이 존재하면 토큰 유효성 검사를 시도합니다.
      }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      verifyToken();
    }
  }, [isLoggedIn]); // 로그인 상태 변경 시 토큰 유효성 검사를 시도합니다.

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", {
        username,
        password,
      });

      const { accessToken, refreshToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      setIsLoggedIn(true); // 로그인 상태 업데이트

      alert("로그인 성공");
    } catch (error) {
      console.error("로그인 실패", error);
      setIsLoggedIn(false); // 로그인 상태 업데이트
      alert("로그인 실패");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false); // 로그인 상태 업데이트
    alert("로그아웃 되었습니다.");
  };

  const verifyToken = async () => {
    console.log("1111.",isLoggedIn);
    // 컴포넌트가 마운트될 때 토큰 유효성 검사를 시도합니다.
    if (isLoggedIn === false) {
        alert("로그인 부터 해주세요");
        return;
      }

    try {
      const accessToken = localStorage.getItem("accessToken");
      await api.get("/protected", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      alert("토큰이 유효합니다.");
    } catch (error) {
      console.error("토큰 검증 실패", error);
      // 여기서 리프레시 토큰으로 새 액세스 토큰을 요청합니다.
      refreshToken();
    }
  };

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    // 리프레시 토큰이 없는 경우 즉시 함수를 종료합니다.
    if (!refreshToken) {
        console.log("리프레시 토큰이 없습니다. 로그인이 필요합니다.");
        alert("기간이 끝났습니다.");
        // 필요한 추가 로직을 여기에 구현하세요.
        return;
    }

    try {
        const response = await api.post("/refresh", {
            refreshToken,
        });
        
        const { accessToken } = response.data;
        localStorage.setItem("accessToken", accessToken);
        setIsLoggedIn(true); // 로그인 상태 업데이트
        console.log("새 액세스 토큰이 발급되었습니다.");
    } catch (error) {
        console.error("액세스 토큰 재발급 실패", error);
        handleLogout();
    }
};

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">로그인</button>
      </form>
      <button onClick={handleLogout}>로그아웃</button>
      <button onClick={verifyToken}>토큰 검증</button>
    </div>
  );
}

export default Login;