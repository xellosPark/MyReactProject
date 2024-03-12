const sqlite3 = require('sqlite3').verbose();
//console.log('테이블 생성이 완료되었습니다.');
// SQLite 데이터베이스 열기
const db = new sqlite3.Database('./UBDateInfo.db');
// console.log('연결완료.');
// console.log(db);
// // 테이블 생성
// db.serialize(() => {
//   db.run(`
//     CREATE TABLE IF NOT EXISTS tab1 (
//       Number INTEGER PRIMARY KEY AUTOINCREMENT,
//       ID TEXT NOT NULL,
//       sex TEXT NOT NULL,
//       PhoneNumber INTEGER NOT NULL
//     )
//   `);
// });

// db.close(); // 데이터베이스 연결 닫기

// console.log('테이블 생성이 완료되었습니다.');