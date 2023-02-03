import React, { useEffect } from 'react';
import './TasksFilter.scss';

const UNCOMPLETED = 'Uncompleted';
const COMPLETED = 'Completed';
const NO_FILTER = 'No Filter';

const TasksFilter = ({ activeFilter, onClick }) => {
    useEffect(() => {
        updateTasksFiltersStyling(activeFilter);
    }, [activeFilter]);

    /**
     * Updates the styling on the tasks filter options to show the active 
     * filter.
     * @param {string} selectedFilter 
     * The tasks filter that has been selected by the user
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

    return (
        <div className="tasks-filters-container">
            <div className="tasks-filter" data-filter={NO_FILTER} onClick={onClick}>All</div>
            <div className="tasks-filter" data-filter={UNCOMPLETED} onClick={onClick}>Uncompleted</div>
            <div className="tasks-filter" data-filter={COMPLETED} onClick={onClick}>Completed</div>
        </div>
    );
};

export default TasksFilter;