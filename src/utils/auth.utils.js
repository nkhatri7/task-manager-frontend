import { displayError, removeError, } from "./input.utils";

/**
 * Checks if the email is valid.
 * @param {string} email The email to be validated
 * @param {React.MutableRefObject<HTMLInputElement>} inputRef 
 * The ref variable linked to the input element
 * @param {React.MutableRefObject<HTMLElement>} errorRef 
 * The ref variable linked to the error message element
 * @returns {boolean} 
 * `true` if the email is valid and `false` if the email is not valid.
 */
const validateEmail = (email, inputRef, errorRef) => {
    // Use regex to test whether email is in valid format
    // eslint-disable-next-line
    const regex = new RegExp(/[a-z0-9\.]+@[a-z]+\.[a-z]{2,3}$/);
    const isEmailValid = regex.test(email);
    if (isEmailValid) {
        removeError(inputRef, errorRef);
    } else {
        displayError('Email is not valid.', inputRef, errorRef);
    }
    return isEmailValid;
};

/**
 * Checks if the password is at least 8 characters long.
 * @param {string} password The password to be validated
 * @param {React.MutableRefObject<HTMLInputElement>} inputRef 
 * The ref variable linked to the input element
 * @param {React.MutableRefObject<HTMLElement>} errorRef 
 * The ref variable linked to the error message element
 * @returns {boolean} 
 * `true` if the password is at least 8 characters long, and `false` if not.
 */
const validatePassword = (password, inputRef, errorRef) => {
    const isPasswordValid = password.trim().length >= 8;
    if (isPasswordValid) {
        removeError(inputRef, errorRef);
    } else {
        const errorMsg = 'Password must be at least 8 characters long.';
        displayError(errorMsg, inputRef, errorRef);
    }
    return isPasswordValid;
};

export {
    validateEmail,
    validatePassword,
};