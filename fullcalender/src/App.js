import './App.css';
import FullCalendarComponent from './FullCalendarComponent';
import Today from './Today';

function App() {
  return (
    <div>
      <div className="today">
        <Today />
      </div>
      <div className="fullaaaa">
        <FullCalendarComponent />
      </div>
    </div>
  );
}

export default App;
