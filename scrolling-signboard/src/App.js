import React, { useLayoutEffect, useRef } from 'react';
import ScrollText from './ScrollText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const App = () => {
  const bellRef = useRef(null);

  useLayoutEffect(() => {
    const bellElement = bellRef.current;
    let isPink = true;

    const toggleColor = () => {
      if (isPink) {
        bellElement.style.color = 'yellow';
      } else {
        bellElement.style.color = 'pink';
      }
      isPink = !isPink;
    };

    const intervalId = setInterval(toggleColor, 500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      <div className="column bell-column">
        <FontAwesomeIcon icon={faBell} size="2x" ref={bellRef} />
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