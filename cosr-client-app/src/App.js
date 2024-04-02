import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://192.168.0.140:5055/login', { username, password }, { withCredentials: true });
      alert('Login successful');
      setIsLoggedIn(true);
    } catch (error) {
      alert('Login failed');
      setIsLoggedIn(false);
    }
  };

  const handleTokenVerification = async () => {
    try {
      const response = await axios.get('http://192.168.0.140:5055/verify-token', { withCredentials: true });
      alert(`Token verification success: ${response.data.message}`);
    } catch (error) {
      alert('Token verification failed');
    }
  };

  // Placeholder for a generic test action
  const handleTestAction = () => {
    alert('Test action performed!');
  };

  // Function to test accessing a cookie
  const handleGetCookie = () => {
    const someCookie = Cookies.get('token'); // Replace 'someCookieName' with your cookie name
    if (someCookie) {
      alert(`Cookie value: ${someCookie}`);
    } else {
      alert('Cookie not found');
    }
  };

  const handleCheckTokenPresence = async () => {
    try {
      // This endpoint should be designed to check the presence of the token and return a suitable response.
      const response = await axios.get('http://192.168.0.140:5055/check-token-presence', { withCredentials: true });
      console.log(response.data.tokenPresent);
      if (response.data.tokenPresent) {
        alert('Token is present.');
      } else {
        alert('Token is not present.');
      }
    } catch (error) {
      console.error('Error when checking token presence:', error);
      alert('Failed to check token presence.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Log In</button>
      </form>
      {isLoggedIn && <button onClick={handleTokenVerification}>Verify Token</button>}
      <button onClick={handleTestAction}>Test Action</button>
      <button onClick={handleGetCookie}>Get Cookie Value</button>
      <button onClick={handleCheckTokenPresence}>Check Token Presence</button>
    </div>
  );
};

export default LoginForm;