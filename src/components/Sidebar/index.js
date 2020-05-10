import React, { useState, useEffect, useRef } from 'react';
import {
    Paper,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Drawer
} from '@material-ui/core';
import StoreIcon from '@material-ui/icons/Store';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import { styled } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';
import NavLink from '../../components/Link';
import './Sidebar.css';

const MenuDrawer = styled(Drawer)({
    
});

const MenuList = styled(List)({
    width: '240px'
});

const menuRows = [
    {id: 1, 'title': 'Orders', 'link': '/orders', icon: <AccountBalanceIcon />},
    {id: 2, 'title': 'Products', 'link': '/products', icon: <StoreIcon />}
]

const Sidebar = (props) => {

    let location = useLocation();
    let path = useRef(location.pathname);
    const [ selected, setSelectedId ] = useState({
        id: 0
    })

    const handleSelected = (event, id) => {
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
        <MenuList component="nav" aria-label="navigation icons">
                {menuRows.map(row => (
                     <NavLink href={row.link} key={row.id}>
                         <ListItem 
                          button 
                          selected={selected.id === row.id}
                          onClick={(event) => handleSelected(event, row.id)} >
                             <ListItemIcon>{row.icon}</ListItemIcon>
                             <ListItemText key={row.id} primary={row.title} />
                         </ListItem>
                     </NavLink>
                ))}
        </MenuList>
    </MenuDrawer>
)};

export default Sidebar;