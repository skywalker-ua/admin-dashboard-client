import React from 'react';
import './Input.css';
import {
    TextField
} from '@material-ui/core';
const Input = (props) => {
    return(
        <div className="creation-form__input">
            <TextField style={{width: '80%'}}  {...props} />
        </div>
    );
};

export default Input;