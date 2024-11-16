// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeaderLayout from './layouts/HeaderLayout';
import SidebarLayout from './layouts/SidebarLayout';
import HeaderRoutes from './routes/HeaderRoutes';
import SidebarRoutes from './routes/SidebarRoutes';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        {/* 헤더 레이아웃 */}
        <HeaderLayout />

        <div style={{ display: 'flex', flex: 1 }}>
          {/* 사이드바 레이아웃 */}
          <SidebarLayout />

          {/* 메인 콘텐츠 영역 */}
          <main style={{ flex: 1, backgroundColor: '#ffeb3b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Routes>
              {/* 헤더 메뉴 라우트 */}
              <Route path="/header/*" element={<HeaderRoutes />} />
              {/* 사이드바 메뉴 라우트 */}
              <Route path="/sidebar/*" element={<SidebarRoutes />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;