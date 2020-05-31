import React from 'react';
import PageSurface from '../../components/PageSurface';
import Input from '../../components/Input';
import ProductSelector from '../../components/ProductSelector';

import {
    Button 
} from '@material-ui/core';

const OrderCreation = () => {
    return(
        <div className="page-order-creation">
        <PageSurface title="Create new Order">
            <form className="order-create__form">
            <Input label="ID" name="id" variant="outlined" type="number" />
            <Input label="Client name" name="clientName" variant="outlined" type="text" />
            <Input label="Client surname" name="clientSurname" variant="outlined" type="text" />
            <Input label="Client Phone" name="clientName" variant="outlined" type="text" />
            <ProductSelector />
            <Button 
                className="form-button" 
                type="submit" 
                color="primary"
                variant="contained">
                Create Order
            </Button>
            </form>
        </PageSurface>
        </div>
    );
};

export default OrderCreation;