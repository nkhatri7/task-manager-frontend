import React from 'react';
import AuthPage from '../../components/AuthPage/AuthPage';

const Login = ({ user, updateUser }) => {
    return (
        <AuthPage user={user} updateUser={updateUser} authType='Sign In' />
    );
};

export default Login;