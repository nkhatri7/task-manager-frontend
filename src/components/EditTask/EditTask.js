import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { formatDate, parseDate } from '../../utils/date.utils';
import { API_BASE_URL } from '../../utils/api.utils';
import { getRequestHeader } from '../../utils/auth.utils';
import useAutosizeTextArea from '../../hooks/useAutosizeTextArea';
import useInputAutoFocus from '../../hooks/useInputAutoFocus';
import TaskDatePicker from '../TaskDatePicker/TaskDatePicker';
import './EditTask.scss';

const EditTask = ({ task, handleClose, updateUser }) => {
    const [text, setText] = useState(task ? task.text : '');
    const [date, setDate] = useState(
        task ? (task.dueDate !== '' ? parseDate(task.dueDate) : null) : null
    );
    const [isTextEmpty, setTextEmpty] = useState(true);

    const taskTextInput = useRef(null);

    useAutosizeTextArea(taskTextInput, text);
    useInputAutoFocus(taskTextInput);

    useEffect(() => {
        setTextEmpty(text.trim().length === 0);
    }, [text]);

    /**
     * Updates the task text.
     * @param {Event} e The event of the user changing the text
     */
    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    /**
     * Updates the date value.
     * @param {Date} date The date the user selected or entered
     */
    const handleDateChange = (date) => {
        setDate(date);
    };

    /**
     * Determines whether a new task is being created or an existing task is
     * being edited.
     */
    const handleSave = () => {
        // If the component has been passed a task object, it means a task is
        // being edited and so we need to save the edit
        // Otherwise, if the task provided is null, then a new task is being
        // created
        if (task) {
            saveEdit();
        } else {
            createTask();
        }
    };

    /**
     * Saves the changes to the task.
     */
    const saveEdit = () => {
        const data = getTaskData();
        const url = `${API_BASE_URL}/api/v1/tasks/${task._id}`;
        axios.patch(url, data, getRequestHeader())
            .then(res => handleTaskRequestSuccess())
            .catch(err => console.log(err));
    };

    /**
     * Creates a new task.
     */
    const createTask = () => {
        const data = getTaskData();
        axios.post(`${API_BASE_URL}/api/v1/tasks/`, data, getRequestHeader())
            .then(res => handleTaskRequestSuccess())
            .catch(err => console.log(err));
    };

    /**
     * Goes back to the default home page view and updates the user state in the
     * application.
     */
    const handleTaskRequestSuccess = () => {
        handleClose();
        updateUser();
    };

    /**
     * Creates an object with the text and formatted due date for the task.
     * @returns {object} An object with the text and formatted due date.
     */
    const getTaskData = () => {
        const dueDate = date ? formatDate(date) : '';
        const data = {
            text: text.trim(),
            dueDate: dueDate,
        };
        return data;
    };

    return (
        <div className="edit-task">
            <section className="edit-task-data-container">
                <textarea name="edit-task-text" id="edit-task-text" className="edit-task-text-input" rows={1}
                    value={text} onChange={handleTextChange} placeholder="Task name" ref={taskTextInput} />
                <TaskDatePicker date={date} updateDate={handleDateChange} />
            </section>
            <section className="edit-task-action-btns">
                <button className="edit-task-action-btn edit-task-cancel-btn" onClick={handleClose}>Cancel</button>
                <button className="edit-task-action-btn edit-task-save-btn" disabled={isTextEmpty}
                        onClick={handleSave}>
                    Save
                </button>
            </section>
        </div>
    );
};

export default EditTask;