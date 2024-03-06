import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import App from './App';
import Home from './Pages/Home';
import Features from './Pages/Features';
import Pricng from './Pages/Pricng';

function Routing() {
    return (
        <div className="App">
        
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/home' element={<Home />} />
                <Route path='/features' element={<Features />} />
                <Route path='/pricing' element={<Pricng />} />
            </Routes>
        </BrowserRouter>
        </div>
    );
}

export default Routing;
