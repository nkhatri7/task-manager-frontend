/**
 * Stores the session ID and hashed session ID in cookies.
 * @param {string} sessionId The user's session ID for the user's current device
 * @param {string} sessionHash Session hash for the user's current device.
 */
const storeSessionData = (sessionId, sessionHash) => {
    // Make expiration date 90 days from now
    const expDate = new Date();
    expDate.setTime(expDate.getTime() + (90 * 24 * 60 * 60 * 1000));
    // Set session ID and hashed session ID cookies
    setCookie('SID', sessionId, expDate.toUTCString());
    setCookie('HSID', sessionHash, expDate.toUTCString());
};

/**
 * Gets the session ID and session hash from the cookies.
 * @returns {object} The session ID and session hash.
 */
const getSessionData = () => {
    return {
        sessionId: getCookieValue('SID'),
        sessionHash: getCookieValue('HSID'),
    };
};

/**
 * Creates or updates a cookie with the given name, value and expiration date.
 * @param {string} name The name of the cookie
 * @param {string} value The value of the cookie
 * @param {string} expDateString The expiration date of the cookie
 */
const setCookie = (name, value, expDateString) => {
    document.cookie = `${name}=${value};expires=${expDateString};path=/`;
};

/**
 * Gets the value of the cookie stored with the given `name`.
 * @param {string} name The name of the cookie
 * @returns {string | null} The value of the cookie stored with the given 
 * `name`, or `null` if the cookie cannot be found.
 */
const getCookieValue = (name) => {
    // Get array of all cookie strings and iterate through them to find the
    // cookie with the given name
    const cookieArr = document.cookie.split(';');
    const cookie = cookieArr.find(cookie => {
        // Check if the name matches
        const cookieName = cookie.trim().substring(0, name.length);
        if (cookieName === name) {
            return true;
        }
        return false;
    });
    return cookie ? cookie.trim().substring(name.length + 1) : null;
};

/**
 * Removes the cookie with the given `name`.
 * @param {string} name The name of the cookie
 */
const removeCookie = (name) => {
    // Set expiration date to past to remove the cookie
    const expDate = new Date(2000, 0, 1);
    document.cookie = `${name}=a;expires=${expDate.toUTCString()};path=/`;
};

/**
 * Creates a headers object for requests with the session ID and session hash.
 * @returns {object} Request header.
 */
const getRequestHeader = () => {
    return {
        headers: {
            sessionId: getCookieValue('SID'),
            sessionHash: getCookieValue('HSID'),
        },
    };
};

/**
 * Checks if the password is at least 8 characters long.
 * @param {string} password The password to be validated
 * @returns {boolean} 
 * `true` if the password is at least 8 characters long, and `false` if not.
 */
const validatePassword = (password) => {
    return password.trim().length >= 8;
};

/**
 * Checks if the name is 30 characters or less.
 * @param {string} name The name to be validated
 * @returns {boolean} 
 * `true` if the name is 30 characters or less and `false` if it isn't.
 */
const validateName = (name) => {
    return name.trim().length <= 30;
};

export {
    storeSessionData,
    getSessionData,
    getCookieValue,
    removeCookie,
    getRequestHeader,
    validatePassword,
    validateName,
};