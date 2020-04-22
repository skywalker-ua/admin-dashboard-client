import React from 'react';
import {
    Paper,
    Typography
} from '@material-ui/core';
import './OrdersPanel.css';
import { styled } from '@material-ui/core/styles';

const OrdersTitlePaper = styled(Paper)({
    marginBottom: '15px'
})

const OrdersTitle = () => {
    return(
        <OrdersTitlePaper>
            <div className="orders-title-header">
                <Typography className="orders-number">Номер замовлення</Typography>
                <Typography className="order-date">Дата замовлення</Typography>
                <Typography className="product-img">Фото товару</Typography>
            </div>
        </OrdersTitlePaper>
    )
};

export default OrdersTitle;