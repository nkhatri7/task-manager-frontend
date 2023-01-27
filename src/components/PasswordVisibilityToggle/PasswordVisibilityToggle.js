import React, { useState, useEffect, useRef } from 'react';
import './PasswordVisibilityToggle.scss';

import { ReactComponent as EyeOpenIcon } from '../../assets/eye-open.svg';
import { ReactComponent as EyeClosedIcon } from '../../assets/eye-closed.svg';

const PasswordVisibilityToggle = ({ value, inputRef }) => {
    const [isPasswordVisibile, setPasswordVisible] = useState(false);

    const passwordVisibilityToggle = useRef(null);

    useEffect(() => {
        const hiddenClass = 'password-visibility-toggle-hidden'
        if (value.trim() === '') {
            passwordVisibilityToggle.current.classList.add(hiddenClass);
            setPasswordVisible(false);
        } else {
            passwordVisibilityToggle.current.classList.remove(hiddenClass);
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
        <div className="password-visibility-toggle password-visibility-toggle-hidden" 
                onClick={handlePasswordVisibilityToggle}
                ref={passwordVisibilityToggle} >
            {isPasswordVisibile ? <EyeOpenIcon /> : <EyeClosedIcon />}
        </div>
    );
};

export default PasswordVisibilityToggle;