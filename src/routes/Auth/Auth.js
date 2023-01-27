import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../components/AuthForm/AuthForm';
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
            <section className="auth-card">
                <AuthForm updateUser={updateUser} />
            </section>
        </main>
    );
};

export default Auth;