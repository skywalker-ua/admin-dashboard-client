import React from 'react';
import {
    Paper,
    Typography,
    TextField,
    Button,
    Divider
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Link from '../components/Link';

const FormDivider = styled(Divider)({
    width: '100%',
    marginTop: '10px',
    marginBottom: '10px'
})

const Auth = (props) => {
    const { title } = props;
    return(
        <React.Fragment>
            <Paper className="form-paper">
                <form className="login-form">
                    <Typography variant="h5">
                        {title}
                    </Typography>
                    <FormDivider />
                    { title === 'Sign Up' && <TextField name="name" label="Name" />}
                    { title === 'Sign Up' && <TextField name="surname" label="Surname" /> }
                    <TextField name="email" label="Email"/>
                    <TextField name="password" type="password" label="Password" />
                    {title === 'Sign Up' && <TextField disabled name="password-repeat" type="password" label="Repeat Password" />}
                    <Button 
                        disabled
                        variant="contained" 
                        disableElevation
                        color="primary">{title}
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