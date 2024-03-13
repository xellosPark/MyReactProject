import React from 'react';

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
            <td>{post.body}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;