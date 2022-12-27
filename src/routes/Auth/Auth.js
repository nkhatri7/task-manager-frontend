import React from 'react';
import useDetectTheme from '../../hooks/useDetectTheme';
import AuthCard from '../../components/AuthCard/AuthCard';
import './Auth.scss';

const Auth = () => {

    useDetectTheme();

    return (
        <main className="auth-main">
            <h1 className="auth-heading">Taskr</h1>
            <AuthCard />
        </main>
    );
};

export default Auth;