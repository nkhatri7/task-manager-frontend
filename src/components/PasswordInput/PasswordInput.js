import React, { useState, useEffect, useRef } from 'react';

import { ReactComponent as EyeOpenIcon } from '../../assets/eye-open.svg';
import { ReactComponent as EyeClosedIcon } from '../../assets/eye-closed.svg';

const PasswordInput = ({ value, onChange, inputRef, labelRef }) => {
    const [isPasswordVisibile, setPasswordVisible] = useState(false);

    const passwordVisibilityToggle = useRef(null);

    useEffect(() => {
        if (value.trim() === '') {
            passwordVisibilityToggle.current.classList.add('password-visibility-toggle-hidden');
            setPasswordVisible(false);
        } else {
            passwordVisibilityToggle.current.classList.remove('password-visibility-toggle-hidden');
        }
    }, [value]);

    useEffect(() => {
        if (isPasswordVisibile) {
            inputRef.current.type = 'text';
        } else {
            inputRef.current.type = 'password';
        }
    }, [isPasswordVisibile, inputRef]);

    /**
     * Toggles the password visibility
     */
    const handlePasswordVisibilityToggle = () => {
        setPasswordVisible(prev => !prev);
    };

    return (
        <div className="auth-input-container">
            <input type="password" name="password" id="password" placeholder='Password' value={value} 
                onChange={onChange} className='auth-input password-input' ref={inputRef} />
            <label htmlFor="password" data-input-filled="false" className='auth-input-label' ref={labelRef}>
                Password
            </label>
            <div className="password-visibility-toggle password-visibility-toggle-hidden" ref={passwordVisibilityToggle} 
                onClick={handlePasswordVisibilityToggle}>
                {isPasswordVisibile ? <EyeOpenIcon /> : <EyeClosedIcon />}
            </div>
        </div>
    );
};

export default PasswordInput;