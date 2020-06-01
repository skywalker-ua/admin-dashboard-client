import React, { useEffect, useContext, useState } from 'react';
import Widget from '../widgets/widget';
import axios from 'axios';
import OrdersCounter from '../widgets/OrdersCounter';
import AuthContext from '../context/auth-context';

const Index = () => {
    const { token } = useContext(AuthContext);
    const [ordersCount, setOrdersCount] = useState('');
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/counter`,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res);
                setOrdersCount(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return(
        <div className="homepage-container">
            <Widget title="Orders">
                <OrdersCounter orders={ordersCount} /> 
            </Widget>
        </div>
    );
};

export default Index;
