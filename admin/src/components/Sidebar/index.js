import React, { useState, useEffect } from 'react';
import {
    Paper,
    List,
    ListItem,
    ListItemText,
    ListItemIcon
} from '@material-ui/core';
import StoreIcon from '@material-ui/icons/Store';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import { styled } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';
import NavLink from '../../components/Link';
import './Sidebar.css';

const SidebarCard = styled(Paper)({
    width: '200px',
    height: '100vh',
    position: 'fixed'
})

const menuRows = [
    {id: 1, 'title': 'Orders', 'link': '/orders', icon: <AccountBalanceIcon />},
    {id: 2, 'title': 'Products', 'link': '/products', icon: <StoreIcon />}
]

const Sidebar = () => {

    let location = useLocation();
    let path = location.pathname;
    let pathId;

    const [ selected, setSelectedId ] = useState({
        id: 0
    })

    const handleSelected = (event, id, link) => {
        setSelectedId({
            id: id
        })
    }

    useEffect(() => {
        menuRows.map(row => {
            if (row.link === path) {
                pathId = row.id;
                setSelectedId({
                    id: pathId
                })
            }
        });
    }, [pathId])

    return(
        <nav className="sidebar" >
            <SidebarCard square>
                <List component="nav" aria-label="navigation icons">
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
                </List>
            </SidebarCard>
        </nav>
    );
};

export default Sidebar;