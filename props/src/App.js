import './App.css';
import {useState} from "react";

//props -> properties의 줄임말
// 생성된 콤포넌트는 서로 별개가 된다. 서로 알지 못한다.
//
function Child(props) {
  const [papamoney, setPapamoney] = useState(0);
  const [money, setMoney] = useState(0);

  const getMoney=()=>{
    setMoney(money + 5);
  }

  return (
    <div className="child">
        <h1>여기는 child인 {props.name} 앱 입니다.</h1>
        <button onClick={getMoney}>용돈 주세요.</button>
        <p>용돈을 {money}만큰 받았습니다.</p>
        <p>아빠의 월급이 {props.papamoney - money }만원 되었겠군요.</p>
      <hr/>
    </div>
  );
}

function App() {

  const [papamoney, setPapamoney] = useState(0);
  const getSelary=()=>{
    setPapamoney(papamoney + 700);
    
  }

  return (
    <div className="App">

      <h1>여기는 아빠 앱 입니다.</h1>
      <button onClick={getSelary}>아빠 월급날</button>
      <h1>월급 계좌의 잔액은 {papamoney}만원 입니다.</h1>
      <hr></hr>
      <Child papamoney = {papamoney} name="제니"/>
      <Child papamoney = {papamoney} name="아이유"/>
    </div>
  );
}

export default App;
