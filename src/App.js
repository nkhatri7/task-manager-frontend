import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.scss';
import Auth from './routes/Auth/Auth';
import Home from './routes/Home/Home';

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem('taskr-user');
        if (userId) {
            getActiveUser(userId);
        }
    }, []);

    /**
     * Uses the taskr API to fetch the user data with the given user ID and updates the user state.
     * @param {String} userId The user ID for the active user
     */
    const getActiveUser = (userId) => {
        axios.get(`http://localhost:8080/api/v1/users/${userId}`)
            .then((res) => setUser(res.data))
            .catch((err) => console.log(err));
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home user={user} />} />
                <Route path='/auth' element={<Auth user={user} />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
