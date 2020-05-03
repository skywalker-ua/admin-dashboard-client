import React, { useState, useEffect } from 'react';
import { 
    Table,
    TableBody,
    TableCell,
    TableContainer ,
    Paper,
    TableHead,
    TableRow,
    IconButton,
    Button,
    Popover,
    List,
    ListItem,
    ListItemText,
    ListItemIcon
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import NavLink from '../../components/Link/index';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';

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
    const [products, setProducts] = useState([]);
    const [loading, setLoading ] = useState(false);
    
    async function fetchProductData() {
        setLoading(true);
        await axios.get('http://localhost:5000/products')
            .then(res => {
                setLoading(false);
                setProducts(res.data);
            })
            .catch(err => {
                setLoading(false);
                console.log(err)
            });
    }

    useEffect(() => {
        fetchProductData();
    }, [])

    const [anchorEl, setAnchorEl] = useState(null);
    const [productId, setProductId] = useState(null);
    
    const handleClose = () => {
        setAnchorEl(null);
    }
    const handleClick = (event, id) => {
        setProductId(id);
        setAnchorEl(event.currentTarget);
    }
    const handleIconClick = (event, action) => {
        if (action === 'delete') {
            axios.post(`http://localhost:5000/products/delete`,
            { data: { prodId: productId } })
                .then(res => {
                    fetchProductData();
                })
                .catch(err => console.log(err));
        }
        setAnchorEl(null);
    }
    const open = Boolean(anchorEl);
    return(
        <div className="products-page">
        {loading ? <Spinner /> :
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
                                    <IconButton onClick={(event) => handleClick(event, product.id)}>
                                        <MoreVertIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </ProductTable>
            </TableContainer>
            <Popover
                id="edit-menu"
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}>
                <List dense>
                    <NavLink href={'/products/' + productId}>
                        <ListItem button onClick={handleIconClick} >
                            <ListItemIcon  >
                                <EditIcon />
                            </ListItemIcon>
                            <ListItemText primary="Edit" />
                        </ListItem>
                    </NavLink>
                    <ListItem button onClick={(event) => handleIconClick(event, 'delete')} >
                        <ListItemIcon >
                            <DeleteIcon color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary="Delete" />
                    </ListItem>
                </List>
             </Popover>
            </React.Fragment>
            }
        </div>
    );
};

export default Products;