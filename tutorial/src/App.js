import './App.css';

function App() {
  const users = [
    {name: "park"},
    {name: "Lee"},
    {name: "Kim"},
  ]

  const showUser = true;

  // if(!showUser){
  //   return null;
  // }

  return (
  <div className='App'>
    {
      showUser ? (
      <ul>
        {users.map(user => <li>{user.name}</li>)}
      </ul>
      ) : (null)
    }
  </div>
  );
}

export default App;
