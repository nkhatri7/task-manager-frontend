import { useEffect } from "react";

/**
 * Places automatic focus at the end of the given input field when the input
 * field is rendered.
 * @param {React.MutableRefObject<HTMLInputElement|HTMLTextAreaElement>} inputRef
 * Reference object of the input field
 */
const useInputAutoFocus = (inputRef) => {
    useEffect(() => {
        if (inputRef) {
            // Get the length of the text in the input field and put the cursor
            // at the end of the pre-existing text (if any)
            const length = inputRef.current.value.length;
            inputRef.current.setSelectionRange(length, length);
            inputRef.current.focus();
        }
    }, [inputRef]);
};

export default useInputAutoFocus;