import React, { useState } from 'react';

const GitClone = () => {
  const [url, setUrl] = useState('https://github.com/xellosPark/WebServer.git');
  const [dir, setDir] = useState('/WebServer');
  const [message, setMessage] = useState('');
  const [logs, setLogs] = useState([]);

  const handleClone = () => {
    const worker = new Worker(`${process.env.PUBLIC_URL}/gitWorker.js`);

    worker.onmessage = (e) => {
      const { success, logMessages } = e.data;
      setLogs(logMessages);
      if (success) {
        setMessage('Repository cloned successfully');
      } else {
        setMessage('Error occurred during cloning');
      }
    };

    worker.postMessage({ url, dir });
  };

  return (
    <div>
      <h1>Clone a Git Repository</h1>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Repository URL"
      />
      <input
        type="text"
        value={dir}
        onChange={(e) => setDir(e.target.value)}
        placeholder="Directory"
      />
      <button onClick={handleClone}>Clone</button>
      <p>{message}</p>
      <div>
        <h2>Logs:</h2>
        <ul>
          {logs.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GitClone;