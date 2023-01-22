import { useState, useEffect } from 'react';

const LIGHT = 'light';
const DARK = 'dark';

/**
 * Checks localStorage if a theme preference for this application has already 
 * been saved, otherwise checks the user's preferred theme on their system.
 * @returns {string} The user's preferred theme (default is light).
 */
const useDetectTheme = () => {
    const [theme, setTheme] = useState(LIGHT);

    useEffect(() => {
        // Check if user has already saved a theme preference and if they don't
        // then check the user's preferred theme on their system
        if (localStorage.getItem('theme')) {
            setTheme(localStorage.getItem('theme'));
        } else if (window.matchMedia 
                && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setTheme(DARK);
        }

        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return theme;
};

export default useDetectTheme;