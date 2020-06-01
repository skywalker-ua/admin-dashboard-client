import React from 'react';

const OrdersCounter = (props) => {
    const { orders } = props;
    return(
        <>
            <div className="orders-element">
                <div className="orders-element__order-status" style={{backgroundColor: 'orange'}}/>
                <div className="orders-element__text-status">New</div>
                <div className="orders-element__num-status">{orders.newOrders || 0}</div>
            </div>
            <div className="orders-element">
                <div className="orders-element__order-status" style={{backgroundColor: 'lightblue'}}/>
                <div className="orders-element__text-status">Pending</div>
                <div className="orders-element__num-status">{orders.pendingOrders || 0}</div>
            </div>
            <div className="orders-element">
                <div className="orders-element__order-status" style={{backgroundColor: 'black'}}/>
                <div className="orders-element__text-status">Shipping</div>
                <div className="orders-element__num-status">{orders.shippingOrders || 0}</div>
            </div>
            <div className="orders-element">
                <div className="orders-element__order-status" style={{backgroundColor: 'green'}}/>
                <div className="orders-element__text-status">Completed</div>
                <div className="orders-element__num-status">{orders.completedOrders || 0}</div>
            </div>
        </>
    );
};

export default OrdersCounter;