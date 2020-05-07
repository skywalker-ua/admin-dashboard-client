import React, { useEffect } from 'react';
import OrdersPanel from '../components/OrdersPanel';
import OrdersTitle from '../components/OrdersPanel/OrdersTitle';
import data from '../constants/orders.json';
import axios from 'axios';

const Orders = () => {

    useEffect(() => {
        axios.get('http://localhost:5000/orders')
            .then(data => console.log(data))
            .catch(err => console.log(err));
    }, [])

    return(
        <div className="orders-main">
            <OrdersTitle />
            {data.map(order => (
                <OrdersPanel 
                    key={order.id * Math.random()}
                    orderNumber={order.orderId} 
                    orderDate={order.date}
                    productImage={order.productImgUrl}
                    productName={order.productName}
                    productQty={order.qty}
                    productSum={order.sum} />
            ))}
        </div>
    );
};

export default Orders;