import { Grid, Paper, Typography, styled, Avatar, Button, Box, Stack, Divider } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ArrowBack } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import Dashboard from "../Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { invoiceActions } from "../../store/actions/invoice.actions";
import { useEffect } from "react";

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

const data = [];

export default function InvoiceDetail() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const invoice = useSelector((state) => state.invoice.invoice);

    useEffect(() => {
        dispatch(invoiceActions.getInvoice(params.id));
    }, [invoiceActions.getInvoice]);

    const handleDelete = () => {
        dispatch(invoiceActions.deleteInvoice(params.id));
        navigate('/app');
    }

    return (
        <Dashboard>
            <Grid container spacing={2}>
                <Grid item md={6} lg={6}>
                    <Button onClick={() => navigate(-1)} startIcon={<ArrowBack />}>
                        Back
                    </Button>
                </Grid>
                <Grid sx={{ textAlign: 'right' }} item md={6} lg={6}>
                    <Button onClick={handleDelete} color="error" variant='outlined'>Delete Invoice</Button>
                </Grid>
            </Grid>
            <Divider sx={{ maxWidth: '5rem', mb: '2rem'}}/>
            <Paper variant="outlined">
                <Typography sx={{pt: '2rem', pb: '2rem', mb:'2rem', bgcolor: 'black', color: 'white'}} textAlign="center" variant="h5">Invoice Detail</Typography>
                <Grid sx={{margin: 'auto'}} container spacing={2}>
                    <Grid item md={6} lg={6}>
                        <Grid container spacing={2}>
                        <Grid item md={6} lg={6}>
                                <Typography textAlign="right" variant="body1">Customer Name :</Typography>
                            </Grid>
                            <Grid item md={6} lg={6}>
                                <Typography textAlign="left" variant="body1">{invoice.customer_name}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={6} lg={6}>
                        <Grid container spacing={2}>
                            <Grid item md={6} lg={6}>
                                <Typography textAlign="right" variant="body1">Date :</Typography>
                            </Grid>
                            <Grid item md={6} lg={6}>
                                <Typography textAlign="left" variant="body1">{invoice.date}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={6} lg={6}>
                        <Grid container spacing={2}>
                        <Grid item md={6} lg={6}>
                                <Typography textAlign="right" variant="body1">Sale Person :</Typography>
                            </Grid>
                            <Grid item md={6} lg={6}>
                                <Typography textAlign="left" variant="body1">{invoice.sale_person}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={6} lg={6}>
                        <Grid container spacing={2}>
                        <Grid item md={6} lg={6}>
                                <Typography textAlign="right" variant="body1">Note :</Typography>
                            </Grid>
                            <Grid item md={6} lg={6}>
                                <Typography textAlign="left" variant="body1">{invoice.note}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <TableContainer sx={{ height: '480px', maxHeight: '480px', mt: '2rem' }}>
                        <Table
                            sx={{ minWidth: 500 }}
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
                                {invoice?.products?.map(product => (
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
                                <TableRow>
                                    <TableCell align="right" colSpan={3}>Total</TableCell>
                                    <TableCell align="right">{invoice.paid}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
            </Paper>
            <Box sx={{ height: '2rem' }}>
            </Box>
        </Dashboard>
    )

}