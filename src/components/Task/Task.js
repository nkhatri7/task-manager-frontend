import React, { useState, useEffect, useRef } from 'react';
import './Task.scss';

import EditTask from '../EditTask/EditTask';
import { ReactComponent as EditIcon } from '../../assets/pencil.svg';
import { ReactComponent as DeleteIcon } from '../../assets/bin.svg';
import { ReactComponent as CalendarIcon } from '../../assets/calendar.svg';

import { displayDueDate, checkIfTaskIsOverdue } from '../../utils/date.utils';

const Task = ({ task, updateUser }) => {
    const [editMode, setEditMode] = useState(false);

    const calendarIcon = useRef(null);
    const dueDateText = useRef(null);

    useEffect(() => {
        if (calendarIcon && dueDateText && task.dueDate !== '') {
            const isOverdue = checkIfTaskIsOverdue(task.dueDate);
            if (isOverdue) {
                calendarIcon.current.classList.add('task-calendar-late');
                dueDateText.current.classList.add('task-due-date-late');
            } else {
                calendarIcon.current.classList.remove('task-calendar-late');
                dueDateText.current.classList.remove('task-due-date-late');
            }
        }
    }, [calendarIcon, dueDateText, task.dueDate]);

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
                                <input type="checkbox" name="task-completed-checkbox" id="task-completed-checkbox" />
                                <label htmlFor="task-completed-checkbox"></label>
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
                            <button className="task-btn task-delete-btn" aria-label='Delete Task'>
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
        </div>
    );
};

export default Task;