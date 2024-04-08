import React from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Perform login logic...
    navigate('/'); // Navigate to the home page after login
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Log in</button>
    </div>
  );
}

export default LoginPage;