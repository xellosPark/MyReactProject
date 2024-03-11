import './App.css';
import FullCalendarComponent from './BoardToday/FullCalendarComponent';
import Today from './BoardToday/Today';

// Item component that takes a number prop to display
const Item = ({ number }) => (
  <div className={`Today Today-${number}`}>
    {`아이템 ${number}`}
  </div>
);

// The main container component that uses the Item components
const MainContainer = () => (
  <>
  <div className="left-panel">
     <Today className="Today-1" />
     <Today className="Today-2" />
     <Today className="Today-3" />
   </div>
  
  <div className="main-container">
    <FullCalendarComponent number={4} />
  </div>
  </>
);

// The App component that renders the main container
const App = () => (
  <div className="App">
    <MainContainer />
  </div>
);
export default App;
