import React from 'react';
import { ReactComponent as EditIcon } from '../../assets/pencil.svg';
import { ReactComponent as DeleteIcon } from '../../assets/bin.svg';
import './Task.scss';

const Task = ({ task }) => {
    /**
     * Prevents the task modal from being opened when the user clicks on the checkbox.
     * @param {Event} e The event that called this function
     */
    const preventTaskModalDisplay = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="task" data-task-id={task._id}>
            <div className="task-section">
                <div className="checkbox-container" onClick={preventTaskModalDisplay}>
                    <input type="checkbox" name="task-completed-checkbox" id="task-completed-checkbox" />
                    <label htmlFor="task-completed-checkbox"></label>
                </div>
                <p className="task-text">{task.text}</p>
            </div>
            <div className="task-section">
                {task.completed ? null : 
                    <button className="task-btn task-edit-btn" aria-label='Edit Task'>
                        <span className="hidden">Edit</span>
                        <EditIcon />
                    </button>
                }
                <button className="task-btn task-delete-btn" aria-label='Delete Task'>
                    <span className="hidden">Delete</span>
                    <DeleteIcon />
                </button>
            </div>
        </div>
    );
};

export default Task;