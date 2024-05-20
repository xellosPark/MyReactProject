import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BulletinBoard from './BulletinBoard';
import TabBar from './TabBar';
import TabBatBody from './TabBarEx/TabBarbody'
import TabBatBody2 from './TabBarEx/TabBarbody2'
import ExcelExport from './Excel/Excel-Export';
import postsData from './posts.json';

function App() {
  // Array of tabs
  const tabs = ['첫화면', '공략'];
  const tabs2 = ['첫화면', '공략', "마지막"];


  return (
    <div className="App">
      
      <BulletinBoard />
      
      {/* <TabBatBody tabs={tabs} />
      <TabBatBody2 tabs={tabs2} />
      <TabBar />
      <ExcelExport data={postsData} /> */}
    </div>
  );
}

export default App;
