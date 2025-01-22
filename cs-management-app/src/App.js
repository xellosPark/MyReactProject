import React from 'react';
import Header from './components/Header';
import MiddleSection from './components/MiddleSection';
import BottomSection from './components/BottomSection';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <MiddleSection />
      <BottomSection />
    </div>
  );
}

export default App;