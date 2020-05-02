import React from 'react';
import {
    CircularProgress 
} from '@material-ui/core';
const Spinner = ( ) => {
    return(
        <div className="spinner-content">
            <CircularProgress size={70}  /> 
        </div>
    );
}

export default Spinner;
