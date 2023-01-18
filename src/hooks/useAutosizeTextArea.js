import { useEffect } from 'react';

/**
 * Updates the height of a `<textarea>` when the text changes. Adapted from 
 * https://medium.com/@oherterich/creating-a-textarea-with-dynamic-height-using-react-and-typescript-5ed2d78d9848
 * @param {React.MutableRefObject<HTMLTextAreaElement>} textAreaRef Reference object of the `<textarea>`
 * @param {string} text Text inside the `<textarea>`
 */
const useAutosizeTextArea = (textAreaRef, text) => {
    useEffect(() => {
        if (textAreaRef) {
            // Reset the height momentarily to get the correct scrollHeight for the textarea
            textAreaRef.current.style.height = '0px';
            const scrollHeight = textAreaRef.current.scrollHeight;

            // Set the height directly, outside of the render loop
            // Trying to set this with state or a ref will product an incorrect value
            textAreaRef.current.style.height = scrollHeight + 'px';
        }
    }, [textAreaRef, text]);
};

export default useAutosizeTextArea;