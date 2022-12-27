import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useDetectTheme from '../../hooks/useDetectTheme';
import './Home.scss';

const Home = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    useDetectTheme();

    /**
     * Redirects the user to the auth page.
     */
    const goToAuthPage = useCallback(() => {
        navigate('/auth');
    }, [navigate]);

    /**
     * Checks for the application user key in local storage to see if the user is signed in.
     */
    const checkActiveUser = useCallback(() => {
        const userId = localStorage.getItem('taskr-user');
        // If the user is signed in, get the active user data. 
        // Otherwise, redirect the user to the auth page where they can create an account or sign in.
        if (userId) {
            getActiveUser(userId);
        } else {
            goToAuthPage();
        }
    }, [goToAuthPage]);

    useEffect(() => {
        checkActiveUser();
    }, [checkActiveUser]);

    useEffect(() => {
        if (user) {
            console.log(user);
        }
    }, [user]);

    /**
     * Uses the task manager API to fetch the user data with the given user ID and updates the user state.
     * @param {String} userId The user ID for the active user
     */
    const getActiveUser = async (userId) => {
        const res = await fetch(`http://localhost:8080/api/v1/users/${userId}`);
        const user = await res.json();
        setUser(user);
    };

    return (
        <div>Home</div>
    );
};

export default Home;