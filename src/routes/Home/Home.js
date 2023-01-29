import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { checkIfTaskIsOverdue } from '../../utils/date.utils';
import { API_BASE_URL } from '../../utils/api.utils';
import Menu from '../../components/Menu/Menu';
import NewTask from '../../components/NewTask/NewTask';
import Task from '../../components/Task/Task';
import TaskModal from '../../components/TaskModal/TaskModal';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';
import './Home.scss';

const UNCOMPLETED = 'Uncompleted';
const COMPLETED = 'Completed';
const NO_FILTER = 'No Filter';

const Home = ({ user, signOutUser, updateUser }) => {
    const [tasks, setTasks] = useState([]);
    const [tasksFilter, setTasksFilter] = useState(UNCOMPLETED);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isTaskModalOpen, setTaskModalOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            getUserTasks(user._id);
        } else {
            // Redirect user to auth page if they are not signed in
            navigate('/auth');
        }
    }, [user, navigate]);

    useEffect(() => {
        // Update data for selected task if modal is open
        if (selectedTask) {
            const task = tasks.find(task => task._id === selectedTask._id);
            if (task) {
                setSelectedTask(task);
            }
        }
    }, [tasks, selectedTask]);

    /**
     * Uses the taskr API to fetch the active user's tasks and updates the tasks
     * state.
     * @param {string} userId The active user's ID
     */
    const getUserTasks = (userId) => {
        axios.get(`${API_BASE_URL}/api/v1/tasks/user/${userId}`)
            .then(res => setTasks(res.data))
            .catch(err => console.log(err));
    };

    /**
     * Updates the tasks filter based on the user's filter selection.
     * @param {Event} e The event that triggered this function (the filter 
     * option click)
     */
    const handleTasksFilterChange = (e) => {
        const filter = e.target.dataset.filter;
        setTasksFilter(filter);
        updateTasksFiltersStyling(filter);
    };

    /**
     * Updates the styling on the tasks filter options to show the active 
     * filter.
     * @param {string} selectedFilter The tasks filter that has been selected by
     * the user
     */
    const updateTasksFiltersStyling = (selectedFilter) => {
        const filters = document.querySelectorAll('.tasks-filter');
        filters.forEach(filter => {
            if (filter.dataset.filter === selectedFilter) {
                filter.classList.add('active-tasks-filter');
            } else {
                filter.classList.remove('active-tasks-filter');
            }
        });
    };

    /**
     * Creates a welcome message for the user based on the current time of the 
     * day.
     * @returns {string} A welcome message to the user based on the current time
     * of the day.
     */
    const getWelcomeMessage = () => {
        const date = new Date();
        const greeting = getGreeting(date);
        return `${greeting}, ${user.name}`;
    };

    /**
     * Gets the appropriate greeting based on the time of day from the given 
     * date object.
     * @param {Date} date The date used to generate the greeting message
     * @returns {string} The appropriate greeting based on the current time of 
     * day.
     */
    const getGreeting = (date) => {
        const hour = date.getHours();
        if (hour >= 18 || hour < 4) {
            return 'Good Evening';
        } else if (hour >= 11) {
            return 'Good Afternoon';
        } else {
            return 'Good Morning';
        }
    };

    /**
     * Opens the selected task in detailed view.
     * @param {object} task The task the user wants to view
     */
    const openTaskModal = (task) => {
        setSelectedTask(task);
        setTaskModalOpen(true);
    };

    /**
     * Closes the detailed view of the selected task.
     */
    const closeTaskModal = () => {
        setTaskModalOpen(false);
        setSelectedTask(null);
    };

    /**
     * Extracts a selected group of tasks based on the current tasks filter.
     * @returns {object[]} An array of objects with task data.
     */
    const getFilteredTasks = () => {
        if (tasksFilter === UNCOMPLETED) {
            const uncompletedTasks = tasks.filter(task => !task.completed);
            const orderedTasks = orderUncompletedTasks(uncompletedTasks);
            return orderedTasks;
        } else if (tasksFilter === COMPLETED) {
            return tasks.filter(task => task.completed);
        } else {
            return tasks.reverse();
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
        <div className="homepage">
            <header>
                <section className="header-section">
                    <Link to='/' className='taskr-logo-container'>
                        <h1 className="taskr-logo">Taskr</h1>
                    </Link>
                </section>
                <section className="header-section">
                    <ThemeToggle />
                    <Menu user={user} signOutUser={signOutUser} />
                </section>
            </header>
            <main>
                <h2 className="welcome-message">{user ? getWelcomeMessage() : ''}</h2>
                <p className="tasks-message">Here's what you have going on:</p>
                <div className="tasks-filters-container">
                    <div className="tasks-filter" data-filter={NO_FILTER} onClick={handleTasksFilterChange}>All</div>
                    <div className="tasks-filter active-tasks-filter" data-filter={UNCOMPLETED} 
                        onClick={handleTasksFilterChange}>Uncompleted</div>
                    <div className="tasks-filter" data-filter={COMPLETED} onClick={handleTasksFilterChange}>
                        Completed
                    </div>
                </div>
                {tasksFilter === COMPLETED ? null : <NewTask updateUser={updateUser} />}
                <div className="tasks-container">
                    {getFilteredTasks().length > 0 ? taskItems : <p className='no-tasks-msg'>No tasks</p>}
                </div>
                {isTaskModalOpen ? 
                    <TaskModal task={selectedTask} handleClose={closeTaskModal} updateUser={updateUser} /> 
                    : null
                }
            </main>
        </div>
    );
};

export default Home;