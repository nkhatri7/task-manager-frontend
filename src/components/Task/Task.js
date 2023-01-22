import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Task.scss';

import EditTask from '../EditTask/EditTask';
import DeleteTaskModal from '../DeleteTaskModal/DeleteTaskModal';
import { ReactComponent as EditIcon } from '../../assets/pencil.svg';
import { ReactComponent as DeleteIcon } from '../../assets/bin.svg';
import { ReactComponent as CalendarIcon } from '../../assets/calendar.svg';

import { displayDueDate, checkIfTaskIsOverdue } from '../../utils/date.utils';

const Task = ({ task, updateUser }) => {
    const [editMode, setEditMode] = useState(false);
    const [deleteTaskModalOpen, setDeleteTaskModalOpen] = useState(false);

    const completedCheckbox = useRef(null);
    const calendarIcon = useRef(null);
    const dueDateText = useRef(null);

    useEffect(() => {
        if (completedCheckbox && task.completed) {
            completedCheckbox.current.checked = true;
        }
    }, [completedCheckbox, task.completed]);

    useEffect(() => {
        if (calendarIcon && dueDateText && task.dueDate !== '') {
            // Check if the task is overdue and show the due date in red
            // if it is overdue
            const isOverdue = checkIfTaskIsOverdue(task.dueDate);
            if (isOverdue && !task.completed) {
                calendarIcon.current.classList.add('task-calendar-late');
                dueDateText.current.classList.add('task-due-date-late');
            } else {
                calendarIcon.current.classList.remove('task-calendar-late');
                dueDateText.current.classList.remove('task-due-date-late');
            }
        }
    }, [calendarIcon, dueDateText, task.dueDate, task.completed]);

    /**
     * Updates the completed property of the task.
     * @param {Event} e The event of the user ticking or unticking the completed
     * checkbox
     */
    const handleCompletedChange = (e) => {
        const data = {
            completed: e.target.checked,
        };
        axios.patch(`http://localhost:8080/api/v1/tasks/${task._id}`, data)
            .then(res => updateUser(task.userId))
            .catch(err => console.log(err));
    };

    /**
     * Opens the delete confirmation modal for the task.
     */
    const openConfirmDeleteTaskModal = () => {
        setDeleteTaskModalOpen(true);
    };

    /**
     * Closes of delete confirmation modal for the task.
     */
    const closeConfirmDeleteTaskModal = () => {
        setDeleteTaskModalOpen(false);
    };

    /**
     * Prevents the task modal from being opened when the user clicks on the 
     * checkbox.
     * @param {Event} e The event that called this function
     */
    const preventTaskModalDisplay = (e) => {
        e.stopPropagation();
    };

    /**
     * Displays task in editor mode.
     */
    const displayEditMode = () => {
        setEditMode(true);
    };

    /**
     * Hides editor mode.
     */
    const closeEditMode = () => {
        setEditMode(false);
    };

    return (
        <div className="task-container">
            {editMode ? <EditTask task={task} handleClose={closeEditMode} updateUser={updateUser} /> :
                <div className="task" data-task-id={task._id}>
                    <div className="task-row task-row-top">
                        <section className="task-section">
                            <div className="checkbox-container" onClick={preventTaskModalDisplay}>
                                <input 
                                    type="checkbox" 
                                    name={`task-completed-checkbox-${task._id}`}
                                    id={`task-completed-checkbox-${task._id}`}
                                    onChange={handleCompletedChange} 
                                    ref={completedCheckbox} 
                                />
                                <label htmlFor={`task-completed-checkbox-${task._id}`}></label>
                            </div>
                            <p className="task-text">{task.text}</p>
                        </section>
                        <section className="task-section">
                            {task.completed ? null : 
                                <button className="task-btn task-edit-btn" aria-label='Edit Task' 
                                        onClick={displayEditMode}>
                                    <span className="hidden">Edit</span>
                                    <EditIcon />
                                </button>
                            }
                            <button className="task-btn task-delete-btn" aria-label='Delete Task' 
                                    onClick={openConfirmDeleteTaskModal}>
                                <span className="hidden">Delete</span>
                                <DeleteIcon />
                            </button>
                        </section>
                    </div>
                    {task.dueDate === '' ? null :
                        <div className="task-row task-row-bottom">
                            <CalendarIcon ref={calendarIcon} />
                            <div className="task-due-date" ref={dueDateText}>{displayDueDate(task.dueDate)}</div>
                        </div>    
                    }
                </div>
            }
            {deleteTaskModalOpen ? 
                <DeleteTaskModal task={task} closeModal={closeConfirmDeleteTaskModal} updateUser={updateUser} /> 
                : null
            }
        </div>
    );
};

export default Task;