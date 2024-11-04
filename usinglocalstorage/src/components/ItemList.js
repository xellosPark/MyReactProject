import React from 'react';

function ItemList({ array, label, onSelectionChange }) {
  return (
    <div>
      <h2>{label}</h2>
      <ul>
        {array.map((item, index) => (
          <li key={index}>
            <input
              type="checkbox"
              onChange={() => onSelectionChange(item)}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;