import React,{ useState, useRef } from 'react'

function ExuseRef() {
    const [count, setCount] = useState(0);
    const countRef = useRef(0);

    console.log(countRef); // countRef.current
    console.log('런더링...');

    const increaseCountState = () => {
    setCount(count + 1);
    
    };

    const increaseCountRef = () => {
        countRef.current = countRef.current + 1;
        console.log('Ref: ',countRef.current); // countRef.current
    };
    
    return (
    <div>
    <p>State: {count}</p>
    <p>Ref: {countRef.current}</p>
    <button onClick={increaseCountState}>State 증가</button>
    <button onClick={increaseCountRef}>Ref 증가</button>
    </div>
    );
}

export default ExuseRef