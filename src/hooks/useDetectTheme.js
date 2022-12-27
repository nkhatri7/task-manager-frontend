import { useState, useEffect } from 'react';

/**
 * Checks localStorage if a theme preference for this application has already been saved, otherwise checks the user's
 * preferred theme on their system.
 * @returns {string} The user's preferred theme (default is light).
 */
const useDetectTheme = () => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        if (localStorage.getItem('theme') && localStorage.getItem('theme') === 'dark') {
            setTheme(localStorage.getItem('theme'));
        } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setTheme('dark');
        }

        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return theme;
};

export default useDetectTheme;