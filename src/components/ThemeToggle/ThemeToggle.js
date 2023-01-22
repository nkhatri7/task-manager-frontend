import React, { useState } from 'react';
import './ThemeToggle.scss';

import { ReactComponent as SunIcon } from '../../assets/sun.svg';
import { ReactComponent as MoonIcon } from '../../assets/moon.svg';

const LIGHT = 'light';
const DARK = 'dark';

const ThemeToggle = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') ?? LIGHT);

    /**
     * Toggles the application's theme.
     */
    const toggleTheme = () => {
        if (theme === LIGHT) {
            setTheme(DARK);
            updateTheme(DARK);
        } else {
            setTheme(LIGHT);
            updateTheme(LIGHT);
        }
    };

    /**
     * Updates the theme preference in local storage and updates the theme in
     * the HTML document.
     * @param {string} theme Light or dark theme
     */
    const updateTheme = (theme) => {
        // Update the user's theme preference in localstorage
        localStorage.setItem('theme', theme);
        // Update the theme data attribute in the HTML document
        document.documentElement.setAttribute('data-theme', theme);
    };

    return (
        <button className="theme-toggle-btn" aria-label='Toggle theme' onClick={toggleTheme}>
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
    );
};

export default ThemeToggle;