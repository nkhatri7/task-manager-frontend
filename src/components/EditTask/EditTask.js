import React, { useState, useEffect, useRef } from 'react';
import useAutosizeTextArea from '../../hooks/useAutosizeTextArea';
import './EditTask.scss';

const EditTask = ({ task, handleClose }) => {
    const [text, setText] = useState(task ? task.text : '');
    const [isTextEmpty, setTextEmpty] = useState(true);

    const taskTextInput = useRef(null);

    useAutosizeTextArea(taskTextInput, text);

    // Set focus on textarea initially
    useEffect(() => {
        if (taskTextInput) {
            // Get the length of the text in the textarea and put the cursor at the end of the pre-existing text
            // (if any)
            const length = taskTextInput.current.value.length;
            taskTextInput.current.setSelectionRange(length, length);
            taskTextInput.current.focus();
        }
    }, [taskTextInput]);

    useEffect(() => {
        setTextEmpty(text.trim().length === 0);
    }, [text]);

    /**
     * Updates the task text.
     * @param {Event} e The event that triggers this function
     */
    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    return (
        <div className="edit-task">
            <section className="edit-task-data-container">
                <textarea name="edit-task-text" 
                    id="edit-task-text" 
                    className="edit-task-text-input"
                    rows={1}
                    value={text}
                    onChange={handleTextChange}
                    placeholder="Task name"
                    ref={taskTextInput} />
                <section className="edit-task-datetime-container">

                </section>
            </section>
            <section className="edit-task-action-btns">
                <button className="edit-task-action-btn edit-task-cancel-btn" onClick={handleClose}>Cancel</button>
                <button className="edit-task-action-btn edit-task-save-btn" disabled={isTextEmpty}>Save</button>
            </section>
        </div>
    );
};

export default EditTask;