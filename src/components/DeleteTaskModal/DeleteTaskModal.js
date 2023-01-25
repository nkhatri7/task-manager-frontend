import React from 'react';
import axios from 'axios';
import './DeleteTaskModal.scss';

const DeleteTaskModal = ({ task, closeModal, updateUser, closeSrc }) => {
    /**
     * Deletes the task.
     */
    const deleteTask = () => {
        axios.delete(`http://localhost:8080/api/v1/tasks/${task._id}`)
            .then(res => handleTaskDeletionSuccess())
            .catch(err => console.log(err));
    };

    /**
     * Closes the confirmation modal and updates the active user state in the
     * application.
     */
    const handleTaskDeletionSuccess = () => {
        closeModal();
        updateUser(task.userId);
        if (closeSrc) {
            closeSrc();
        }
    };

    return (
        <div className="modal-container">
            <article className="modal delete-task-modal">
                <p className="delete-task-confirmation-text">Are you sure you want to delete this task?</p>
                <div className="delete-task-confirmation-btns-container">
                    <button className="delete-task-confirmation-btn delete-task-cancel-btn" onClick={closeModal}>
                        Cancel
                    </button>
                    <button className="delete-task-confirmation-btn delete-task-confirm-btn" onClick={deleteTask}>
                        Delete
                    </button>
                </div>
            </article>
        </div>
    );
};

export default DeleteTaskModal;