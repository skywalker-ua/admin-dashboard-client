import React, { useState, useReducer } from 'react';
import Input from '../components/Input';
import PageSurface from '../components/PageSurface';
import { Button } from '@material-ui/core';

const ProductCreation = () => {
    // Create outsourced hook!!
    const [formValue, setFormValue] = useReducer(
        (state, newState) => ({ ...state, ...newState}),
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
        console.log(formValue)
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