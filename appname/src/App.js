import './App.css';
import {useEffect, useState} from "react";

function App() {

//  let number = 2300;

  const [number, setNumber] = useState(100);

  const btnClick=()=>{
    //number = number + 1;
    setNumber(number + 1);
    console.log("number",number);
  }

  const [point, setPoint] = useState(0);
  const [grade ,setGrade] = useState("신입사원");
  const [salary, setSalary] = useState(5000);
  const [color, setColor]= useState("white");


  useEffect(()=>{
    console.log("직급이 변경되었습니다. 진급 축합니다.");

    if (grade === "과장")
    {
      setColor('green');
    }

    if (grade === "부장")
    {
      setColor('gold');
    }

  },[grade]);

  const btnClickuseEffect=()=>{
    setPoint(point + 200);
    console.log("일 잘하고 있음?, 진급했음");
    console.log("point", point);

    if (point === 1000)
    {
      setGrade("과장");
      setSalary(8000);
    }

    if (point === 2000)
    {
      setGrade("부장");
      setSalary(12000);
    }
  }
  
  return (
    <div className="App" style={{backgroundColor : `${color}`}}>
      <button onClick = {btnClick}>plue one</button>
      <h1>{number}</h1>
      <button onClick = {btnClickuseEffect}>useEffect</button>
      <h1>당신의 직급은 {grade} 입니다. <br></br>
          연봉은 {salary}만원 입니다.</h1>
    </div>
  );
}

export default App;
