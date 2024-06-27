// src/components/UserInfo.js
import React from 'react';
import './UserInfo.css';

const createData = (name, email, password, rank, yearOfJoining) => {
  return { name, email, password: '****', rank, yearOfJoining };
};

const rows = [
  createData('Jon Snow', 'jon@example.com', '****', 'A', 2015),
  createData('Cersei Lannister', 'cersei@example.com', '****', 'B', 2012),
  createData('Jaime Lannister', 'jaime@example.com', '****', 'A', 2011),
  createData('Arya Stark', 'arya@example.com', '****', 'C', 2016),
  createData('Daenerys Targaryen', 'daenerys@example.com', '****', 'A', 2017),
  // Add more rows as needed
];

const UserInfo = () => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Rank</th>
            <th>Year of Joining</th>
            <th>Edit Information</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>{row.password}</td>
              <td>{row.rank}</td>
              <td>{row.yearOfJoining}</td>
              <td>
                <button className="edit-button">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserInfo;