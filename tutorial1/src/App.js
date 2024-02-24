import './App.css';
import {useState} from "react";

function App() {

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

export default App;
