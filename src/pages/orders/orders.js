import React, { useEffect, useContext, useState } from 'react';
import OrdersContainer from '../../components/OrdersContainer';
// import OrdersPanel from '../components/OrdersPanel';
// import OrdersTitle from '../components/OrdersPanel/OrdersTitle';
import AuthContext from '../../context/auth-context';
import { 
    Typography, Button, Divider
 } from '@material-ui/core';
import axios from 'axios';
import AddIcon from '@material-ui/icons/Add';
import NavLink from '../../components/Link';

const Orders = () => {
    const { token } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/orders',
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res);
                const orders = res.data;
                setOrders(orders);
            })
            .catch(err => console.log(err));
    }, [])

    return(
        <div className="orders-main">
        <div className="page-title">
            <Typography variant="h4">Orders</Typography>
            <div className="page-toolbar">
                <Button startIcon={<AddIcon />}>
                    <NavLink href="/order/new">
                        Add Order
                    </NavLink>
                </Button>
                <Divider orientation="vertical" />
            </div>
        </div>
            <OrdersContainer orders={orders} />
        </div>
    );
};

export default Orders;