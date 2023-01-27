/**
 * Updates an input's label styling based on whether it is empty or not.
 * @param {React.MutableRefObject<HTMLElement>} labelRef 
 * The ref variable linked to the input's label
 * @param {boolean} isInputEmpty Whether or not the input field is empty
 */
const updateLabelStyling = (labelRef, isInputEmpty) => {
    labelRef.current.setAttribute(
        'data-input-filled', 
        isInputEmpty ? 'false' : 'true'
    );
};
/**
 * Displays the error message and updates the styling for the given input field
 * when there is an error.
 * @param {string} errorMsg The error message to be displayed
 * @param {React.MutableRefObject<HTMLInputElement>} inputRef 
 * The ref variable linked to the input element
 * @param {React.MutableRefObject<HTMLElement>} errorMsgRef 
 * The ref variable linked to the error message element
 */
const displayError = (errorMsg, inputRef, errorMsgRef) => {
    inputRef.current.classList.add('input-error');
    errorMsgRef.current.innerText = errorMsg;
    errorMsgRef.current.classList.add('input-error-msg-show');
};

/**
 * Hides the error message and updates the styling for the given input field
 * when there is no error.
 * @param {React.MutableRefObject<HTMLInputElement>} inputRef 
 * The ref variable linked to the input element
 * @param {React.MutableRefObject<HTMLElement>} errorMsgRef 
 * The ref variable linked to the error message element
 */
const removeError = (inputRef, errorMsgRef) => {
    inputRef.current.classList.remove('input-error');
    errorMsgRef.current.innerText = '';
    errorMsgRef.current.classList.remove('input-error-msg-show');
};

export {
    updateLabelStyling,
    displayError,
    removeError,
};