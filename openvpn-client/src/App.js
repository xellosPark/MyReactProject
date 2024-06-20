import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [status, setStatus] = useState('');

  const handleConnect = () => {
    axios.post('http://localhost:3033/connect')
      .then(response => setStatus(response.data.message))
      .catch(error => setStatus('Error: ' + error.message));
  };

  const handleDisconnect = () => {
    axios.post('http://localhost:3033/disconnect')
      .then(response => setStatus(response.data.message))
      .catch(error => setStatus('Error: ' + error.message));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>OpenVPN Client</h1>
        <div>
          <button onClick={handleConnect} className="connect">Connect</button>
          <button onClick={handleDisconnect} className="disconnect">Disconnect</button>
        </div>
        <p>{status}</p>
      </header>
    </div>
  );
}

export default App;