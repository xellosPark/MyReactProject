import './App.css';
import {useState, useRef} from "react";

function Badinput() {

  const [name, setName] = useState("Guest");
  const [inputValue, setinputvalue] = useState("");

  const hinputchange = (event)=>{
    console.log(event.target.value);
    setinputvalue(event.target.value);
  };

  const hchangename = ()=>{
    setName(inputValue);
  }

  return (
    <div className="App">
      <input type='text' value={inputValue} onChange={hinputchange}></input>
      <button onClick={hchangename}>이름 전송</button>
      <h1>안녕하세요,{name}님!</h1>
    </div>
  );
}

function Goodinput() {

  const [name, setName] = useState("Guest");
  const inputRef = useRef("");

  const refchange = () => {
    setName(inputRef.current.value);
  }

  return (
    <div className="App">
      <input type='text' ref ={inputRef} onChange={refchange}></input>
      <h1>안녕하세요,{name}님!</h1>
    </div>
  );
}

function CountDefEx() {

  const [stateCount, setStateCount] = useState(0);
  let count = 0
  const refCount = useRef(0);
  // 변수처럼 값을 저정할 필요가 있는 변수 단. Ui 보일 필요가 없는애들
  return (
    <div>
      <div>state: {stateCount} </div>
      <div>변수 : {count}</div>
      {<div> ref:{refCount.current}</div>}

      <button onClick={() => setStateCount(prev=>prev+1)}>
        state up
      </button>
      <button onClick={() => {
          count++;
          console.log("변수", count);
        }} >
        변수 up
      </button>
      <button onClick={()=>{
        refCount.current++;
        console.log("ref",refCount);
      }}
      >
        ref up
      </button>
    </div>
  )
}
// useRef 값을 계속 유지
// useState의 장점과 변수의 장점을 합쳐두게 useRef
function App() {
  return (
    <div className="App">
      <Badinput/>
      <hr></hr>
      <Goodinput/>
      <hr></hr>
      <CountDefEx/>
    </div>
  );
}

export default App;
