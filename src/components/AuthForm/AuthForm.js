import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
    updateLabelStyling, 
    displayError, 
    removeError, 
} from '../../utils/input.utils';
import { storeSessionData, validatePassword } from '../../utils/auth.utils';
import { API_BASE_URL } from '../../utils/api.utils';
import InputField from '../InputField/InputField';
import './AuthForm.scss';

const SIGN_IN = 'Sign In';
const REGISTRATION = 'Registration';

const AuthForm = ({ updateUser, authType }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isFormFilled, setFormFilled] = useState(false);

    const nameInput = useRef(null);
    const nameLabel = useRef(null);
    const emailInput = useRef(null);
    const emailLabel = useRef(null);
    const emailErrorMsg = useRef(null);
    const passwordInput = useRef(null);
    const passwordLabel = useRef(null);
    const passwordErrorMsg = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        // Disable/undisable submit btn if all form fields are filled in
        if (authType === SIGN_IN) {
            setFormFilled(email.trim() !== '' && password.trim() !== '');
        } else {
            setFormFilled(
                name.trim() !== '' 
                && email.trim() !== '' 
                && password.trim() !== ''
            );
        }
    }, [authType, name, email, password]);

    /**
     * Updates the name value.
     * @param {Event} e The event that triggered this function
     */
    const handleNameChange = (e) => {
        setName(e.target.value);
        updateLabelStyling(nameLabel, e.target.value.trim() === '');
    };

    /**
     * Updates the email value.
     * @param {Event} e The event that triggered this function
     */
    const handleEmailChange = (e) => {
        setEmail(e.target.value.trim());
        updateLabelStyling(emailLabel, e.target.value.trim() === '');
    };

    /**
     * Updates the password value.
     * @param {Event} e The event that triggered this function
     */
    const handlePasswordChange = (e) => {
        setPassword(e.target.value.trim());
        updateLabelStyling(passwordLabel, e.target.value.trim() === '');
    };

    /**
     * Navigates to the other auth page.
     */
    const handleAuthTypeToggle = () => {
        // Update type
        if (authType === SIGN_IN) {
            navigate('/register');
        } else {
            navigate('/login');
        }
    };

    /**
     * Prevents default form submission functionality and handles validations.
     * @param {Event} e Form submission event
     */
    const handleAuthRequest = (e) => {
        e.preventDefault();
        const isPasswordValid = validatePassword(password);
        if (isPasswordValid) {
            removeError(passwordInput, passwordErrorMsg);
            if (authType === SIGN_IN) {
                signInUser();
            } else {
                registerUser();
            }
        } else {
            const errorMsg = 'Password must be at least 8 characters long.';
            displayError(errorMsg, passwordInput, passwordErrorMsg);
        }
    };

    /**
     * Attempts to sign in the user using the API.
     */
    const signInUser = () => {
        const data = {
            email: email,
            password: password,
        }
        axios.post(`${API_BASE_URL}/api/v1/auth/login`, data)
            .then((res) => handleAuthSuccess(res))
            .catch((err) => handleSignInError(err));
    };

    /**
     * Handles any errors from the API response after requesting to sign in.
     * @param {AxiosError} err The error response from the API call.
     */
    const handleSignInError = (err) => {
        if (err.response.status === 404) {
            displayError(err.response.data, emailInput, emailErrorMsg);
            removeError(passwordInput, passwordErrorMsg);
        } else if (err.response.status === 401) {
            displayError(err.response.data, passwordInput, passwordErrorMsg);
            removeError(emailInput, emailErrorMsg);
        } else {
            console.log(err);
        }
    };

    /**
     * Attempts to create an account for the user using the API.
     */
    const registerUser = () => {
        const data = {
            name: name.trim(),
            email: email,
            password: password,
        };
        axios.post(`${API_BASE_URL}/api/v1/auth/register`, data)
            .then((res) => handleAuthSuccess(res))
            .catch((err) => handleRegistrationError(err));
    };

    /**
     * Handles any errors from the API response after requesting to create an 
     * account.
     * @param {AxiosError} err The error response from the API call.
     */
    const handleRegistrationError = (err) => {
        if (err.response.status === 401 || err.response.status === 406) {
            displayError(err.response.data, emailInput, emailErrorMsg);
            removeError(passwordInput, passwordErrorMsg);
        } else {
            console.log(err);
        }
    };

    /**
     * Handles necessary actions for when an auth request is successful.
     * @param {AxiosResponse} res The response from the API
     */
    const handleAuthSuccess = (res) => {
        if (res.status === 200 || res.status === 201) {
            removeError(emailInput, emailErrorMsg);
            removeError(passwordInput, passwordErrorMsg);
            // Create cookies to store session ID and session hash
            const { sessionId, sessionHash } = res.data.session;
            storeSessionData(sessionId, sessionHash);
            updateUser();
        }
    };

    return (
        <form onSubmit={handleAuthRequest} className="auth-form">
            <h2 className='auth-form-heading'>{authType === SIGN_IN ? 'Sign In' : 'Create Account'}</h2>
            {authType === REGISTRATION ? 
                <InputField type='name' inputId='name' value={name} onChange={handleNameChange} label='Name'
                    inputRef={nameInput} labelRef={nameLabel} hasError={false} />
                : null
            }
                <InputField type='email' inputId='email' value={email} onChange={handleEmailChange} 
                    label='Email Address' inputRef={emailInput} labelRef={emailLabel} hasError={true}
                    errorRef={emailErrorMsg} />
                <InputField type='password' inputId='password' value={password} onChange={handlePasswordChange}
                    label='Password' inputRef={passwordInput} labelRef={passwordLabel} hasError={true}
                    errorRef={passwordErrorMsg} />
            <input 
                type="submit" 
                value={authType === SIGN_IN ? 'Sign In' : 'Create Account'} 
                className="auth-submit-btn" 
                disabled={!isFormFilled} 
            />
            <p className="switch-auth-type-prompt" onClick={handleAuthTypeToggle}>
                {authType === SIGN_IN ? "Don't have an account? Sign up." : "Already have an account? Sign In."}
            </p>
        </form>
    );
};

export default AuthForm;