import React from 'react';
import {
    Paper,
    Typography,
    Divider
} from '@material-ui/core';

const Widget = ({title, children }) => {
    return(
        <Paper className="widget-surface" >
            <div className="widget-title">
                <Typography variant="h5" >{title}</Typography>
            </div>
            <Divider />
            <div className="widget-body">
                <div className="widget-children">
                    {children}
                </div> 
            </div>
        </Paper>
    );
};

export default Widget;