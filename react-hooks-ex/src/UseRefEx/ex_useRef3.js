import React, { useState, useRef, useEffect } from 'react';

const ExuseRef3 = () => {
  const [count, setCount] = useState(1);
  //const [renderCount, setRenderCount] = useState(1);
  const renderCount = useRef(1);


  // useEffect(() => {
  //   console.log('렌더링!');
  //   setRenderCount(renderCount + 1);
  // });

useEffect(() => {
    renderCount.current = renderCount.current+1;
    console.log(renderCount.current);
});

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  );
};

export default ExuseRef3;