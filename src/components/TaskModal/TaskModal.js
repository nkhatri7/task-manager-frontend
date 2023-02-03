import React, { useState } from 'react';
import axios from 'axios';
import { formatDate, parseDate, displayDueDate } from '../../utils/date.utils';
import { API_BASE_URL } from '../../utils/api.utils';
import { getRequestHeader } from '../../utils/auth.utils';
import TaskCheckbox from '../TaskCheckbox/TaskCheckbox';
import TaskDatePicker from '../TaskDatePicker/TaskDatePicker';
import DeleteTaskModal from '../DeleteTaskModal/DeleteTaskModal';
import ModalEditText from '../ModalEditText/ModalEditText';
import { ReactComponent as CloseIcon } from '../../assets/x-mark.svg';
import './TaskModal.scss';

const TaskModal = ({ task, handleClose, updateUser }) => {
    const [date, setDate] = useState(
        task ? (task.dueDate !== '' ? parseDate(task.dueDate) : null) : null
    );
    const [editMode, setEditMode] = useState(false);
    const [deleteTaskModalOpen, setDeleteTaskModalOpen] = useState(false);

    /**
     * Updates the task's due date.
     * @param {Date} date The date the user selected or entered
     */
    const handleDateChange = (date) => {
        setDate(date);
        const data = {
            dueDate: date ? formatDate(date) : '',
        };
        const url = `${API_BASE_URL}/api/v1/tasks/${task._id}`;
        axios.patch(url, data, getRequestHeader())
            .then(res => updateUser())
            .catch(err => console.log(err));
    };

    /**
     * Displays edit mode.
     */
    const displayEditMode = () => {
        // Edit mode is not available if the task has been completed
        if (!task.completed) {
            setEditMode(true);
        }
    };

    /**
     * Closes edit mode.
     */
    const hideEditMode = () => {
        setEditMode(false);
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

    return (
        <div className="modal-container">
            <div className="modal task-modal">
                <button className="task-modal-close-btn" aria-label='Close' onClick={handleClose}>
                    <span className="hidden">Close</span>
                    <CloseIcon />
                </button>
                <div className={`task-modal-header${editMode ? ' task-modal-header-edit' : ''}`}>
                    {editMode ? null : <TaskCheckbox task={task} updateUser={updateUser} src='TaskModal' />}
                    {editMode ? 
                        <ModalEditText task={task} handleClose={hideEditMode} updateUser={updateUser} /> 
                        : 
                        <p className={`task-modal-task-text${task.completed ? ' task-modal-task-text-completed' : ''}`} 
                                onClick={displayEditMode}>
                            {task.text}
                        </p>
                    }
                </div>
                {task.completed ? 
                    <p className="task-modal-due-date">
                        {task.dueDate ? `Due date: ${displayDueDate(task.dueDate)}` : ''}
                    </p>
                    : <TaskDatePicker date={date} updateDate={handleDateChange} />
                }
                <div className="task-modal-data-container">
                    <p>Last Updated: {task.updatedAt}</p>
                    <p>Created At: {task.createdAt}</p>
                </div>
                <button className="task-modal-delete-btn" onClick={openConfirmDeleteTaskModal}>
                    Delete
                </button>
            </div>
            {deleteTaskModalOpen ? 
                <DeleteTaskModal 
                    task={task} 
                    closeModal={closeConfirmDeleteTaskModal} 
                    updateUser={updateUser} 
                    closeSrc={handleClose} 
                /> 
                : null
            }
        </div>
    );
};

export default TaskModal;