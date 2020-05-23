import React, { useState, useEffect, useRef, useContext } from 'react';
import {
    Paper,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Drawer,
    Divider
} from '@material-ui/core';
import StoreIcon from '@material-ui/icons/Store';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import { styled } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import NavLink from '../../components/Link';
import UserInfo from '../Sidebar/UserInfo';
import './Sidebar.css';

const MenuDrawer = styled(Drawer)({
    
});

const MenuList = styled(List)({
    width: '240px',
    height: '90%',
    display: 'flex',
    flexFlow: 'column nowrap'
});

const menuRows = [
    {id: 1, 'title': 'Orders', 'link': '/orders', icon: <AccountBalanceIcon />},
    {id: 2, 'title': 'Products', 'link': '/products', icon: <StoreIcon  />}
]

const Sidebar = (props) => {
    const { logout } = useContext(AuthContext);
    let location = useLocation();
    let path = useRef(location.pathname);
    const [ selected, setSelectedId ] = useState({
        id: 0
    })

    const handleSelected = (event, id) => {
        if (id === 3) {
            return logout();
        }
        props.onClose();
        setSelectedId({
            id: id
        })
    }

    useEffect(() => {
        menuRows.map(row => {
            if (row.link === path.current) {
                return(
                    setSelectedId({
                        id: row.id
                    })
                );  
            }
        });
    }, [])

    return(
    <MenuDrawer
        open={props.open}
        elevation={1}
        onClose={props.onClose}>
        <UserInfo user={props.user} />
        <Divider />
        <MenuList component="nav" aria-label="navigation icons">
                <div className="sidebar-menu-items">
                {menuRows.map(row => (
                     <NavLink href={row.link} key={row.id}>
                         <ListItem 
                          button
                          selected={selected.id === row.id}
                          onClick={(event) => handleSelected(event, row.id)}>
                             <ListItemIcon>{row.icon}</ListItemIcon>
                             <ListItemText key={row.id} primary={row.title} />
                         </ListItem>
                     </NavLink>
                ))}
                </div>
                <NavLink href="/logout">
                    <ListItem
                        button
                        selected={selected.id === 3}
                        onClick={(event) => handleSelected(event, 3)}>
                        <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </NavLink>
        </MenuList>
    </MenuDrawer>
)};

export default Sidebar;