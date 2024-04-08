import React, { useState } from 'react';
import './Table.css'; // 말풍선 스타일링을 위한 CSS 파일 임포트

const Table = ({ posts }) => {
  return (
    <table className='table'>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Body</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post, index) => (
          <tr key={index}>
            <td>{post.id}</td>
            <td>{post.title}</td>
            <td>
              <div className="preview-container">
                {post.body}
                <div className="preview">{post.body}</div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;