import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import Auth from './routes/Auth/Auth';
import Home from './routes/Home/Home';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/auth' element={<Auth />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
