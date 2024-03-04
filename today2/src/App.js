
import './App.css';
import List from './List';
import { useRef, useState } from 'react';

function App() {
  
  const inputText = useRef();
  const key = useRef(0);
  const [items, setItems] = useState([
    {
      id:0,
      name: "구독하기",
      data: "오늘까지"
    },
  ]);

  const hInput=()=>{

    setItems((prevTodos) => {

      return [...prevTodos,
      {
        id: key.current = key.current+1,
        name: inputText.current.value,
        done: "오늘까지"
      }
      ]
    });
  }


  return (
    <div className="App">
      <input ref={inputText}></input>
      <button onClick={hInput}>스케줄 입력</button>
      <hr></hr>
      <List items={items}/>
    </div>
  );
}

export default App;
