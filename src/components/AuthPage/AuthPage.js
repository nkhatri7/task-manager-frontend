import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm';
import './AuthPage.scss';

const AuthPage = ({ user, updateUser, authType }) => {
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
            <section className="auth-card">
                <AuthForm updateUser={updateUser} authType={authType} />
            </section>
        </main>
    );
};

export default AuthPage;