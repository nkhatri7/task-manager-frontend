import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AuthCard.scss';

const SIGN_IN = 'Sign In';
const REGISTRATION = 'Registration';

const AuthCard = () => {
    const [authType, setAuthType] = useState(SIGN_IN);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisibile, setPasswordVisible] = useState(false);
    const [isFormFilled, setFormFilled] = useState(false);

    const nameInput = useRef(null);
    const nameLabel = useRef(null);
    const emailInput = useRef(null);
    const emailLabel = useRef(null);
    const emailErrorMsg = useRef(null);
    const passwordInput = useRef(null);
    const passwordLabel = useRef(null);
    const passwordVisibilityToggle = useRef(null);
    const passwordErrorMsg = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (authType === SIGN_IN) {
            if (email.trim() !== '' && password.trim() !== '') {
                setFormFilled(true);
            } else {
                setFormFilled(false);
            }
        } else {
            if (name.trim() !== '' && email.trim() !== '' && password.trim() !== '') {
                setFormFilled(true);
            } else {
                setFormFilled(false);
            }
        }
    }, [authType, name, email, password]);

    useEffect(() => {
        if (password.trim() === '') {
            passwordVisibilityToggle.current.classList.add('password-visibility-toggle-hidden');
        } else {
            passwordVisibilityToggle.current.classList.remove('password-visibility-toggle-hidden');
        }
    }, [password]);

    /**
     * Updates the name value.
     * @param {Event} e The event that triggered this function
     */
    const handleNameChange = (e) => {
        setName(e.target.value.trim());
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
     * Toggles the password visibility
     */
    const handlePasswordVisibilityToggle = () => {
        if (isPasswordVisibile) {
            setPasswordVisible(false);
            passwordInput.current.type = 'password';
        } else {
            setPasswordVisible(true);
            passwordInput.current.type = 'text';
        }
    };

    /**
     * Updates an input's label styling based on whether it is empty or not.
     * @param {React.MutableRefObject<Element>} labelRef The ref variable linked to the input's label
     * @param {boolean} isInputEmpty Whether or not the input field is empty
     */
    const updateLabelStyling = (labelRef, isInputEmpty) => {
        labelRef.current.setAttribute('data-input-filled', isInputEmpty ? 'false' : 'true');
    };

    /**
     * Toggles the auth type and handles all necessary actions required when switching.
     */
    const handleAuthTypeToggle = () => {
        // Reset values
        setName('');
        setEmail('');
        setPassword('');
        setPasswordVisible(false);
        // Reset styling
        passwordInput.current.type = 'password';
        updateLabelStyling(emailLabel, true);
        updateLabelStyling(passwordLabel, true);
        // Remove errors
        removeError(emailInput, emailErrorMsg);
        removeError(passwordInput, passwordErrorMsg);
        // Update type
        if (authType === SIGN_IN) {
            setAuthType(REGISTRATION);
        } else {
            updateLabelStyling(nameLabel, true);
            setAuthType(SIGN_IN);
        }
    };

    /**
     * Checks whether email and password are valid and handles the sign in if they are valid.
     * @param {Event} e The event that triggered this function
     */
    const handleSignInRequest = (e) => {
        e.preventDefault();
        const isInputValid = validateEmail() && validatePassword();
        if (isInputValid) {
            const data = {
                email: email,
                password: password,
            }
            axios.post('http://localhost:8080/api/v1/auth/login', data)
                .then((res) => handleAuthSuccess(res))
                .catch((err) => handleSignInError(err));
        }
    };

    /**
     * Handles any errors from the API response after requesting to sign in.
     * @param {Error} err The error response from the API call.
     */
    const handleSignInError = (err) => {
        if (err.response.status === 404) {
            const errorMsg = 'An account with this email does not exist. Please create an account with this email or'
                + ' sign in with another email.';
            displayError(errorMsg, emailInput, emailErrorMsg);
            removeError(passwordInput, passwordErrorMsg);
        } else if (err.response.status === 401) {
            displayError('Password is incorrect.', passwordInput, passwordErrorMsg);
            removeError(emailInput, emailErrorMsg);
        } else {
            console.log(err);
        }
    };

    /**
     * Checks whether name, email and password are valid and handles the user registration if they are valid.
     * @param {Event} e The event that triggered this function
     */
    const handleRegistrationRequest = (e) => {
        e.preventDefault();
        const isInputValid = validateEmail() && validatePassword();
        if (isInputValid) {
            const data = {
                name: name,
                email: email,
                password: password,
            };
            axios.post('http://localhost:8080/api/v1/auth/register', data)
                .then((res) => handleAuthSuccess(res))
                .catch((err) => handleRegistrationError(err));
        }
    };

    /**
     * Handles any errors from the API response after requesting to create an account.
     * @param {Error} err The error response from the API call.
     */
    const handleRegistrationError = (err) => {
        if (err.response.status === 403) {
            const errorMsg = 'An account with this email already exists. Please sign in using this email or create an'
                + ' an account with another email.';
            displayError(errorMsg, emailInput, emailErrorMsg);
            removeError(passwordInput, passwordErrorMsg);
        } else if (err.response.status === 406) {
            displayError('Email is invalid.', emailInput, emailErrorMsg);
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
        if (res.status === 200) {
            removeError(emailInput, emailErrorMsg);
            removeError(passwordInput, passwordErrorMsg);
            // Update user ID in local storage
            localStorage.setItem('taskr-user', res.data._id);
            // Go to home page
            navigate('/');
        }
    };

    /**
     * Checks if the email is valid.
     * @returns {boolean} `true` if the email is valid and `false` if the email is not valid.
     */
    const validateEmail = () => {
        // Use regex to test whether email is in valid format
        // eslint-disable-next-line
        const regex = new RegExp(/[a-z0-9\.]+@[a-z]+\.[a-z]{2,3}$/);
        const isEmailValid = regex.test(email);
        if (isEmailValid) {
            removeError(emailInput, emailErrorMsg);
        } else {
            displayError('Email is not valid.', emailInput, emailErrorMsg);
        }
        return isEmailValid;
    };

    /**
     * Checks if the password is at least 8 characters long.
     * @returns {boolean} `true` if the password is at least 8 characters long, and `false` if not.
     */
    const validatePassword = () => {
        const isPasswordValid = password.trim().length >= 8;
        if (isPasswordValid) {
            removeError(passwordInput, passwordErrorMsg);
        } else {
            displayError('Password must be at least 8 characters long.', passwordInput, passwordErrorMsg);
        }
        return isPasswordValid;
    };

    /**
     * Displays the error message and updates the styling for the given input field when there is an error.
     * @param {string} errorMsg The error message to be displayed
     * @param {React.MutableRefObject<Element>} inputRef The ref variable linked to the input element
     * @param {React.MutableRefObject<Element>} errorMsgRef The ref variable linked to the error message element
     */
    const displayError = (errorMsg, inputRef, errorMsgRef) => {
        inputRef.current.classList.add('auth-input-error');
        errorMsgRef.current.innerText = errorMsg;
        errorMsgRef.current.classList.add('auth-input-error-msg-show');
    };

    /**
     * Hides the error message and updates the styling for the given input field when there is no error.
     * @param {React.MutableRefObject<Element>} inputRef The ref variable linked to the input element
     * @param {React.MutableRefObject<Element>} errorMsgRef The ref variable linked to the error message element
     */
    const removeError = (inputRef, errorMsgRef) => {
        inputRef.current.classList.remove('auth-input-error');
        errorMsgRef.current.innerText = '';
        errorMsgRef.current.classList.remove('auth-input-error-msg-show');
    };

    return (
        <section className='auth-card'>
            <form 
                onSubmit={authType === SIGN_IN ? handleSignInRequest : handleRegistrationRequest} 
                className="auth-form"
            >
                <h2 className='auth-form-heading'>{authType === SIGN_IN ? 'Sign In' : 'Create Account'}</h2>
                {authType === REGISTRATION ? 
                    <div className="auth-field">
                        <div className="auth-input-container">
                            <input 
                                type="name" 
                                name="name" 
                                id="name" 
                                placeholder='Name' 
                                value={name}
                                onChange={handleNameChange}
                                className="auth-input" 
                                ref={nameInput}
                            />
                            <label htmlFor="name" data-input-filled="false" className='auth-input-label' 
                                ref={nameLabel}>Name</label>
                        </div>
                    </div>
                    : null
                }
                <div className="auth-field">
                    <div className="auth-input-container">
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder='Email Address' 
                            value={email}
                            onChange={handleEmailChange}
                            className="auth-input" 
                            ref={emailInput}
                        />
                        <label htmlFor="email" data-input-filled="false" className='auth-input-label' 
                            ref={emailLabel}>Email Address</label>
                    </div>
                    <span className="auth-input-error-msg" ref={emailErrorMsg}></span>
                </div>
                <div className="auth-field">
                    <div className="auth-input-container">
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder='Password' 
                            value={password}
                            onChange={handlePasswordChange}
                            className='auth-input password-input' 
                            ref={passwordInput}
                        />
                        <label htmlFor="password" data-input-filled="false" className='auth-input-label'
                            ref={passwordLabel}>Password</label>
                        <div 
                            className="password-visibility-toggle password-visibility-toggle-hidden" 
                            ref={passwordVisibilityToggle} 
                            onClick={handlePasswordVisibilityToggle}
                        >
                            {isPasswordVisibile ? 
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                </svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            }
                        </div>
                    </div>
                    <span className="auth-input-error-msg" ref={passwordErrorMsg}></span>
                </div>
                <input 
                    type="submit" 
                    value={authType === SIGN_IN ? 'Sign In' : 'Create Account'} 
                    className="auth-submit-btn" 
                    disabled={!isFormFilled} 
                />
                <p className="switch-auth-type-prompt" onClick={handleAuthTypeToggle}>
                    {authType === SIGN_IN ? "Don't have an account? Sign up." 
                        : "Already have an account? Sign In."}
                </p>
            </form>
        </section>
    );
};

export default AuthCard;