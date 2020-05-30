import React, { useState, useContext } from 'react';
import {
    Select,
    MenuItem,
    FormControl,
    CircularProgress, 
    InputLabel,
    TextField
} from '@material-ui/core';
import axios from 'axios';
import AuthContext from '../../context/auth-context';

import './ProductSelector.css';

const ProductSelector = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [loading, setLoading] = useState(false);
    const { token } = useContext(AuthContext);
    
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
        fetchProducts()
        // setProduct(event.target.value);
    }
    const handleChange = event => {
        setSelectedProduct(event.target.value);
    }
    return(
        <div className="product-selection">
        <FormControl variant="outlined" className="product-selection-form">
        <InputLabel>Select Product</InputLabel>
            <Select
                label="product-select"
                id="product-select"
                onOpen={handleOpen}
                onChange={handleChange}
                value={selectedProduct}>
                {loading ? <MenuItem><CircularProgress  /></MenuItem> : 
                    products.map(product => (
                        <MenuItem value={product.id}>{product.name}</MenuItem>
                    ))
                }
            </Select>
        </FormControl>
        <div className="qty-input">
            <TextField  type="number" label="Quantity" variant="outlined" />
        </div>
        </div>
    );
};

export default ProductSelector;