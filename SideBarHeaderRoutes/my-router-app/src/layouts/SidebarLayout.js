import React from 'react';
import { Link } from 'react-router-dom';

function SidebarLayout() {
  return (
    <aside style={{ backgroundColor: '#78909c', width: '150px', padding: '10px', color: 'white', display: 'flex', flexDirection: 'column' }}>
      <Link to="/sidebar/view3" style={{ color: 'white', textDecoration: 'none', margin: '10px 0' }}>사이드 메뉴 1</Link>
      <Link to="/sidebar/view4" style={{ color: 'white', textDecoration: 'none', margin: '10px 0' }}>사이드 메뉴 2</Link>
      <Link to="/sidebar/view5" style={{ color: 'white', textDecoration: 'none', margin: '10px 0' }}>사이드 메뉴 3</Link>
    </aside>
  );
}

export default SidebarLayout;