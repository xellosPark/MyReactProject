import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [userId, setUserId] = useState('');
    const [phoneLast4Digits, setPhoneLast4Digits] = useState('');
    const [token, setToken] = useState('');

    // Function to handle form submission
    const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
        await axios.post('http://192.168.45.171:5050/login', {
            userId,
            phoneLast4Digits,
        }, {
            headers: {
                'Content-Type': 'application/json' // 요청 본문이 JSON 형식임을 명시
            },
            withCredentials: true // 쿠키를 브라우저에 설정하기 위해 필요
        });

        alert('Login successful!');
    } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed');
    }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
            />
            <input
                type="text"
                placeholder="Phone Last 4 Digits"
                value={phoneLast4Digits}
                onChange={(e) => setPhoneLast4Digits(e.target.value)}
            />
            <button onClick={handleLogin}>로그인 보내기</button>
            {token && <div>토큰 값: {token}</div>}
        </div>
    );
}

export default Login;