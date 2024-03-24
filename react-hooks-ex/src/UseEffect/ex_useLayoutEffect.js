import React, { useState,useLayoutEffect,useRef,useEffect } from 'react';

function getNumbers(){
    return [1,2,3,4,5,6,7,8,9, 10,11,12,13,14,15];
}

function ExuseLayoutEffect() {
    const [numbers, setNumbers] = useState([]); 
    const ref = useRef(null);

      //화면 출력후 useEffect 호출된다
    useEffect(()=>{
        const nums = getNumbers();
        setNumbers(nums);
    },[]);

    useLayoutEffect(() => {
        if(numbers.length === 0){
            return;
        }        
        ref.current.scrollTop = ref.current.scrollHeight;
    },[numbers]);

    return (
        <>
            <button onClick={() => setNumbers([])}>Reset</button>
            <div
                ref={ref}
                style={{
                    height: "300px",
                    border: "1px solid blue",
                    overflow: "scroll",
                }}
            >
                {numbers.map((number, idx) => <p key={idx}>{number}</p>)}
            </div>
        </>
    )
}

export default ExuseLayoutEffect