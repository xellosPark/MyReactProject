import React from 'react';
import { Link } from 'react-router-dom';

function HeaderLayout() {
  return (
    <header style={{ backgroundColor: '#607d8b', padding: '10px', color: 'white', display: 'flex', justifyContent: 'space-between' }}>
      <Link to="/header/view1" style={{ color: 'white', textDecoration: 'none', padding: '0 20px' }}>헤더 메뉴 1</Link>
      <Link to="/header/view2" style={{ color: 'white', textDecoration: 'none', padding: '0 20px' }}>헤더 메뉴 2</Link>
    </header>
  );
}

export default HeaderLayout;