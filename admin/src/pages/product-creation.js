import React, { useState, useReducer, useEffect } from 'react';
import Input from '../components/Input';
import PageSurface from '../components/PageSurface';
import axios from 'axios';
import { Button } from '@material-ui/core';

const ProductCreation = () => {

    // Create outsourced hook!!
    const [formValue, setFormValue] = useReducer(
        (formValue, newState) => ({ ...formValue, ...newState}),
        {
            id: '',
            imgUrl: '',
            sku: '',
            category: '',
            price: '',
            qty: ''
        }
    );


    const formSubmitHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:5000/products/create',
        {
            product: JSON.stringify(formValue)
        })
            .then(response => console.log(response))
            .catch(err => console.log(err));
    }

    const handleInputChange = e => {
        const value = e.target.value;
        const name = e.target.name;
        setFormValue({
            [name]: value
        })
    }

    return(
        <PageSurface title="Create new Product">
            <form className="product-creation__form" onSubmit={formSubmitHandler}>
                <Input name="id" onChange={handleInputChange} value={formValue.id} label="ID" variant="outlined" type="number" />
                <Input name="imgUrl" onChange={handleInputChange} value={formValue.imgUrl} label="Image Url" variant="outlined" type="text" />
                <Input name="sku" onChange={handleInputChange} value={formValue.sku} label="SKU" variant="outlined" type="number" />
                <Input name="category" onChange={handleInputChange} value={formValue.category} label="Category" variant="outlined" type="text" />
                <Input name="price" onChange={handleInputChange} value={formValue.price} label="Price" variant="outlined" type="number" />
                <Input name="qty" onChange={handleInputChange} value={formValue.qty} label="Quantity" variant="outlined" type="number" />
                <Button type="submit" color="primary" variant="contained">Create</Button>
            </form>
        </PageSurface>
    );
};

export default ProductCreation;