import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthCard from '../../components/AuthCard/AuthCard';
import './Auth.scss';

const Auth = ({ user, updateUser }) => {
    const navigate = useNavigate();

    useEffect(() => {
        // If user is already signed in, go straight to home page
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    return (
        <main className="auth-main">
            <h1 className="auth-heading">Taskr</h1>
            <AuthCard updateUser={updateUser} />
        </main>
    );
};

export default Auth;