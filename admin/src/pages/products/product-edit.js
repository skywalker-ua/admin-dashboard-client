import React, { useReducer, useEffect } from 'react';
import {
    Button
} from '@material-ui/core';
import Input from '../../components/Input';
import PageSurface from '../../components/PageSurface';
import useHttpRequest from '../../hooks/http';
import { useParams } from 'react-router-dom';

const ProductEdit = (props) => {

    const { productId } = useParams();

    const productValues = useHttpRequest(`http://localhost:5000/products/${productId}`, 'GET');

    useEffect(() => {
        console.log(productValues);
        if (productValues) {
            setFormValue({
                id: productValues.id,
                name: productValues.name,
                imgUrl: productValues.imgUrl,
                sku: productValues.sku,
                category: productValues.category,
                price: productValues.price,
                qty: productValues.quantity
            })
        }
    }, [productValues])

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
    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormValue({
            [name]: value
        })
    }

    return(
        <PageSurface title={'Edit product'}>
            <form className="product-edit__form" >
                <Input name="id" onChange={handleInputChange} value={formValue.id} label="ID" variant="outlined" type="number" />
                <Input name="name" onChange={handleInputChange} value={formValue.name} label="Name" variant="outlined" type="text" />
                <Input name="imgUrl" onChange={handleInputChange} value={formValue.imgUrl} label="Image Url" variant="outlined" type="text" />
                <Input name="sku" onChange={handleInputChange} value={formValue.sku} label="SKU" variant="outlined" type="number" />
                <Input name="category" onChange={handleInputChange} value={formValue.category} label="Category" variant="outlined" type="text" />
                <Input name="price" onChange={handleInputChange} value={formValue.price} label="Price" variant="outlined" type="number" />
                <Input name="qty" onChange={handleInputChange} value={formValue.qty} label="Quantity" variant="outlined" type="number" />
                <Button className="form-button" type="submit" color="primary" variant="contained">Edit</Button>
            </form>
        </PageSurface>
    );
};

export default ProductEdit;