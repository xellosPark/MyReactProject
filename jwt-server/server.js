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

app.use(express.json());
app.use(cookieParser());

const SECRET_KEY = 'your_secret_key';

// Login route for issuing a token
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Here, you would typically verify the username and password against your user store
  // This is a simplified example without actual authentication for demonstration purposes
  if (username && password) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });

    // Optionally, set the token in an HttpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // Set to true if you're using HTTPS
      sameSite: 'None', // Use 'None' for cross-site requests, but you'll need to use 'secure' with it
      maxAge: 3600000 // 1 hour
    });
    console.log(`Token issued for user: ${username}`); // Log token issuance
    res.json({ message: 'Authentication successful', token }); // Send token back
  } else {
    res.status(401).json({ message: 'Authentication failed' });
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