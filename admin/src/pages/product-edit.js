import React from 'react';
import {
    Paper
} from '@material-ui/core';

import { useParams } from 'react-router-dom';

const ProductEdit = (props) => {
    const { productId } = useParams();
    return(
        <Paper>
            Edit { productId }
        </Paper>
    );
};

export default ProductEdit;