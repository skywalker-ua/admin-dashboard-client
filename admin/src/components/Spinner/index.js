import React from 'react';
import {
    CircularProgress 
} from '@material-ui/core';
const Spinner = ( ) => {
    return(
        <div className="spinner-content">
            <CircularProgress   /> 
        </div>
    );
}

export default Spinner;
