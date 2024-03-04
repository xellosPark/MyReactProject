import React, { useState } from 'react'

function Todo({item}) {

  const style1 = { color: "black"};
  const style2 = { color: "lightgray", textDecorationLine: "line-through"};

  const [isChecked, setIschecked] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  const hChecked = () => {
    setIschecked(!isChecked);
  }

  const hHide =()=>{
    setIsHidden(false);
  }

  return (
    <p>
        {isHidden && <input type="checkbox" onChange={hChecked}></input> }
        {isHidden && <span style={isChecked? style2: style1}>
            {item.name}
            {isChecked && <button onClick={hHide}>숨기기</button>}
        </span> }
    </p>
  )
}

export default Todo