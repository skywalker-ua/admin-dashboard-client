import React, { useContext } from 'react';
import { styled } from '@material-ui/core/styles';
import Link from '../Link';
import MenuIcon from '@material-ui/icons/Menu';
import AuthContext from '../../context/auth-context';

import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Button
} from '@material-ui/core';

const HeaderBar = styled(AppBar)({
    backgroundColor: 'white',
    zIndex: 1
})

const HeaderText = styled(Typography)({
    flexGrow: 1
})

const Header = (props) => {
   const { authenticated } = useContext(AuthContext);
    return(
        <React.Fragment>
            <HeaderBar elevation={1}>
                <Toolbar>
                    {authenticated  ?
                    <IconButton style={{marginRight: '10px'}} onClick={props.onClick}>
                        <MenuIcon />
                    </IconButton> : <></>}
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
