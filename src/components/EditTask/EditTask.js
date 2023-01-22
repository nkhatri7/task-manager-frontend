import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './EditTask.scss';

import { DatePicker } from 'react-widgets/cjs';
import 'react-widgets/scss/styles.scss';

import useAutosizeTextArea from '../../hooks/useAutosizeTextArea';
import { formatDate, parseDate } from '../../utils/date.utils';

const EditTask = ({ task, handleClose, updateUser }) => {
    const [text, setText] = useState(task ? task.text : '');
    const [date, setDate] = useState(
        task ? (task.dueDate !== '' ? parseDate(task.dueDate) : null) : null
    );
    const [isTextEmpty, setTextEmpty] = useState(true);

    const taskTextInput = useRef(null);

    useAutosizeTextArea(taskTextInput, text);

    // Set focus on textarea initially
    useEffect(() => {
        if (taskTextInput) {
            // Get the length of the text in the textarea and put the cursor at
            // the end of the pre-existing text
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

    /**
     * Creates a new task.
     */
    const createTask = () => {
        const data = getTaskData();
        data.userId = localStorage.getItem('taskr-user');
        axios.post('http://localhost:8080/api/v1/tasks/', data)
            .then(res => handleTaskCreationSuccess(res))
            .catch(err => console.log(err));
    };

    /**
     * Goes back to the default home page view and updates the user state in the
     * application.
     * @param {AxiosResponse<any, any>} res Response from the API
     */
    const handleTaskCreationSuccess = (res) => {
        handleClose();
        updateUser(res.data.user._id);
    };

    /**
     * Creates an object with the text and formatted due date for the task.
     * @returns {object} An object with the text and formatted due date.
     */
    const getTaskData = () => {
        const dueDate = date ? formatDate(date) : '';
        const data = {
            text: text,
            dueDate: dueDate,
        };
        return data;
    };

    return (
        <div className="edit-task">
            <section className="edit-task-data-container">
                <textarea name="edit-task-text" id="edit-task-text" className="edit-task-text-input" rows={1}
                    value={text} onChange={handleTextChange} placeholder="Task name" ref={taskTextInput} />
                <section className="edit-task-date-container">
                    <p className="edit-task-date-prompt">Due date</p>
                    <DatePicker placeholder='dd/mm/yyyy' value={date} onChange={handleDateChange}
                        valueEditFormat={{ dateStyle: "short" }} valueDisplayFormat={{ dateStyle: "medium" }}
                        className='edit-task-datepicker' />
                </section>
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