import React from 'react';
import {
    ExpansionPanel,
    ExpansionPanelSummary,
    Typography,
    ExpansionPanelDetails,
    Divider
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles'; 
import './OrdersPanel.css';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const OrderPanelDetails = styled(ExpansionPanelDetails)({
    padding: 0
})

const OrderPanel = styled(ExpansionPanel)({
    width: '100%'
})

const OrdersPanel = (props) => {
    const { orderNumber, orderDate, productImage, productName, productQty, productSum, orderStatus } = props;
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
                    <Typography className="product-total__price">{productSum} грн</Typography>
                    <Typography>{orderStatus}</Typography>
                </ExpansionPanelSummary>
                <OrderPanelDetails className="panel-details">
                    <Divider />
                    <div className="panel-details__content">
                        <div className="product-image__details"> 
                            <img className="product-image__details" src={productImage} alt={productName} />
                        </div>
                        <div className="panel-details__product-name">
                            {productName}
                            <div className="panel-details__product-sku">
                                Код товару 123123123
                            </div>
                            <div className="panel-details__product-price">
                                123 грн
                            </div>
                        </div>
                    </div>
                </OrderPanelDetails>
            </OrderPanel>
        </React.Fragment>
    );
};

export default OrdersPanel;