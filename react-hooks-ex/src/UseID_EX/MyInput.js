import { useEffect,useRef,useId } from 'react';

// useId는 접근성 속성에 전달할 수 있는 고유 ID를 생성하기 위한 React 훅입니다.
// 현존하는 리액트 훅중에 가장 쉬운 useId, 고유한 아이디를 만들때 꽤 유용하게 사용됩니다.
// 반환값 
// useId returns a unique ID string associated with this particular useId call in this particular component.
// useId는 특정 컴포넌트 내 특정 useId 와 관련된 고유 ID 문자열를 반환합니다.

// useId는 훅이므로 컴포넌트 최상단 또는 훅에서만 호출할 수 있습니다. 반복문이나 조건문 내에서 호출할 수 없습니다. 필요한 경우, 새로운 컴포넌트를 추출하고 컴포넌트 state로 이동하세요.
// useId를 목록에서 키를 생성하기 위해 사용하지 마세요. 키는 데이터에서 생성되어야 합니다.
function MyInput() {
    // 단 한번에 사용해서 id로 분류(고유이이디로 사용)한다
    // const id = Math.random() // 랜더링 발생으로 id값 변화가 된다. 
    const id = useId(); //Math.random() uuid 대처로 사용한다
    console.log(id); // :r0:
    const ref = useRef();
    
    useEffect(() => {
        // const element = document.querySelector('#btn');
        // :r1: is not a valid selector. :r1: 양점 두개 인식 안된다. 
        //const element = document.querySelector(id); 오류발생
        const element = ref.current;
        console.log(element);   //<input id=":r0:">
        
    }, []);
    
    
    
    return (
        <div>
            <button id="btn">버튼</button>
            <label htmlFor={id}>이름</label>
            <input id={id} ref={ref} />
            {/* <br />
            <label htmlFor={`${id}-age`}>나이</label>
            <input id={`${id}-age`} /> */}
        </div>
    );
};

export default MyInput;
