// src/App.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import GithubLogView from './GithubLogView';

const socket = io('http://localhost:3001');

function App() {
  const [repoUrl, setRepoUrl] = useState('');
  const [logs, setLogs] = useState([]);
  const [commitLog, setCommitLog] = useState([]);

  useEffect(() => {
    socket.on('progress', (message) => {
      setLogs((prevLogs) => [...prevLogs, message]);
    });

    return () => {
      socket.off('progress');
    };
  }, []);

  const handleCloneOrUpdate = async () => {
    try {
      const response = await axios.post('http://localhost:3001/clone-or-update', { repoUrl });
      setCommitLog(response.data.commitLog);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <h1>Git Repo Cloner</h1>
      <input
        type="text"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        placeholder="Enter repository URL"
      />
      <button onClick={handleCloneOrUpdate}>Clone or Update Repo</button>
      <GithubLogView logs={logs} commitLog={commitLog} />
    </div>
  );
}

export default App;