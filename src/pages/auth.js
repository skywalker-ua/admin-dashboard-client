import React, { useState, useEffect } from 'react';
import {
    Paper,
    Typography,
    TextField,
    Button,
    Divider
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Link from '../components/Link';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const FormDivider = styled(Divider)({
    width: '100%',
    marginTop: '10px',
    marginBottom: '10px'
})
const Auth = (props) => {
    const [formValid, setFormValid] = useState(true);
    const { handleSubmit, register, errors, watch, formState } = useForm({
        mode: 'onChange'
    });
    const { isValid } = formState;

    const formSubmit = (data, event) => {
        event.preventDefault();
        data.id = 2;
        if (title === 'Login') {
            axios.post('https://damp-plains-96902.herokuapp.com/products/login',
                { data: { formData: data } } )
                .then(res => {
                    console.log(res);
                })
                .catch(err => console.log(err));
        }
        if (title === 'Sign Up') {
            axios.post('https://damp-plains-96902.herokuapp.com/products/signup',
                { data: { formData: data} } )
                .then(res => {
                    console.log(res);
                })
                .catch(err => console.log(err));
        }
    }

    const { title } = props;
    return(
        <React.Fragment>
            <Paper className="form-paper">
                <form className="login-form" onSubmit={handleSubmit(formSubmit)}>
                    <Typography variant="h5">{title}</Typography>
                    <FormDivider />

                    {/* Inputs */}
                    {/*  Login Inputs */}
                    {title === 'Login' && (
                    <>
                    <TextField
                        className="auth-input"
                        error={Boolean(errors.email)} 
                        inputRef={register({ 
                            required: 'Email is required',
                            pattern: {
                                value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                                message: 'Please provide a valid email'
                            }
                             })} 
                        name="email" 
                        label="Email"
                        helperText={errors.email?.message}
                        />
                    <TextField 
                        className="auth-input"
                        error={Boolean(errors.password)} 
                        inputRef={register({ 
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: 'Password must be 6 characters minimum'
                            }
                          })} 
                        name="password" type="password" 
                        label="Password"
                        helperText={errors.password?.message} 
                    />
                    </>
                    )}
                    {/* Sign Up Inputs */}
                    {title === 'Sign Up' && (
                        <>  
                            <TextField 
                                error={Boolean(errors.name)}
                                inputRef={register({
                                    required: 'Name is required'
                                })}
                                className="auth-input"
                                name="name"
                                type="text"
                                label="Name"
                                helperText={errors.name?.message}
                            />
                            <TextField 
                                error={Boolean(errors.surname)}
                                inputRef={register({
                                    required: 'Surname is required'
                                })}
                                className="auth-input"
                                name="surname"
                                type="text"
                                label="Surname"
                                helperText={errors.surname?.message}
                            />
                            <TextField 
                                error={Boolean(errors.signupEmail)}
                                inputRef={register({ 
                                required: 'Email is required',
                                pattern: {
                                    value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                                    message: 'Please provide a valid email'
                                }
                                 })}
                                className="auth-input"
                                name="signupEmail"
                                type="email"
                                label="Email"
                                helperText={errors.signupEmail?.message}
                            />
                            <TextField 
                                error={errors.signupPassword}
                                inputRef={register({
                                    required: 'Please provide a password',
                                    minLength: {
                                        value: 6,
                                        message: 'Minimum length should be 6 characters'
                                    }
                                })}
                                className="auth-input"
                                name="signupPassword" 
                                type="password" 
                                label="Password" 
                                helperText={errors.signupPassword?.message}
                            />
                            <TextField 
                                inputRef={register({
                                    required: true,
                                    validate: { 
                                        matching: value => value !== watch("signupPassword") ? 'Password fields are not equal' : undefined
                                    }
                                })}
                                error={errors.passwordRepeat}
                                className="auth-input"
                                name="passwordRepeat" 
                                type="password" 
                                label="Repeat Password" 
                                helperText={errors.passwordRepeat?.message}
                            />
                        </>
                    )}
                    <Button
                        disabled={!isValid}
                        type="submit"
                        variant="contained" 
                        disableElevation
                        color="primary">
                            {title}
                    </Button>
                    <FormDivider />
                    <Typography>
                        <Link href={title === 'Login' ? "/signup" : '/login'}>
                            {title === 'Login' ? 'Sign Up?' : 'Login?'}
                        </Link>
                    </Typography>
                </form>
            </Paper>
        </React.Fragment>
    );
};

export default Auth;