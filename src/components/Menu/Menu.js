import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Menu.scss';

import { ReactComponent as ProfileIcon } from '../../assets/user.svg';
import { ReactComponent as PasswordIcon } from '../../assets/lock.svg';
import { ReactComponent as SignOutIcon } from '../../assets/sign-out.svg';

const Menu = ({ user, signOutUser }) => {
    const [isMenuOpen, setMenuOpen] = useState(false);

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
    const toggleMenu = () => {
        setMenuOpen(prev => !prev);
    };

    return (
        <div className="menu-container">
            <button className="menu-btn" onClick={toggleMenu}>{user ? getOptionsButtonText() : ''}</button>
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
                    <li className="menu-item" onClick={signOutUser}>
                        <SignOutIcon />
                        <p className="menu-item-text menu-item-text-red">Sign Out</p>
                    </li>
                </ul>
                : null
            }
        </div>
    );
};

export default Menu;