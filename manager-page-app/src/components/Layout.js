// src/components/Layout.js
import React, { useState, Suspense, lazy } from 'react';
import Header from './Header';
import Sider from './Sider';
import Content from './Content';
import Footer from './Footer';
import './Layout.css';

const Layout = () => {
  const [isCollapsed, setCollapsed] = useState(false);
  const [activeComponent, setActiveComponent] = useState(null);

  const toggleSidebar = () => {
    console.log('토글 사이드바 상태 이전:', isCollapsed);
    setCollapsed(!isCollapsed);
    console.log('토글 사이드바 상태 이후:', !isCollapsed);
  };

  const loadComponent = (componentName) => {
    console.log(`컴포넌트 로드 시도: ${componentName}`);
    switch (componentName) {
      case 'TeamTodoList':
        return lazy(() => import('./content/TeamTodoList'));
      case 'ProjectManager':
        return lazy(() => import('./content/ProjectManager'));
      case 'UserProfile':
        return lazy(() => import('./content/UserProfile'));
      default:
        console.log('알 수 없는 컴포넌트:', componentName);
        return null;
    }
  };

  const handleItemClick = (componentName) => {
    console.log(`아이템 클릭: ${componentName}`);
    const Component = loadComponent(componentName);
    if (Component) {
      setActiveComponent(() => Component);
      console.log(`컴포넌트 설정 완료: ${componentName}`);
    } else {
      console.log('컴포넌트 설정 실패');
    }
  };

  return (
    <div className={`layout ${isCollapsed ? 'collapsed' : ''}`}>
      <Header />
      <Sider isCollapsed={isCollapsed} onToggle={toggleSidebar} onItemClick={handleItemClick} />
      <Content>
        <Suspense fallback={<div>로딩 중...</div>}>
          {activeComponent && <activeComponent />}
        </Suspense>
      </Content>
      <Footer />
    </div>
  );
};

export default Layout;