const express = require('express');
const app = express();
const sqlite3 = require('sqlite3');

app.use(express.json());

// 데이터베이스 연결 초기화
const db = require('./DB/Database');


// Define your CRUD API endpoints here

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});