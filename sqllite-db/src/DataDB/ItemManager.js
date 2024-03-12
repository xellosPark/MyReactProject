import React, { useState, useEffect } from 'react';
import db from './db';

function ItemManager() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');

//   useEffect(() => {
//     // 데이터베이스에서 항목 가져오기
//     console.log('모야.');
//     db.all("SELECT * FROM items", (err, rows) => {
//       if (err) {
//         console.error(err.message);
//       } else {
//         setItems(rows);
//       }
//     });
//   }, []);

//   const handleAddItem = () => {
//     // 데이터베이스에 항목 추가
//     db.run("INSERT INTO items (name) VALUES (?)", [name], (err) => {
//       if (err) {
//         console.error(err.message);
//       } else {
//         setItems([...items, { name }]);
//         setName('');
//       }
//     });
//   };

//   const handleDeleteItem = (id) => {
//     // 데이터베이스에서 항목 삭제
//     db.run("DELETE FROM items WHERE id = ?", [id], (err) => {
//       if (err) {
//         console.error(err.message);
//       } else {
//         setItems(items.filter(item => item.id !== id));
//       }
//     });
//   };

  return (
    <div>
      <h2>항목 관리자</h2>
      {/* <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={handleAddItem}>항목 추가</button>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => handleDeleteItem(item.id)}>삭제</button>
          </li>
        ))}
      </ul> */}
    </div>
  );
}

export default ItemManager;