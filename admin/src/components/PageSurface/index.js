import React from 'react';
import {
    Paper,
    Typography,
    Divider
} from '@material-ui/core';
import './PageSurface.css';

const PageSurface = ({title, children}) => {
    return(
        <Paper className="page-surface" square>
            <Typography style={{padding: '10px'}} variant="h5" >{title}</Typography>
            <Divider />
            <div className="page-surface__content">
                {children}
            </div>
        </Paper>
    );
};

export default PageSurface;