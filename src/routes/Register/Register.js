import React from 'react';
import AuthPage from '../../components/AuthPage/AuthPage';

const Register = ({ user, updateUser }) => {
    return (
        <AuthPage user={user} updateUser={updateUser} authType='Registration' />
    );
};

export default Register;