import React from 'react';
import './Task.scss';

const Task = ({ task }) => {
    return (
        <div className="task">
            <div className="checkbox-container">
                <input type="checkbox" name="task-completed-checkbox" id="task-completed-checkbox" />
                <label htmlFor="task-completed-checkbox"></label>
            </div>
            <p className="task-text">{task.text}</p>
        </div>
    );
};

export default Task;