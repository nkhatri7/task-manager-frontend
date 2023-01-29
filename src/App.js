import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from './utils/api.utils';
import useDetectTheme from './hooks/useDetectTheme';
import Login from './routes/Login/Login';
import Register from './routes/Register/Register';
import Home from './routes/Home/Home';
import './App.scss';

const App = () => {
    const [user, setUser] = useState(null);
    useDetectTheme();

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
        axios.get(`${API_BASE_URL}/api/v1/users/${userId}`)
            .then((res) => setUser(res.data))
            .catch((err) => console.log(err));
    };

    /**
     * Removes the user ID from local storage and resets the program's user state.
     */
    const signOutUser = () => {
        localStorage.removeItem('taskr-user');
        setUser(null);
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home user={user} signOutUser={signOutUser} updateUser={getActiveUser} />} />
                <Route path='/login' element={<Login user={user} updateUser={getActiveUser} />} />
                <Route path='/register' element={<Register user={user} updateUser={getActiveUser} />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;