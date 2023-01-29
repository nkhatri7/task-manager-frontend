import React, { useState } from 'react';
import EditTask from '../EditTask/EditTask';
import { ReactComponent as PlusIcon } from '../../assets/plus-sign.svg';
import './NewTask.scss';

const NewTask = ({ updateUser }) => {
    const [editMode, setEditMode] = useState(false);

    /**
     * Displays editor mode.
     */
    const displayEditorMode = () => {
        setEditMode(true);
    }

    /**
     * Hides editor mode.
     */
    const closeEditorMode = () => {
        setEditMode(false);
    };

    return (
        <article className="new-task-container">
            {editMode ? <EditTask task={null} handleClose={closeEditorMode} updateUser={updateUser} /> :
                <div className="new-task" onClick={displayEditorMode}>
                    <PlusIcon />
                    <p className="new-task-prompt">New task</p>
                </div>    
            }
        </article>
    );
};

export default NewTask;