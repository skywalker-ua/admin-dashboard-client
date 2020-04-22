import React from 'react';
import OrdersPanel from '../components/OrdersPanel';
import OrdersTitle from '../components/OrdersPanel/OrdersTitle';
import data from '../constants/orders.json';

const Orders = () => {
    return(
        <React.Fragment>
            <OrdersTitle />
            {data.map(order => (
                <OrdersPanel 
                    orderNumber={order.orderId} 
                    orderDate={order.date}
                    productImage={order.productImgUrl}
                    productName={order.productName}
                    productQty={order.qty} />
            ))}
        </React.Fragment>
    );
};

export default Orders;