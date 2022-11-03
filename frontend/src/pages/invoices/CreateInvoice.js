import { Avatar, Box, Button, Divider, Grid, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Paper, Stack, styled, TextField, Typography } from "@mui/material";
import Dashboard from "../Dashboard";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import mockProducts from '../../mocks/products.json';
import { useState } from "react";
import { ArrowBack, Error } from "@mui/icons-material";
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import { invoiceActions } from "../../store/actions/invoice.actions";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.grey[700],
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));

const headCells = [
    {
        id: 'image',
        numeric: false,
        disablePadding: false,
        label: 'Image',
    },
    {
        id: 'product',
        numeric: false,
        disablePadding: false,
        label: 'Product',
    },
    {
        id: 'qty',
        numeric: true,
        disablePadding: false,
        label: 'Quantity',
    },
    {
        id: 'price',
        numeric: true,
        disablePadding: false,
        label: 'Price',
    },
];

const { products } = mockProducts;

const CreateInvoice = () => {
    const [productList, setProductList] = useState(products);
    const [cartProducts, setCartProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {register, handleSubmit, formState: { errors }} = useForm();

    const filterProducts = (event) => {
        if (event.target.value === '') {
            setProductList(products);
        } else {
            const filtered = products.filter(product => product.name.toLowerCase().includes(event.target.value.toLowerCase()));
            if (filtered.length === 0) {
                setProductList([{
                    "key": 'no-data',
                    "name": "Sorry!",
                    "image": "",
                    "qty": '',
                    "price": "No Result Found"
                }]);
            } else {
                setProductList(filtered);
            }
        }
    }

    const handleProductAdd = async (product) => {
        const index = cartProducts.findIndex(element => element.key === product.key);
        if (index > -1) {
            const existing = cartProducts[index];
            if (existing.qty < product.qty) {
                await cartProducts.splice(index, 1);
                setCartProducts([...cartProducts, {...product, qty: ++existing.qty, price: (existing.price+product.price)}]);
                setTotal(total+product.price);
            } else {
                toast.error("Sorry! not enough stock for the product");
            }
        } else {
            setCartProducts([...cartProducts, {...product, qty: 1}]);
            setTotal(total+product.price);
        }
    }

    const createInvoice = async (data) => {
        if (cartProducts.length > 0) {
            // await dispatch(invoiceActions.createInvoice(data));
        }
    }

    return (
        <Dashboard>
            <ToastContainer autoClose={500}/>
            <Stack direction="row" spacing={2}>
                <Button onClick={() => navigate(-1)} startIcon={<ArrowBack />}>
                    Back
                </Button>
            </Stack>
            <Divider sx={{ maxWidth: '14rem'}}/>
            <Typography sx={{mb: '2rem'}} variant="h4">Create Invoice</Typography>
            <Box component="form" autoComplete='off' onSubmit={handleSubmit(createInvoice)}>
                <Grid container spacing={2} sx={{mb: '1rem'}}>
                    <Grid item lg={6} md={6} sm={6}>
                        <TextField 
                        fullWidth
                        name="customer_name"
                        label="Customer Name*"
                        {...register('customer_name', {required:true})}
                        error={errors['customer_name']? true: false}
                        helperText={errors['customer_name']? "Customer Name is required": ""}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={6}>
                        <TextField 
                        fullWidth
                        name="sale_person"
                        label="Sale Person*"
                        {...register('sale_person', {required:true})}
                        error={errors['sale_person']? true: false}
                        helperText={errors['sale_person']? "Sale Person is required": ""}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item lg={7} md={7} sm={7}>
                    <TableContainer component={Paper} variant='outlined' sx={{ height: '480px', maxHeight: '480px' }}>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={'medium'}
                        >
                            <TableHead>
                                <TableRow>
                                    {headCells.map((headCell) => (
                                    <StyledTableCell
                                        key={headCell.id}
                                        align={headCell.numeric ? 'right' : 'left'}
                                        padding={headCell.disablePadding ? 'none' : 'normal'}
                                    
                                    >
                                        {headCell.label}
                                    </StyledTableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cartProducts.map(product => (
                                    <TableRow
                                    hover
                                    tabIndex={-1}
                                    key={product.key}
                                    >
                                        <TableCell
                                            component="th"
                                            scope="row"
                                        >
                                            <Avatar src={product.image}/>
                                        </TableCell>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell align="right">{product.qty}</TableCell>
                                        <TableCell align="right">{product.price}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Grid container sx={{ mt: '2rem'}}>
                        <Grid item md={6}>
                            <Typography variant='h6'>Total</Typography>
                        </Grid>
                        <Grid item md={6}>
                            <Typography textAlign='right' variant="h6">{total} MMK</Typography>
                        </Grid>
                    </Grid>
                    </Grid>
                    <Grid item lg={5} md={5} sm={5}>
                        <TextField 
                        fullWidth
                        label="Search Products"
                        onChange={filterProducts}/>
                        <Paper variant="outlined" sx={{mt: '1rem'}}>
                            <List sx={{ width: '100%', bgcolor: 'background.paper', maxHeight: '400px', overflow: 'scroll' }}>
                                    {productList.map((product) => (
                                        (product.key === 'no-data')?
                                        <ListItem key={product.key}>
                                            <ListItemButton disabled>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <Error/>
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={product.name} secondary={`${product.price}`} />
                                            </ListItemButton>
                                        </ListItem>
                                        :
                                        <ListItem key={product.key}>
                                            <ListItemButton onClick={() => handleProductAdd(product)}>
                                                <ListItemAvatar>
                                                    <Avatar src={product.image}/>
                                                </ListItemAvatar>
                                                <ListItemText primary={product.name} secondary={`${product.price} MMK`} />
                                                <ListItemText align='right' primary={`Qty: ${product.qty}`} />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                            </List>
                        </Paper>
                        <TextField 
                        sx={{ mt: '2rem' }}
                        multiline
                        fullWidth
                        rows={4}
                        name='note'
                        label='Notes (Optional)'
                        />
                        <Button disabled={(cartProducts.length === 0)? true: false} sx={{ mt: '2rem', mb: '4rem'}} fullWidth variant='contained' type='submit'>Save</Button>
                    </Grid>
                </Grid>
            </Box>
        </Dashboard>
    )
}

export default CreateInvoice;