import React, { useState, useReducer, useContext } from 'react';
import PageSurface from '../../components/PageSurface';
import Input from '../../components/Input';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import './Orders.css';
import {
    Button, FormControl, Select,
    InputLabel, MenuItem, TextField, CircularProgress
} from '@material-ui/core';


const OrderCreation = () => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const { token } = useContext(AuthContext);
    const history = useHistory();
    const [selectedProduct, setSelected] = useReducer(
        (selectedProduct, newState) => ({...selectedProduct, ...newState}),
        {
            status: null,
            product: {},
            qty: '',
            id: '',
            clientName: '',
            clientSurname: '',
            clientPhone: ''
        }
    )

    const fetchProducts = () => {
        axios.get(`${process.env.REACT_APP_API}/products`,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                setLoading(false);
                setProducts(res.data);
            })
            .catch(err => {
                setLoading(false);
                console.log(err)
            });
    }
    const handleOpen = () => {
        setLoading(true);
        fetchProducts();
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API}/orders/create`,
        {
            order: JSON.stringify(selectedProduct)
        },
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res);
                history.push('/orders');
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        setSelected({
            [name]: value
        });
    }
    return(
        <div className="page-order-creation">
        <PageSurface title="Create new Order">
            <form className="order-create__form" onSubmit={formSubmitHandler}>
            <Input value={selectedProduct.id} onChange={handleChange} label="ID" name="id" variant="outlined" type="number" />
            <Input value={selectedProduct.clientName} onChange={handleChange} label="Client name" name="clientName" variant="outlined" type="text" />
            <Input value={selectedProduct.clientSurname} onChange={handleChange} label="Client surname" name="clientSurname" variant="outlined" type="text" />
            <Input value={selectedProduct.clientPhone} onChange={handleChange} label="Client Phone" name="clientPhone" variant="outlined" type="text" />
            <FormControl variant="outlined" style={{width: '80%'}}>
                <InputLabel id="select-status">Status</InputLabel>
                <Select
                    name="status"
                    label="select-status"
                    value={selectedProduct.status}
                    onChange={handleChange}>
                    <MenuItem value="new" >New <div className="order-icon" style={{backgroundColor: 'orange'}} /></MenuItem >
                    <MenuItem  value="pending">Pending <div className="order-icon" style={{backgroundColor: 'lightblue'}} /></MenuItem >
                    <MenuItem  value="shipping">Shipping <div className="order-icon" style={{backgroundColor: 'black'}} /></MenuItem >
                    <MenuItem  value="completed">Completed <div className="order-icon" style={{backgroundColor: 'green'}} /></MenuItem >
                </Select>
            </FormControl>
            <div className="product-selection">
        {selectedProduct.product.imgUrl && 
            <div className="selected-item-img">
                <img 
                    alt={selectedProduct.product.name} 
                    className="selection-image" 
                    src={selectedProduct.product.imgUrl} 
                />
            </div>
        }
        <div className="product-selection__form-inputs">
            <FormControl variant="outlined" className="product-selection-form">
            <InputLabel>Select Product</InputLabel>
                <Select
                    label="product-select"
                    id="product-select"
                    name="product"
                    onOpen={handleOpen}
                    onChange={handleChange}
                    value={selectedProduct.product.name}>
                    {loading ? <MenuItem><CircularProgress  /></MenuItem> : 
                        products.map(product => (
                            <MenuItem value={product}>{product.name}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
            <div className="qty-input">
                <TextField  
                type="number"
                name="qty"
                inputProps={{ min: '1', max: '1000', step: '1'}}
                label="Quantity" 
                variant="outlined"
                value={selectedProduct.qty} 
                onChange={handleChange}
                />
            </div>
        </div>
        </div>
            <Button 
                className="form-button" 
                type="submit" 
                color="primary"
                variant="contained">
                Create Order
            </Button>
            </form>
        </PageSurface>
        </div>
    );
};

export default OrderCreation;