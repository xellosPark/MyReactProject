// 메인 애플리케이션 구조 정의

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Content1 from './components/Content1';
import Content2 from './components/Content2';
import Content3 from './components/Content3';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* 헤더 */}
        <Header />
        
        {/* 컨텐츠 영역 */}
        <div className="main-content">
          {/* 사이드바 */}
          <Sidebar />

          {/* 라우트 설정 */}
          <div className="content">
            <Routes>
              <Route path="/content1" element={<Content1 />} />
              <Route path="/content2" element={<Content2 />} />
              <Route path="/content3" element={<Content3 />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;