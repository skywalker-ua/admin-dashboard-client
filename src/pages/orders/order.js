import React, { useEffect, useContext, useState  } from 'react';
import { useParams } from 'react-router-dom';
import {
    Paper, Divider,
    CircularProgress
} from '@material-ui/core';
import { styled } from '@material-ui/styles';
import AuthContext from '../../context/auth-context';
import axios from 'axios';

const OrderSurface = styled(Paper)({
    
})

const Order = () => {
    const { orderId } = useParams();
    const [loading, setLoading] = useState(false);
    const { token } = useContext(AuthContext);
    const [orderInfo, setOrderInfo] = useState('');
    useEffect(() => {
        setLoading(true);
        axios.get(`${process.env.REACT_APP_API}/orders/${orderId}`,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            setLoading(false);
            console.log(res.data);
            setOrderInfo(res.data);
        })
        .catch(err => {
            setLoading(false);
            console.log(err);
        })
    }, [])
    return(
        <div className="orders-main">
        {loading ? <CircularProgress /> :
            <OrderSurface square>
                <div className="surface-header">
                    {'№ ' + orderInfo.id}
                    {orderInfo.createdAt}
                </div>
                <Divider />
                <div className="surface-content">

                </div>
            </OrderSurface>
        }
        </div>
    );
};

export default Order;