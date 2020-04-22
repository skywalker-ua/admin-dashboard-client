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
        <OrdersTitlePaper square>
            <div className="orders-title-header">
                <Typography className="orders-number">Номер</Typography>
                <Typography className="order-date">Дата</Typography>
                <Typography className="product-img"></Typography>
                <Typography className="product-qty">К-ть</Typography>
            </div>
        </OrdersTitlePaper>
    )
};

export default OrdersTitle;