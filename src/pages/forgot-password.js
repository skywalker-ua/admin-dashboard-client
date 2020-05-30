import React, { useState } from 'react';
import PageSurface from '../components/PageSurface';
import Input from '../components/Input';
import { Button, LinearProgress } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const ForgotPassword = (props) => {
    const [loading, setLoading] = useState(false);
    const { handleSubmit, register, errors, formState } = useForm({
        mode: 'onChange'
    });

    const formSubmit = (data) => {
        setLoading(true);
        console.log(data);
        axios.post(`${process.env.REACT_APP_API}/password-recovery`,
            {
                data: {
                    email: data
                }
            })
            .then(res => {
                setLoading(false);
                console.log(res);
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
            })
    };

    const { isValid } = formState;

    return(
        <div className="page-product-recover">
            {loading && <LinearProgress style={{width: '100%'}} variant="query" /> }
            <PageSurface title={props.title} >
                <form className="product-recovery__form" onSubmit={handleSubmit(formSubmit)}>
                    <Input 
                        name="email" 
                        label="Email"  
                        error={Boolean(errors.email)}
                        type="email"
                        inputRef={register({
                            required: 'Email is required',
                            pattern: {
                                value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                                message: 'Please provide a valid email'
                            }
                        })}
                        helperText={errors.email?.message} />
                    <Button 
                        disabled={!isValid} 
                        className="form-button" 
                        type="submit" 
                        color="primary" 
                        variant="contained">Send</Button>
                </form>
            </PageSurface>
        </div>
    );
};

export default ForgotPassword;