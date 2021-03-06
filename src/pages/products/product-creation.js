import React, { useState, useReducer, useContext } from 'react';
import Input from '../../components/Input';
import PageSurface from '../../components/PageSurface';
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core';
import AuthContext from '../../context/auth-context';

const ProductCreation = () => {

    // Create outsourced hook!!
    const [formValue, setFormValue] = useReducer(
        (formValue, newState) => ({ ...formValue, ...newState}),
        {
            id: '',
            name: '',
            imgUrl: '',
            sku: '',
            category: '',
            price: '',
            qty: ''
        }
    );
    let history = useHistory();
    const { token } = useContext(AuthContext);
    const formSubmitHandler = e => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API}/products/create`,
        {
            product: JSON.stringify(formValue)
        },
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        },)
            .then(response => {
                console.log(response);
                history.push('/products');
            })
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
        <div className="page-product">
            <PageSurface title="Create new Product">
                <form className="product-creation__form" onSubmit={formSubmitHandler}>
                    <Input name="id" onChange={handleInputChange} value={formValue.id} label="ID" variant="outlined" type="number" />
                    <Input name="name" onChange={handleInputChange} value={formValue.name} label="Name" variant="outlined" type="text" />
                    <Input name="imgUrl" onChange={handleInputChange} value={formValue.imgUrl} label="Image Url" variant="outlined" type="text" />
                    <Input name="sku" onChange={handleInputChange} value={formValue.sku} label="SKU" variant="outlined" type="number" />
                    <Input name="category" onChange={handleInputChange} value={formValue.category} label="Category" variant="outlined" type="text" />
                    <Input name="price" onChange={handleInputChange} value={formValue.price} label="Price" variant="outlined" type="number" />
                    <Input name="qty" onChange={handleInputChange} value={formValue.qty} label="Quantity" variant="outlined" type="number" />
                    <Button className="form-button" type="submit" color="primary" variant="contained">Create</Button>
                </form>
            </PageSurface>
        </div>
    );
};

export default ProductCreation;