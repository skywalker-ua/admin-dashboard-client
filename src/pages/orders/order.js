import React, { useEffect, useContext, useState  } from 'react';
import { useParams } from 'react-router-dom';
import {
    Paper, Divider,
    CircularProgress, Typography
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { styled } from '@material-ui/styles';
import AuthContext from '../../context/auth-context';
import { formatDate } from '../../utils/format-data';
import axios from 'axios';

const OrderSurface = styled(Paper)({
    
})

const Order = () => {
    const { orderId } = useParams();
    const [loading, setLoading] = useState(false);
    const { token } = useContext(AuthContext);
    const [orderInfo, setOrderInfo] = useState([]);
    const [product, setProduct] = useState({});
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
            setProduct(res.data.product);
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
            <div className="surface-content-wrapper">
                <div className="surface-header">
                    <div className="surface-header__order-details">
                        <div className="surface-header__order-id">
                         <Typography variant="h6">{'№ ' + orderInfo.id}</Typography>
                        </div>
                        <div className="surface-header__order-date">
                         {formatDate(orderInfo.createdAt, 'ymd') + ', ' + formatDate(orderInfo.createdAt, 'hour')}
                        </div>
                    </div>
                </div>
                <Divider />
                <div className="surface-main">
                    <div className="surface-content">

                        {/* ORDER STATUS BADGE */}
                        <div className="surface-content_main">
                        <div className="surface-content_order">
                            <div className="surface-content_order-info">
                                <div className="surface-content_order-status">
                                {orderInfo.status === 'new' && (
                                    <>
                                    <div className="order-status-badge" style={{backgroundColor: 'orange'}}></div>
                                    <div className="order-status-text">Order Status</div>
                                    <div className="order-status-colored-text" style={{color: 'orange'}}>New Order</div>
                                    </>
                                )}
                                {orderInfo.status === 'pending' && (
                                    <>
                                    <div className="order-status-badge" style={{backgroundColor: 'lightblue'}}></div>
                                    <div className="order-status-text">Order Status</div>
                                    <div className="order-status-colored-text" style={{color: 'lightblue'}}>Pending</div>
                                    </>
                                )}
                                {orderInfo.status === 'shipping' && (
                                    <>
                                    <div className="order-status-badge" style={{backgroundColor: 'black'}}></div>
                                    <div className="order-status-text">Order Status</div>
                                    <div className="order-status-colored-text" style={{color: 'black'}}>Shipping</div>
                                    </>
                                )}
                                {orderInfo.status === 'completed' && (
                                    <>
                                    <div className="order-status-badge" style={{backgroundColor: 'green'}}></div>
                                    <div className="order-status-text">Order Status</div>
                                    <div className="order-status-colored-text" style={{color: 'green'}}>Completed</div>
                                    </>
                                )}
                                </div>
                            </div>
                        </div>

                        {/* ORDER TOTAL BADGE */}
                        <div className="surface-content_client">
                            <div className="surface-content_order-info">
                                <div className="surface-content_order-status">
                                    <div className="order-status-text">
                                        Order Total
                                    </div>
                                    <div className="order-total">
                                        {product.price * orderInfo.qty + ' £'}
                                    </div>
                                </div>
                            </div>
                        </div>   
                        </div>
                        <div className="surface-content_order-info">
                            <div className="surface-content_order-status">
                                <div className="surface-content_order-products-list">
                                    <img className="product-image" src={product.imgUrl} alt={product.name} />
                                    <div className="surface-content_order-products-details">
                                        <div>{product.name}</div>
                                        <div className="surface-content_order-products-sku">
                                            Product SKU: {product.sku}
                                        </div>
                                        <div className="surface-content_order-products-info">
                                             <div>{product.price + ' £'}</div>
                                             <div>{orderInfo.qty + ' pcs.'}</div>
                                             <div>{product.price * orderInfo.qty + ' £'}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Divider orientation="vertical" style={{height: '72.5%'}} />
                    <div className="surface-sidebar"> 
                        <div className="surface-sidebar__content">
                            <div className="surface-sidebar__user-info">
                                <PersonIcon />
                                <div className="user-details__text" >User Details</div>
                            </div>
                            <div className="sidebar_creds">
                                <div className="sidebar_username">Name</div>
                                <div className="sidebar_username_client">{orderInfo.clientName}</div>
                            </div>
                            <div className="sidebar_creds">
                                <div className="sidebar_username">Surname</div>
                                <div className="sidebar_username_client">{orderInfo.clientSurname}</div>
                            </div>
                            <div className="sidebar_creds">
                                <div className="sidebar_username">Phone</div>
                                <div className="sidebar_username_client">{orderInfo.clientPhone}</div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            </OrderSurface>
        }
        </div>
    );
};

export default Order;