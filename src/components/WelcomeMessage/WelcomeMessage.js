import React from 'react';

const WelcomeMessage = ({ name }) => {
    /**
     * Creates a welcome message for the user based on the current time of the 
     * day.
     * @returns {string} A welcome message to the user based on the current time
     * of the day.
     */
    const getWelcomeMessage = () => {
        const date = new Date();
        const greeting = getGreeting(date);
        return `${greeting}, ${name}`;
    };

    /**
     * Gets the appropriate greeting based on the time of day from the given 
     * date object.
     * @param {Date} date The date used to generate the greeting message
     * @returns {string} The appropriate greeting based on the current time of 
     * day.
     */
    const getGreeting = (date) => {
        const hour = date.getHours();
        if (hour >= 18 || hour < 4) {
            return 'Good Evening';
        } else if (hour >= 11) {
            return 'Good Afternoon';
        } else {
            return 'Good Morning';
        }
    };

    return (
        <h2 className="welcome-message">{getWelcomeMessage()}</h2>
    );
};

export default WelcomeMessage;