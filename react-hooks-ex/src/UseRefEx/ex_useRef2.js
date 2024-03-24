import React,{ useState, useRef } from 'react'

function ExuseRef2() {
    const [renderer, setRenderer] = useState(0);
    const countRef = useRef(0);
    let countVar = 0;

    const doRendering = () => {
        setRenderer(renderer + 1);
    };
    
    const increaseRef = () => {
        countRef.current = countRef.current + 1;
        console.log("ref:", countRef.current);
    };
    
    const increaseVar = () => {
        countVar = countVar + 1;
        console.log("‘var:’", countVar);
    };

    const printResults = () => {
        console.log(`ref: ${countRef.current}, var: ${countVar}`)
    };
    
    return (
      <div>
        <p>Ref: {countRef.current}</p>
        <p>Var: {countVar}</p>
        <button onClick={doRendering}>알려!</button>
        <button onClick={increaseRef}>Ref 증가</button>
        <button onClick={increaseVar}>Var 증가</button>
        <button onClick={printResults}>Ref Var 값 출력</button>
      </div>
    );
}

export default ExuseRef2