import React from 'react';
import './ScrollText.css';

const ScrollText = ({ text }) => (
  <div className="container">
    <div className="text">{text}</div>
  </div>
);

export default ScrollText;