import React, { useReducer, useEffect, useState } from 'react';
import {
    Button
} from '@material-ui/core';
import Input from '../../components/Input';
import PageSurface from '../../components/PageSurface';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const ProductEdit = (props) => {
    let history = useHistory();
    const { productId } = useParams();
    const [productValues, setProduct] = useState([])

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

    async function fetchProductData() {
        await axios.get(`${process.env.REACT_APP_API}/products/${productId}`)
            .then(res => {
                setProduct(res.data);
            })
            .catch(err => console.log(err));
    }

    function updateProductData() {
        axios.patch(`${process.env.REACT_APP_API}/products/update`,
        { data: { formData: formValue } } )
            .then(res => {
                if (res.data.edited) {
                    history.push('/products');
                }
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        fetchProductData();
    }, [])

    useEffect(() => {
        setFormValue({
            id: productValues.id,
            name: productValues.name,
            imgUrl: productValues.imgUrl,
            sku: productValues.sku,
            category: productValues.category,
            price: productValues.price,
            qty: productValues.quantity
        })
    }, [productValues])

    const handleFormSubmit = (e) => {
        e.preventDefault();
        updateProductData();
    }

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormValue({
            [name]: value
        })
    }

    return(
        <PageSurface title={'Edit product'}>
            <form className="product-edit__form" onSubmit={handleFormSubmit} >
                <Input label="ID" value={formValue.id} onChange={handleInputChange} name="id" variant="outlined" type="number" />
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