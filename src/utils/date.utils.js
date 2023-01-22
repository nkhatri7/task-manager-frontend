/**
 * Formats the given date into the following format: dd/MM/yyyy.
 * @param {Date} date the date that needs to be formatted
 * @returns {string} A formatted date string.
 */
const formatDate = (date) => {
    const day = formatNumber(date.getDate());
    const month = formatNumber(date.getMonth() + 1);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

/**
 * Creates a date object from the given date string in the format of dd/MM/yyyy.
 * @param {string} dateString A string in the format of dd/MM/yyyy
 * @returns {Date} A Date object from the given date string
 */
const parseDate = (dateString) => {
    try {
        const dateComponents = getDateComponentsFromString(dateString);
        const date = new Date(dateComponents.year, dateComponents.month,
                dateComponents.day);
        return date;
    } catch (err) {
        console.log(err);
    }
};

/**
 * Displays the date from the given date string in the format of dd MMM yyyy.
 * @param {string} dateString A string in the format of dd/MM/yyyy
 * @returns {string} A formatted date string that displays the day, month, and
 * year if it is a different year to the current one.
 */
const displayDueDate = (dateString) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 
            'Sep', 'Oct', 'Nov', 'Dec'];
    try {
        const dateComponents = getDateComponentsFromString(dateString);
        const month = months[dateComponents.month];
        let displayDate = `${dateComponents.day} ${month}`;
        // Check if the year is different to the current year
        const currentDate = new Date();
        if (currentDate.getFullYear() !== dateComponents.year) {
            // Add year to string if due date is in a different year
            displayDate += ` ${dateComponents.year}`;
        }
        return displayDate;
    } catch (err) {
        console.log(err);
    }
};

/**
 * Checks if the due date (the date from the given date string) is before the
 * current date.
 * @param {string} dateString A string in the format of dd/MM/yyyy
 * @returns {boolean} `true` if the task is overdue and `false` if it is not.
 */
const checkIfTaskIsOverdue = (dateString) => {
    const dueDate = parseDate(dateString);
    const currentDate = new Date();
    // If due date was in a previous year it is overdue
    if (dueDate.getFullYear() < currentDate.getFullYear()) {
        return true;
    }
    if (dueDate.getFullYear() === currentDate.getFullYear()) {
        // If due date was in a previous month in the same year it is overdue
        if (dueDate.getMonth() < currentDate.getMonth()) {
            return true;
        }
        // If due date is earlier in the same month, it is overdue
        if (dueDate.getMonth() === currentDate.getMonth()
                && dueDate.getDate() < currentDate.getDate()) {
            return true;
        }
    }
    return false;
};

/**
 * Extracts the day, month and year from the given date string.
 * @param {String} dateString A string in the format of dd/MM/yyyy
 * @returns {object} An object with the day, month and year.
 */
const getDateComponentsFromString = (dateString) => {
    return {
        day: parseInt(dateString.substring(0, 2)),
        month: parseInt(dateString.substring(3, 5)) - 1,
        year: parseInt(dateString.substring(6)),
    };
};

/**
 * Adds a 0 in front of positive numbers less than 10.
 * @param {number} num The number that needs to be formatted (expected to be 
 * positive)
 * @returns A formatted string of the given number.
 */
const formatNumber = (num) => {
    return num < 10 && num > 0 ? `0${num}` : `${num}`;
};

export {
    formatDate,
    parseDate,
    displayDueDate,
    checkIfTaskIsOverdue,
};