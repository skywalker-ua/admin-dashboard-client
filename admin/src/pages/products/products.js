import React, { useEffect, useState } from 'react';
import { 
    Table,
    TableBody,
    TableCell,
    TableContainer ,
    Paper,
    TableHead,
    TableRow,
    IconButton,
    Button
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import NavLink from '../../components/Link/index';
import Spinner from '../../components/Spinner';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';
// import products from '../constants/products.json';

const ProductTable = styled(Table)({
    overflow: 'auto'
})

const HeaderRows =  [
    {id: 1, title: 'Id'},
    {id: 2, title: ''},
    {id: 3, title: 'Name'},
    {id: 4, title: 'SKU'},
    {id: 5, title: 'Category'},
    {id: 6, title: 'Price'},
    {id: 7, title: 'Availability'},
    {id: 8, title: 'Quantity'},
    {id: 9, title: 'Sold'},
    {id: 10, title: ''}
]

const Products = () => {
    const [loading, isLoading] = useState(true);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        isLoading(true);
            axios.get('http://localhost:5000/products')
            .then(res => {
                setProducts(res.data)
                isLoading(false)
            })
            .catch(err => console.log(err));
    }, [])

    return(
        <div className="products-page">
            {loading ? <Spinner/> : 
            <React.Fragment>
            <Button variant="contained" color="secondary"><NavLink href="/products/new" >Create New</NavLink></Button>
            <TableContainer component={Paper} >
                <ProductTable size="small" stickyHeader>
                    <TableHead>
                        <TableRow>
                            {HeaderRows.map(row => (
                                <TableCell key={row.id}>{row.title}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                   
                    <TableBody>
                        {products.map(product => (
                            <TableRow key={product.id}>
                                <TableCell>{product.id}</TableCell>
                                <TableCell>
                                    <img className="product-image" src={product.imgUrl} alt={product.name} />
                                </TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.sku}</TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{product.avb}</TableCell>
                                <TableCell>{product.quantity}</TableCell>
                                <TableCell>{product.sold}</TableCell>
                                <TableCell>
                                    <IconButton>
                                        <NavLink href={'/products/' + product.id}>
                                            <EditIcon />
                                        </NavLink>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </ProductTable>
            </TableContainer>
            </React.Fragment>
            }
        </div>
    );
};

export default Products;