import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './ModalEditText.scss';

import useAutosizeTextArea from '../../hooks/useAutosizeTextArea';
import useInputAutoFocus from '../../hooks/useInputAutoFocus';

const ModalEditText = ({ task, handleClose, updateUser }) => {
    const [text, setText] = useState(task.text);
    const [isTextEmpty, setTextEmpty] = useState(false);

    const textInput = useRef(null);

    useAutosizeTextArea(textInput, text);
    useInputAutoFocus(textInput);

    useEffect(() => {
        setTextEmpty(text.trim().length === 0);
    }, [text]);

    /**
     * Updates the task text state.
     * @param {Event} e The event of the user changing the text
     */
    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    /**
     * Saves the text changes to the task.
     */
    const saveEdit = () => {
        const data = {
            text: text.trim(),
        };
        axios.patch(`http://localhost:8080/api/v1/tasks/${task._id}`, data)
            .then(res => handleSaveSuccess())
            .catch(err => console.log(err));
    };

    /**
     * Goes back to the default task view and updates the user state in the
     * application.
     */
    const handleSaveSuccess = () => {
        handleClose();
        updateUser(task.userId);
    };

    return (
        <div className="modal-edit-container">
            <textarea 
                name="modal-edit-text" 
                id="modal-edit-text" 
                className='modal-text-input'
                rows={1} 
                value={text} 
                onChange={handleTextChange} 
                placeholder="Task name"
                ref={textInput}
            />
            <div className="action-btns-container">
                <button className="modal-edit-btn modal-edit-cancel-btn" onClick={handleClose}>Cancel</button>
                <button className="modal-edit-btn modal-edit-save-btn" onClick={saveEdit} disabled={isTextEmpty}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default ModalEditText;