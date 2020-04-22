import React from 'react';
import {
    ExpansionPanel,
    ExpansionPanelSummary,
    Typography,
    ExpansionPanelDetails
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles'; 
import './OrdersPanel.css';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const OrderPanel = styled(ExpansionPanel)({
    width: '100%'
})

const OrdersPanel = (props) => {
    const { orderNumber, orderDate, productImage, productName, productQty } = props;
    return(
        <React.Fragment>
            
            <OrderPanel>
                <ExpansionPanelSummary
                    className="panel-title"
                    expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1" className="orders-number">№ {orderNumber}</Typography>
                    <Typography className="order-date">{orderDate}</Typography>
                    <div className="product-img">
                        <img className="product-image" src={productImage} alt={productName} />
                    </div>
                    <Typography className="order-qty">{productQty} шт.</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    Content
                </ExpansionPanelDetails>
            </OrderPanel>
        </React.Fragment>
    );
};

export default OrdersPanel;