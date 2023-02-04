import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from './utils/api.utils';
import { 
    getCookieValue, 
    storeSessionData, 
    getRequestHeader, 
} from './utils/auth.utils';
import useDetectTheme from './hooks/useDetectTheme';
import Login from './routes/Login/Login';
import Register from './routes/Register/Register';
import Home from './routes/Home/Home';
import './App.scss';

const App = () => {
    const [user, setUser] = useState(null);
    useDetectTheme();

    useEffect(() => {
        const sessionId = getCookieValue('SID');
        const sessionHash = getCookieValue('HSID');
        if (sessionId && sessionHash) {
            getActiveUser();
            // Update the expiration date of the cookies for the session ID
            // and session hash to extend session every time page is loaded
            storeSessionData(sessionId, sessionHash);
        }
    }, []);

    /**
     * Uses the taskr API to fetch the user's data with the session ID and
     * session hash stored in cookies.
     */
    const getActiveUser = () => {
        axios.get(`${API_BASE_URL}/api/v1/users/`, getRequestHeader())
            .then((res) => setUser(res.data))
            .catch((err) => setUser(null));
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home user={user} updateUser={getActiveUser} />} />
                <Route path='/login' element={<Login user={user} updateUser={getActiveUser} />} />
                <Route path='/register' element={<Register user={user} updateUser={getActiveUser} />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;