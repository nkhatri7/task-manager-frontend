import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/api.utils';
import { getRequestHeader } from '../../utils/auth.utils';
import './TaskCheckbox.scss';

const TaskCheckbox = ({ task, updateUser, src }) => {
    const completedCheckbox = useRef(null);

    useEffect(() => {
        if (completedCheckbox && task.completed) {
            completedCheckbox.current.checked = true;
        }
    }, [completedCheckbox, task.completed]);

    /**
     * Updates the completed property of the task.
     * @param {Event} e The event of the user ticking or unticking the completed
     * checkbox
     */
    const handleCompletedChange = (e) => {
        const data = {
            completed: e.target.checked,
        };
        const url = `${API_BASE_URL}/api/v1/tasks/${task._id}`;
        axios.patch(url, data, getRequestHeader())
            .then(res => updateUser())
            .catch(err => console.log(err));
    };

    return (
        <div className="task-checkbox-container" onClick={(e) => e.stopPropagation()}>
            <input 
                type="checkbox" 
                name={`task${src === 'TaskModal' ? '-modal' : ''}-completed-checkbox-${task._id}`}
                id={`task${src === 'TaskModal' ? '-modal' : ''}-completed-checkbox-${task._id}`}
                onChange={handleCompletedChange} 
                ref={completedCheckbox} 
            />
            <label htmlFor={`task${src === 'TaskModal' ? '-modal' : ''}-completed-checkbox-${task._id}`}></label>
        </div>
    );
};

export default TaskCheckbox;