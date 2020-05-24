import React, { useState, useEffect, useContext } from 'react';
import {
    Paper,
    Typography,
    TextField,
    Button,
    Divider,
    LinearProgress
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Link from '../components/Link';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import AuthContext from '../context/auth-context';
import axios from 'axios';

const FormDivider = styled(Divider)({
    width: '100%',
    marginTop: '10px',
    marginBottom: '10px'
})
const Auth = (props) => {
    const [loading, setLoading] = useState(false);
    const { authenticated, login, setUser, user, token, setToken } = useContext(AuthContext);
    const { handleSubmit, register, errors, watch, formState } = useForm({
        mode: 'onChange'
    });
    const { isValid } = formState;
    const history = useHistory();
    const [ cookies, setCookie ] = useCookies(['token']);
    const formSubmit = (data) => {
        setLoading(true);
        if (title === 'Login') {
            // axios.post('https://damp-plains-96902.herokuapp.com/login',
            
            axios.post(`${process.env.REACT_APP_API}/login`,
                { data: { formData: data }}, { crossDomain: true } )
                .then(res => {
                        setLoading(false);
                        const userProfile = res.data.user;
                        setUser(userProfile)
                        const authToken = res.data.token;
                        setCookie('token', authToken, { expires: new Date(Date.now() + 100000000)});
                        setToken(authToken);
                        login();
                        history.push('/');
                })
                .catch(err => {
                    setLoading(false);
                    console.log(err);
                });
        }
        if (title === 'Sign Up') {
            // axios.post('https://damp-plains-96902.herokuapp.com/signup',
            axios.post(`${process.env.REACT_APP_API}/signup`,
                { data: { formData: data} }, { crossDomain: true } )
                .then(res => {
                    setLoading(false);
                    history.push('/login');
                })
                .catch(err => {
                    setLoading(false);
                    console.log(err);
                });
        }
    }

    const { title } = props;
    return(
            <Paper className="form-paper">
                <form className="login-form" onSubmit={handleSubmit(formSubmit)}>
                    <Typography variant="h5">{title}</Typography>
                    {loading ? <LinearProgress style={{width: '100%'}} variant="query" />
                    : <FormDivider />}
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
        )
};

export default Auth;