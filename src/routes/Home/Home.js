import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import useDetectTheme from '../../hooks/useDetectTheme';
import { ReactComponent as ProfileIcon } from '../../assets/user.svg';
import { ReactComponent as PasswordIcon } from '../../assets/lock.svg';
import { ReactComponent as SignOutIcon } from '../../assets/sign-out.svg';
import './Home.scss';
import Task from '../../components/Task/Task';

const UNCOMPLETED = 'Uncompleted';
const COMPLETED = 'Completed';
const NO_FILTER = 'No Filter';

const Home = ({ user }) => {
    const [tasks, setTasks] = useState([]);
    const [tasksFilter, setTasksFilter] = useState(UNCOMPLETED);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    useDetectTheme();

    useEffect(() => {
        if (user) {
            getUserTasks(user._id);
        } else {
            // Redirect user to auth page if they are not signed in
            navigate('/auth');
        }
    }, [user, navigate]);

    /**
     * Uses the taskr API to fetch the active user's tasks and updates the tasks state.
     * @param {string} userId The active user's ID
     */
    const getUserTasks = (userId) => {
        axios.get(`http://localhost:8080/api/v1/tasks/user/${userId}`)
            .then(res => setTasks(res.data))
            .catch(err => console.log(err));
    };

    /**
     * Updates the tasks filter based on the user's filter selection.
     * @param {Event} e The event that triggered this function (the filter option click)
     */
    const handleTasksFilterChange = (e) => {
        const filter = e.target.dataset.filter;
        setTasksFilter(filter);
        updateTasksFiltersStyling(filter);
    };

    /**
     * Updates the styling on the tasks filter options to show the active filter.
     * @param {String} selectedFilter The tasks filter that has been selected by the user
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
     * Extracts the first character from the user's name.
     * @returns {String} The first character from the user's name.
     */
    const getOptionsButtonText = () => {
        const name = user.name;
        return name.charAt(0);
    };

    /**
     * Toggles the open state of the menu.
     */
    const toggleMenuOpen = () => {
        setMenuOpen(prev => !prev);
    };

    /**
     * Creates a welcome message for the user based on the current time of the day.
     * @returns {String} A welcome message to the user based on the current time of the day.
     */
    const getWelcomeMessage = () => {
        const date = new Date();
        const greeting = getGreeting(date);
        return `${greeting}, ${user.name}`;
    };

    /**
     * Gets the appropriate greeting based on the time of day from the given date object.
     * @param {Date} date The date used to generate the greeting message
     * @returns {String} The appropriate greeting based on the current time of day.
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

    const filteredTasks = tasks.filter(task => {
        if (tasksFilter === UNCOMPLETED) {
            return task.completed === false;
        } else if (tasksFilter === COMPLETED) {
            return task.completed === true;
        } else {
            return true;
        }
    });

    const taskItems = filteredTasks.map(task => (
        <Task key={task._id} task={task} />
    ));

    return (
        <div className="homepage">
            <header>
                <Link to='/' className='taskr-logo-container'>
                    <h1 className="taskr-logo">Taskr</h1>
                </Link>
                <div className="menu-container">
                    <button className="menu-btn" onClick={toggleMenuOpen}>{user ? getOptionsButtonText() : ''}</button>
                    {isMenuOpen ? 
                        <ul className="menu">
                            <li className="menu-item">
                                <Link to='/profile' className='menu-link'>
                                    <ProfileIcon />
                                    <p className="menu-item-text">View Profile</p>
                                </Link>
                            </li>
                            <li className="menu-item">
                                <Link to='/change-password' className='menu-link'>
                                    <PasswordIcon />
                                    <p className="menu-item-text">Change Password</p>
                                </Link>
                            </li>
                            <li className="menu-item">
                                <SignOutIcon />
                                <p className="menu-item-text menu-item-text-red">Sign Out</p>
                            </li>
                        </ul>
                        : null
                    }
                </div>
            </header>
            <main>
                <h2 className="welcome-message">{user ? getWelcomeMessage() : ''}</h2>
                <p className="tasks-message">Here's what you have going on:</p>
                <div className="tasks-filters-container">
                    <div 
                        className="tasks-filter" 
                        data-filter={NO_FILTER} 
                        onClick={handleTasksFilterChange}
                    >All</div>
                    <div 
                        className="tasks-filter active-tasks-filter" 
                        data-filter={UNCOMPLETED}
                        onClick={handleTasksFilterChange}
                    >Uncompleted</div>
                    <div 
                        className="tasks-filter" 
                        data-filter={COMPLETED}
                        onClick={handleTasksFilterChange}
                    >Completed</div>
                </div>
                <div className="tasks-container">
                    {filteredTasks.length > 0 ? taskItems : 
                        <p className='no-tasks-msg'>No tasks</p>}
                </div>
            </main>
        </div>
    );
};

export default Home;