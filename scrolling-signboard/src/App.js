import React from 'react';
import ScrollText from './ScrollText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <div className="column bell-column">
        <FontAwesomeIcon icon={faBell} size="2x" className="toggle" />
      </div>
      <div className="column text-column">
        <p>1열 문자 고정</p>
      </div>
      <div className="column scroll-column">
        <ScrollText text="2열 흘러가는 문자" />
      </div>
    </div>
  );
}

export default App;