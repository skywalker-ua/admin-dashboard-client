import React, { useState, useContext, useReducer } from 'react';
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

const ProductSelector = (props) => {
    
    const [products, setProducts] = useState([]);

    const [selectedProduct, setSelectedProduct] = useReducer(
        (selectedProduct, newState) => ({...selectedProduct, ...newState}),
        {
            product: {},
            qty: ''
        }
    )

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
        const value = event.target.value;
        const name = event.target.name;
        setSelectedProduct({
            [name]: value
        });
    }

    return(
        <div className="product-selection">
        {selectedProduct.product.imgUrl && 
            <div className="selected-item-img">
                <img alt={selectedProduct.product.name} className="selection-image" src={selectedProduct.product.imgUrl} />
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
    );
};

export default ProductSelector;