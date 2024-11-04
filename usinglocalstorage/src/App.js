import React, { useEffect, useState } from 'react';
import ItemList from './components/ItemList';
import './App.css'; // Include existing CSS

function App() {
  const [array1, setArray1] = useState([]);
  const [array2, setArray2] = useState([]);
  const [array3, setArray3] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [targetArray, setTargetArray] = useState('array2');

  useEffect(() => {
    // Load data from localStorage on component mount
    setArray1(JSON.parse(localStorage.getItem('array1')) || []);
    setArray2(JSON.parse(localStorage.getItem('array2')) || []);
    setArray3(JSON.parse(localStorage.getItem('array3')) || []);
  }, []);

  const initializeData = () => {
    const initialArray1 = Array.from({ length: 50 }, (_, i) => `Item ${i + 1} - A`);
    const initialArray2 = Array.from({ length: 50 }, (_, i) => `Item ${i + 1} - B`);
    const initialArray3 = Array.from({ length: 50 }, (_, i) => `Item ${i + 1} - C`);

    localStorage.setItem('array1', JSON.stringify(initialArray1));
    localStorage.setItem('array2', JSON.stringify(initialArray2));
    localStorage.setItem('array3', JSON.stringify(initialArray3));

    setArray1(initialArray1);
    setArray2(initialArray2);
    setArray3(initialArray3);
    console.log("데이터가 초기화되었습니다.");
  };

  const handleSelectionChange = (item) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const moveItemToFront = () => {
    console.log("아이템을 이동합니다 (앞에 추가):", selectedItems);

    if (selectedItems.length === 0) return;

    let updatedArray1 = array1.filter((item) => !selectedItems.includes(item));
    let updatedArray2 = array2.filter((item) => !selectedItems.includes(item));
    let updatedArray3 = array3.filter((item) => !selectedItems.includes(item));

    // Always add the selected items to the front of the target array
    if (targetArray === 'array1') {
      updatedArray1 = [...selectedItems, ...updatedArray1];
      setArray1(updatedArray1);
      localStorage.setItem('array1', JSON.stringify(updatedArray1));
    } else if (targetArray === 'array2') {
      updatedArray2 = [...selectedItems, ...updatedArray2];
      setArray2(updatedArray2);
      localStorage.setItem('array2', JSON.stringify(updatedArray2));
    } else if (targetArray === 'array3') {
      updatedArray3 = [...selectedItems, ...updatedArray3];
      setArray3(updatedArray3);
      localStorage.setItem('array3', JSON.stringify(updatedArray3));
    }

    // Update the arrays in state and localStorage
    setArray1(updatedArray1);
    setArray2(updatedArray2);
    setArray3(updatedArray3);
    localStorage.setItem('array1', JSON.stringify(updatedArray1));
    localStorage.setItem('array2', JSON.stringify(updatedArray2));
    localStorage.setItem('array3', JSON.stringify(updatedArray3));

    // Clear selected items
    setSelectedItems([]);
  };

  const deleteItem = () => {
    console.log("아이템을 삭제합니다:", selectedItems);

    const updatedArray1 = array1.filter((item) => !selectedItems.includes(item));
    const updatedArray2 = array2.filter((item) => !selectedItems.includes(item));
    const updatedArray3 = array3.filter((item) => !selectedItems.includes(item));

    setArray1(updatedArray1);
    setArray2(updatedArray2);
    setArray3(updatedArray3);
    localStorage.setItem('array1', JSON.stringify(updatedArray1));
    localStorage.setItem('array2', JSON.stringify(updatedArray2));
    localStorage.setItem('array3', JSON.stringify(updatedArray3));
    setSelectedItems([]);
  };

  const createNewItem = () => {
    console.log("새 아이템을 생성합니다.");
    const newItem = `New Item - ${Date.now()}`;
    const newArray1 = [...newItem, ...array1];
    setArray1(newArray1);
    localStorage.setItem('array1', JSON.stringify(newArray1));
  };

  const formatLocalStorage = () => {
    const keys = ['array1', 'array2', 'array3'];
    let formattedOutput = '';
    keys.forEach((key) => {
      formattedOutput += `${key}: ${JSON.parse(localStorage.getItem(key))}\n`;
    });
    return formattedOutput;
  };

  return (
    <div>
      <h1>테스트용 버튼</h1>
      <div>
        <strong>Array 1 ({array1.length} items)</strong>
        <span> | Array 2 ({array2.length} items)</span>
        <span> | Array 3 ({array3.length} items)</span>
      </div>
      <div>
        <p><strong>LocalStorage 상태:</strong></p>
        <pre>{formatLocalStorage()}</pre>
      </div>
      <button onClick={moveItemToFront}>앞에 추가해서 이동</button>
      <button onClick={deleteItem}>삭제</button>
      <button onClick={createNewItem}>추가</button>
      <button onClick={initializeData}>데이터 초기화</button>
      <select onChange={(e) => setTargetArray(e.target.value)} value={targetArray}>
        <option value="array1">Array 1로 이동</option>
        <option value="array2">Array 2로 이동</option>
        <option value="array3">Array 3로 이동</option>
      </select>
      <ItemList array={array1} label="Array 1" onSelectionChange={handleSelectionChange} />
      <ItemList array={array2} label="Array 2" onSelectionChange={handleSelectionChange} />
      <ItemList array={array3} label="Array 3" onSelectionChange={handleSelectionChange} />
    </div>
  );
}

export default App;
