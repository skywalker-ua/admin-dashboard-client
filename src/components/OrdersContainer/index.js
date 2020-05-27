import React from 'react';
import {
    Paper, Divider
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import './OrdersContainer.css';
const OrdersPaper = styled(Paper)({
})

const orders = [
    {id: 112344, status: 'completed'},
    {id: 113344, status: 'pending'},
    {id: 112414, status: 'completed'},
    {id: 151344, status: 'canceled'},
];

const OrdersContainer = (props) => {
    return(
        <OrdersPaper square >
                <div className="orders-header"> 
                    <div className="orders-header__name">Номер Замовлення</div>
                    <div className="orders-header__name">Дата Замовлення</div>
                    <div className="orders-header__name">Покупець</div>
                    <div className="orders-header__name">Сума Замовлення</div>
                    <div className="orders-header__name">Товари</div>
                </div>
            <Divider />
                {orders.map(order => (
                <>
                    <div className="order-block" key={order.id}>
                        {order.status === 'completed' &&  <div className="order-block__status" style={{backgroundColor: 'green'}} />}
                        {order.status === 'canceled' &&  <div className="order-block__status" style={{backgroundColor: 'red'}} />}
                        {order.status === 'pending' &&  <div className="order-block__status" style={{backgroundColor: 'yellow'}} />}
                        <div className="order-block__order-id">
                            {order.id}
                        </div>
                    </div>
                    <Divider />
                </>
                ))}
        </OrdersPaper>
    );
};

export default OrdersContainer;