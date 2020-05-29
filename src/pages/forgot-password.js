import React from 'react';
import PageSurface from '../components/PageSurface';
import Input from '../components/Input';
import { Button } from '@material-ui/core';

const ForgotPassword = (props) => {
    return(
        <div className="page-product-recover">
            <PageSurface title={props.title} >
                <form className="product-recovery__form" >
                    <Input name="email" label="Email" variant="outlined" type="email" />
                    <Button className="form-button" type="submit" color="primary" variant="contained">Send</Button>
                </form>
            </PageSurface>
        </div>
    );
};

export default ForgotPassword;