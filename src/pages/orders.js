import React, { useEffect, useContext, useState } from 'react';
import OrdersPanel from '../components/OrdersPanel';
import OrdersTitle from '../components/OrdersPanel/OrdersTitle';
import AuthContext from '../context/auth-context';
// import data from '../constants/orders.json';
import axios from 'axios';

const Orders = () => {
    const { token } = useContext(AuthContext);
    const [orders, setOrders] = useState(undefined);
    useEffect(() => {
        axios.get('http://localhost:5000/orders',
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res);
                const orders = [res.data];
                setOrders(orders);
            })
            .catch(err => console.log(err));
    }, [])

    return(
        <div className="orders-main">
            <OrdersTitle />
            {orders && orders.map(order => (
                <OrdersPanel 
                    key={order.id * Math.random()}
                    orderNumber={order.id} 
                    orderDate={order.createdAt}
                    productImage={order.productImgUrl}
                    productName={order.product}
                    productQty={order.qty}
                    productSum={order.orderTotal}
                    orderStatus={order.status}
                     />
            ))}
        </div>
    );
};

export default Orders;