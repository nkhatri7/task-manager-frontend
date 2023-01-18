import React from 'react';

const AuthInput = ({ type, inputId, value, onChange, label, inputRef, labelRef }) => {
    return (
        <div className="auth-input-container">
            <input type={type} name={inputId} id={inputId} placeholder={label} value={value} onChange={onChange}
                className="auth-input" ref={inputRef} />
            <label htmlFor={inputId} data-input-filled="false" className='auth-input-label' ref={labelRef}>
                {label}
            </label>
        </div>
    );
};

export default AuthInput;