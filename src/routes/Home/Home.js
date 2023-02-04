import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/api.utils';
import { getRequestHeader } from '../../utils/auth.utils';
import Menu from '../../components/Menu/Menu';
import NewTask from '../../components/NewTask/NewTask';
import TaskList from '../../components/TaskList/TaskList';
import TaskModal from '../../components/TaskModal/TaskModal';
import TasksFilter from '../../components/TasksFilter/TasksFilter';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';
import WelcomeMessage from '../../components/WelcomeMessage/WelcomeMessage';
import './Home.scss';

const UNCOMPLETED = 'Uncompleted';
const COMPLETED = 'Completed';

const Home = ({ user, updateUser }) => {
    const [tasks, setTasks] = useState([]);
    const [tasksFilter, setTasksFilter] = useState(UNCOMPLETED);
    const [selectedTask, setSelectedTask] = useState(null);
    const [showTaskModal, setShowTaskModal] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            getUserTasks();
        } else {
            // Redirect user to login page if they are not signed in
            navigate('/login');
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
     */
    const getUserTasks = () => {
        axios.get(`${API_BASE_URL}/api/v1/tasks/user/`, getRequestHeader())
            .then(res => setTasks(res.data))
            .catch(err => console.log(err));
    };

    /**
     * Updates the tasks filter based on the user's filter selection.
     * @param {Event} e 
     * The event that triggered this function (the filter option click)
     */
    const handleTasksFilterChange = (e) => {
        setTasksFilter(e.target.dataset.filter);
    };

    /**
     * Opens the selected task in detailed view.
     * @param {object} task The task the user wants to view
     */
    const openTaskModal = (task) => {
        setSelectedTask(task);
        setShowTaskModal(true);
    };

    /**
     * Closes the detailed view of the selected task.
     */
    const closeTaskModal = () => {
        setShowTaskModal(false);
        setSelectedTask(null);
    };

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
                    <Menu user={user} updateUser={updateUser} />
                </section>
            </header>
            <main>
                {user && <WelcomeMessage name={user.name} />}
                <p className="tasks-message">Here's what you have going on:</p>
                <TasksFilter activeFilter={tasksFilter} onClick={handleTasksFilterChange} />
                {tasksFilter !== COMPLETED && <NewTask updateUser={updateUser} />}
                <TaskList 
                    tasks={tasks} 
                    activeFilter={tasksFilter} 
                    updateUser={updateUser} 
                    openTaskModal={openTaskModal} 
                />
                {showTaskModal && <TaskModal task={selectedTask} handleClose={closeTaskModal} updateUser={updateUser}/>}
            </main>
        </div>
    );
};

export default Home;