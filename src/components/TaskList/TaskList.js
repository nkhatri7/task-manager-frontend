import React from 'react';
import { checkIfTaskIsOverdue } from '../../utils/date.utils';
import Task from '../../components/Task/Task';
import './TaskList.scss';

const UNCOMPLETED = 'Uncompleted';
const COMPLETED = 'Completed';

const TaskList = ({ tasks, activeFilter, updateUser, openTaskModal }) => {
    /**
     * Extracts a selected group of tasks based on the current tasks filter.
     * @returns {object[]} An array of objects with task data.
     */
    const getFilteredTasks = () => {
        if (activeFilter === UNCOMPLETED) {
            const uncompletedTasks = tasks.filter(task => !task.completed);
            const orderedTasks = orderUncompletedTasks(uncompletedTasks);
            return orderedTasks;
        } else if (activeFilter === COMPLETED) {
            return tasks.filter(task => task.completed);
        } else {
            // Show uncompleted tasks before completed tasks
            const uncompletedTasks = tasks.filter(task => !task.completed);
            const completedTasks = tasks.filter(task => task.completed);
            return completedTasks.concat(uncompletedTasks);
        }
    };

    /**
     * Orders the given uncompleted tasks so that the overdue tasks are
     * displayed before the remaining tasks.
     * @param {object[]} tasks An array of tasks that are uncompleted
     * @returns {object[]} An array of tasks with the overdue tasks being
     * displayed first.
     */
    const orderUncompletedTasks = (tasks) => {
        const overdueTasks = [];
        const remainingTasks = [];
        tasks.forEach(task => {
            // If task is overdue, add it to overdueTasks array, otherwise add
            // to remainingTasks array
            if (task.dueDate !== '') {
                const isOverdue = checkIfTaskIsOverdue(task.dueDate);
                if (isOverdue) {
                    overdueTasks.push(task);
                } else {
                    remainingTasks.push(task);
                }
            } else {
                remainingTasks.push(task);
            }
        });

        // Put remaining tasks first because the array gets reversed in the
        // taskItems variable
        return remainingTasks.concat(overdueTasks);
    };

    const taskItems = getFilteredTasks().reverse().map(task => (
        <Task 
            key={task._id} 
            task={task} 
            updateUser={updateUser} 
            openTaskModal={openTaskModal} 
        />
    ));

    return (
        <div className="tasks-container">
            {getFilteredTasks().length > 0 ? taskItems : <p className='no-tasks-msg'>No tasks</p>}
        </div>
    );
};

export default TaskList;