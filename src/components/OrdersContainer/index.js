import React from 'react';
import {
    Paper, Divider,
    Table, TableCell, TableHead,
    TableRow, TableContainer, TableBody
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import './OrdersContainer.css';
import Spinner from '../Spinner';
import { useHistory } from 'react-router-dom';
import { formatDate } from '../../utils/format-data';


const OrdersRow = styled(TableRow)({
    padding: '0',
    cursor: 'pointer'
    
})
const OrderIdCell = styled(TableCell)({
    padding: '0',
})
const SpinnerRow = styled(TableRow)({
    width: '100%'
})
const OrdersContainer = (props) => {
    const { orders } = props;
    const history = useHistory();
    const handleOrderClick = (id) => {
        history.push(`/orders/${id}`);
    }
    return(
        <>
        {orders.length > 0 ?
        <TableContainer component={Paper} square>
            <Table aria-label="order-table">
                <TableHead>
                    <TableRow>
                        <TableCell>Order Id</TableCell>
                        <TableCell>Order Date</TableCell>
                        <TableCell>Client</TableCell>
                        <TableCell>Order Sum</TableCell>
                        <TableCell>Products</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map(order => (
                        <OrdersRow key={order.id} hover onClick={() => handleOrderClick(order.id)}>
                            <OrderIdCell >
                                <div className="order-block__order-id">
                                    {order.status === 'new' &&  <div className="order-block__status" style={{backgroundColor: 'orange'}} />}
                                    {order.status === 'pending' &&  <div className="order-block__status" style={{backgroundColor: 'lightblue'}} />}
                                    {order.status === 'completed' &&  <div className="order-block__status" style={{backgroundColor: 'green'}} />}
                                    {order.status === 'shipping' &&  <div className="order-block__status" style={{backgroundColor: 'black'}} />}
                                    <div className="order-block__order-info">
                                        {order.id}
                                    </div>
                                </div>
                            </OrderIdCell>
                            <TableCell>
                                <div className="order-block__order-date">
                                    <div className="order-block__order-date-hour">
                                        {formatDate(order.createdAt, 'hour')}
                                    </div>
                                    <div className="order-block__order-date-ymd">
                                        {formatDate(order.createdAt, 'ymd')}
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="order-block__order-client">
                                    <div className="order-block__order-client-name">
                                        {order.clientName}
                                    </div>
                                    <div className="order-block__order-client-phone">
                                        {order.clientPhone}
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>{parseInt(order.product.price) * parseInt(order.qty) + ' грн'}</TableCell>
                            <TableCell align="left" ><img className="product-image-order" src={order.product.imgUrl} /></TableCell>
                        </OrdersRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>       
        : <TableContainer component={Spinner} />}     
        </>
    );
};

export default OrdersContainer;