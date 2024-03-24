import React, { useState,useLayoutEffect, useEffect } from 'react';

function ExuseEffect() {

    const [count, setCount] = useState(0);

    const handleConutUpdate = () => {
        setCount(count + 1);
    };

    //화면 출력후 useEffect 호출된다
    useEffect(()=>{
            console.log("useEffect", count);
    },[count])

    //화면 출력전에 useLayoutEffect 호출된다(동기방식)
    useLayoutEffect(()=>{
        console.log("useLayoutEffect", count);
    },[count])

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={handleConutUpdate}>Update</button>
        </div>
    );
}

export default ExuseEffect;