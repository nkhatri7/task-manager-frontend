import React from 'react';
import PasswordVisibilityToggle from '../PasswordVisibilityToggle/PasswordVisibilityToggle';
import './InputField.scss';

const InputField = ({ 
    type, 
    inputId, 
    value, 
    onChange, 
    label, 
    inputRef, 
    labelRef,
    errorRef,
}) => {
    return (
        <div className="input-field">
            <div className="input-container">
                <input 
                    type={type} 
                    name={inputId} 
                    id={inputId} 
                    placeholder={label} 
                    value={value} 
                    onChange={onChange}
                    className="input" 
                    ref={inputRef} 
                />
                <label htmlFor={inputId} data-input-filled="false" className='input-label' ref={labelRef}>
                    {label}
                </label>
                {/* Show password visibility toggle if the type is a password field */}
                {type === 'password' && <PasswordVisibilityToggle value={value} inputRef={inputRef} />}
            </div>
            <span className="input-error-msg" ref={errorRef}></span>
        </div>
    );
};

export default InputField;