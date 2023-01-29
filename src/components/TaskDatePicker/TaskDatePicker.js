import React from 'react';
import { DatePicker } from 'react-widgets/cjs';
import 'react-widgets/scss/styles.scss';
import './TaskDatePicker.scss';

const TaskDatePicker = ({ date, updateDate }) => {
    return (
        <div className="task-datepicker-container">
            <p className="task-datepicker-prompt">Due date</p>
            <DatePicker 
                placeholder='dd/mm/yyyy' 
                value={date} 
                onChange={updateDate} 
                valueEditFormat={{ dateStyle: "short" }} 
                valueDisplayFormat={{ dateStyle: "medium" }}
                className='task-datepicker' 
            />
        </div>
    );
};

export default TaskDatePicker;