import React from 'react';
import './App.css';
import FileExplorer from './FileItem/FileItem'


function App() {
  // const items = [
  //   { name: 'hello.txt', created: 'Wed, 08 Mar 2023 18:16:30 GMT', size: '13 bytes', type: 'file' },
  //   { name: 'myfolder', created: 'Wed, 08 Mar 2023 18:16:39 GMT', size: '4096 bytes', type: 'folder' },
  // ];

  return (
    <div className="App">
      {/* <FileExplorer items={items} /> */}
      <FileExplorer />
    </div>
  );
}

export default App;