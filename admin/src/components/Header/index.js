import React from 'react';
import { styled } from '@material-ui/core/styles';
import Link from '../Link';

import {
    AppBar,
    Toolbar,
    Typography,
    Button
} from '@material-ui/core';

const HeaderBar = styled(AppBar)({
    backgroundColor: 'white',
})

const HeaderText = styled(Typography)({
    flexGrow: 1
})

const Header = () => {
    return(
        <React.Fragment>
            <HeaderBar elevation={1}>
                <Toolbar>
                    <HeaderText variant="h4" color="primary">
                        <Link href="/">Admin</Link>
                    </HeaderText>
                    <Button 
                        disableElevation 
                        color="primary" 
                        variant="contained"
                        >
                    <Link href="/login">Log In</Link>
                    </Button>
                </Toolbar>
            </HeaderBar>
            <Toolbar />
        </React.Fragment>
    );
};

export default Header;
