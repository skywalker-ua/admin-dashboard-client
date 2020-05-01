import React, { useReducer } from 'react';
import {
    Button
} from '@material-ui/core';
import Input from '../../components/Input';
import PageSurface from '../../components/PageSurface';

import { useParams } from 'react-router-dom';

const ProductEdit = (props) => {
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

    const { productId } = useParams();
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
                <Button type="submit" color="primary" variant="contained">Edit</Button>
            </form>
        </PageSurface>
    );
};

export default ProductEdit;