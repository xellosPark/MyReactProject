import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000', {
  transports: ['websocket', 'polling'],
});

function App() {
  const [uuid, setUuid] = useState('');
  const [response, setResponse] = useState(null);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to backend');
    });

    socket.on('uuidReceived', (data) => {
      setResponse(`Server acknowledged UUID: ${data}`);
    });

    return () => {
      socket.off('connect');
      socket.off('uuidReceived');
    };
  }, []);

  const sendUuid = () => {
    socket.emit('sendUuid', uuid);
  };

  return (
    <div>
      <h1>Socket.io React Client</h1>
      <input 
        type="text" 
        value={uuid} 
        onChange={(e) => setUuid(e.target.value)} 
        placeholder="Enter UUID" 
      />
      <button onClick={sendUuid}>Send UUID to Server</button>
      <p>{response}</p>
    </div>
  );
}

export default App;