import React from 'react';
import {
    NavLink
} from 'react-router-dom';
import './NavLink.css';


const Link = ({children, href}) => {
    return(
        <NavLink className="nav-link" to={href}>
            {children}
        </NavLink>
    );
}

export default Link;