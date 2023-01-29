import React, { useState, useEffect, useRef } from 'react';
import './Task.scss';

import TaskCheckbox from '../TaskCheckbox/TaskCheckbox';
import EditTask from '../EditTask/EditTask';
import DeleteTaskModal from '../DeleteTaskModal/DeleteTaskModal';
import { ReactComponent as EditIcon } from '../../assets/pencil.svg';
import { ReactComponent as DeleteIcon } from '../../assets/bin.svg';
import { ReactComponent as CalendarIcon } from '../../assets/calendar.svg';

import { displayDueDate, checkIfTaskIsOverdue } from '../../utils/date.utils';

const Task = ({ task, updateUser, openTaskModal }) => {
    const [editMode, setEditMode] = useState(false);
    const [deleteTaskModalOpen, setDeleteTaskModalOpen] = useState(false);

    const calendarIcon = useRef(null);
    const dueDateText = useRef(null);

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

    useEffect(() => {
        // Check if the task is completed and make the calendar icon grey if the
        // task is completed
        if (calendarIcon && task.completed && task.dueDate !== '') {
            calendarIcon.current.classList.add('task-calendar-icon-completed');
        }
    }, [task.completed, task.dueDate, calendarIcon]);

    /**
     * Prevents the task modal from being opened when the user clicks on the 
     * checkbox.
     * @param {Event} e The event that called this function
     */
    const preventTaskModalDisplay = (e) => {
        e.stopPropagation();
    };

    /**
     * Opens the delete confirmation modal for the task.
     * @param {Event} e The event that called this function
     */
    const openConfirmDeleteTaskModal = (e) => {
        preventTaskModalDisplay(e);
        setDeleteTaskModalOpen(true);
    };

    /**
     * Closes of delete confirmation modal for the task.
     */
    const closeConfirmDeleteTaskModal = () => {
        setDeleteTaskModalOpen(false);
    };

    /**
     * Displays task in editor mode.
     * @param {Event} e The event that called this function
     */
    const displayEditMode = (e) => {
        preventTaskModalDisplay(e);
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
                <div className="task" onClick={() => openTaskModal(task)}>
                    <div className="task-row task-row-top">
                        <section className="task-section">
                            <TaskCheckbox task={task} updateUser={updateUser} />
                            <p className={`task-text${task.completed ? ' task-text-completed' : ''}`}>{task.text}</p>
                        </section>
                        <section className="task-section task-action-btns">
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
                            <div className={`task-due-date ${task.completed ? 'task-due-date-completed' : ''}`} 
                                    ref={dueDateText}>
                                {displayDueDate(task.dueDate)}
                            </div>
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