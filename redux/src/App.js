import './App.css';
import React, { useState } from 'react';
////////////////////////////////////////////////////////////////////////////
//////////////              Redux 리덕스 예제                  //////////////
////////////////////////////////////////////////////////////////////////////

import { createStore } from 'redux';
//provider->제공자
import { Provider, useSelector, useDispatch, connet} from 'react-redux'

function reducer(currentState, action){

  if(currentState === undefined)
  {
    return {
      number:1
    }
  }

  //...currentState 복제 본 
  const newState = {...currentState}

  if (action.type === 'PLUS'){
      newState.number++;
  }
  return newState;
}
const store = createStore(reducer);


function App() {
  
  return (
    <div id="container">
      <h1>Root : </h1>
      <div id="grid">
        <Provider store={store}>
          <Left1 />
          <Rigth1 />
        </Provider>
      </div>
    </div>
  );
}

function Left1() {
  return (
    <div >
      <h1>Left1 : </h1>
      <Left2 />
    </div>
  );
}

function Left2() {
  return (
    <div >
      <h1>Left2 : </h1>
      <Left3 />
    </div>
  );
}

function Left3() {
  // function f(state){
  //   return state.number;
  // }
  // const number = useSelector(f);
  const number = useSelector((state) => state.number);
  return (
    <div >
      <h1>Left3 : {number} </h1>
    </div>
  );
}

function Rigth1(props) {
  return (
    <div >
      <h1>Rigth1</h1>
      <Rigth2/>
    </div>
  );
}
function Rigth2(props) {
  return (
    <div >
      <h1>Rigth2</h1>
      <Rigth3/>
    </div>
  );
}
function Rigth3(props) {
  const dispatch = useDispatch();
  return (
    <div >
      <h1>Rigth3</h1>
      <input type="button" value="+" onClick={()=>{
        dispatch({ type: 'PLUS'});
      }}></input>
    </div>
  );
}

////////////////////////////////////////////////////////////////////////////
//////////////              props 프롭스 예제                  //////////////
////////////////////////////////////////////////////////////////////////////

// function App() {
//   const [number, setNumber] = useState(1);
//   return (
//     <div id="container">
//       <h1>Root : {number}</h1>
//       <div id="grid">
//         <Left1 number={number}/>
//         <Rigth1 onIncrease={() => {
//         setNumber(number+1);
//       }}/>
//       </div>
//     </div>
//   );
// }

// function Left1(props) {
//   return (
//     <div >
//       <h1>Left1 : {props.number}</h1>
//       <Left2 number={props.number}/>
//     </div>
//   );
// }

// function Left2(props) {
//   return (
//     <div >
//       <h1>Left2 : {props.number}</h1>
//       <Left3 number={props.number}/>
//     </div>
//   );
// }

// function Left3(props) {
//   return (
//     <div >
//       <h1>Left3 : {props.number}</h1>
//     </div>
//   );
// }

// function Rigth1(props) {
//   return (
//     <div >
//       <h1>Rigth1</h1>
//       <Rigth2 onIncrease={() => {
//         props.onIncrease();
//       }}
//       />
//     </div>
//   );
// }
// function Rigth2(props) {
//   return (
//     <div >
//       <h1>Rigth2</h1>
//       <Rigth3 onIncrease={() => {
//         props.onIncrease();
//       }}
//       />
//     </div>
//   );
// }
// function Rigth3(props) {
//   return (
//     <div >
//       <h1>Rigth3</h1>
//       <input type="button" value="+" onClick={()=>{props.onIncrease()}}></input>
//     </div>
//   );
// }

export default App;
