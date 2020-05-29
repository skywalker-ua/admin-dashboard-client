import React from 'react';
import {
    Paper, Divider,
    Table, TableCell, TableHead,
    TableRow, TableContainer, TableBody
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import './OrdersContainer.css';
import Spinner from '../Spinner';
import { formatDate } from '../../utils/format-data';
// const orders = [
//     {id: 112344, status: 'completed', date: '15:53', clientName: 'Joe Jons', clientPhone: '+3801231113', orderTotal: 1441, orderProducts: ''},
//     {id: 113344, status: 'pending'},
//     {id: 112414, status: 'completed'},
//     {id: 151344, status: 'canceled'},
// ];
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
                        <OrdersRow key={order.id} hover>
                            <OrderIdCell >
                                <div className="order-block__order-id">
                                    {order.status === 'Completed' &&  <div className="order-block__status" style={{backgroundColor: 'green'}} />}
                                    {order.status === 'Pending' &&  <div className="order-block__status" style={{backgroundColor: 'lightblue'}} />}
                                    {order.status === 'Canceled' &&  <div className="order-block__status" style={{backgroundColor: 'red'}} />}
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
                            <TableCell>{order.orderTotal + ' грн'}</TableCell>
                            <TableCell>{order.orderProducts}</TableCell>
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