import React from 'react';
import './Input.css';
import {
    TextField
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const InputEdited = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
            borderColor: '#3f51b5'
        }
    }
})

const Input = (props) => {
    return(
        <div className="creation-form__input">
            <InputEdited style={{width: '80%'}}  {...props} />
        </div>
    );
};

export default Input;