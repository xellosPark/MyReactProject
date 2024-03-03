import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react';

// 콤포넌트는 항상 대문자 시작 
function Item(props) {
  return (
    <div class="card">
      <img src={props.url} class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">{props.name}</h5>
        <p class="card-text">{props.email} <br></br>
          - Phone: {props.phone} <br></br>
          - Website: {props.website}  
        </p>
        <a href="#" class="btn btn-primary">구매하기</a>
      </div>
    </div>
  );
}

function App() {

  const [users, setUsers] = useState([]);

  useEffect( ()=>{
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(json => setUsers(json))
  }, []); // 데이터 받아오기를 한번만 하게하기 위해서...

  console.log("user??", users);
  
  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
      {users.map((user) => (
      <Item 
      name = {user.name}
      email = {user.email}
      phone = {user.phone}
      website = {user.website}
      url = "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjEyMDdfMjg4%2FMDAxNjcwMzkyNTY2MjEy.ulnbOZ0rIHbU1ZwQCHdmSDsUFZ-4piV9qzLuPDBZ9MQg.H-zUulcZUSl_mVjQuscOGNT7iYokdKMQhJQ1uc1oBPkg.JPEG.kcsgyj6%2F%25B4%25D9%25BF%25EE%25B7%25CE%25B5%25E5.jpeg%25A3%25AD380.jpg&type=a340"
      />))}
    </div>

  );
}

export default App;
