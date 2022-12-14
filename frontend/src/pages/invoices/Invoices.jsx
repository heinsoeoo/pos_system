import React, { useEffect } from "react";
import Dashboard from "../Dashboard";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Link, useNavigate } from "react-router-dom";
import { Add } from '@mui/icons-material';
import { Paper, Fab, Typography, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { invoiceActions } from '../../store/actions/invoice.actions';
import Chart from "../../components/Chart";
import { toast } from "react-toastify";

const headCells = [
    {
        id: 'date',
        numeric: false,
        disablePadding: false,
        label: 'Date',
    },
    {
        id: 'customer',
        numeric: false,
        disablePadding: false,
        label: 'Customer Name',
    },
    {
        id: 'sale',
        numeric: false,
        disablePadding: false,
        label: 'Sale Person',
    },
    {
        id: 'total',
        numeric: true,
        disablePadding: false,
        label: 'Total Amount',
    },
    {
        id: 'paid',
        numeric: true,
        disablePadding: false,
        label: 'Paid Amount',
    },
    {
        id: 'note',
        numeric: false,
        disablePadding: false,
        label: 'Note',
    },
];

const Invoices = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const data = useSelector((state) => state.invoice.invoiceList);
    const { loading, success, message } = useSelector((state) => state.status);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    useEffect(() => {
        if (message != null) {
            if (success) {
                toast.success(message);
            } else {
                toast.error(message)
            }
        }
    }, [success, message]);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleRowClick = (row) => {
        navigate(`/invoice/${row.id}`);
    }

    useEffect(() => {
        dispatch(invoiceActions.getInvoices());
    }, [invoiceActions.getInvoices]);
    
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    return (
    <Dashboard>
        <Grid container spacing={2}>
            <Grid item md={4} lg={4}>
                <Typography sx={{mb: '2rem'}} variant="h5">Income Graph</Typography>
                <Chart/>
            </Grid>
            
            <Grid item md={8} lg={8}>
                <Typography sx={{mb: '2rem'}} variant="h5">Invoice List</Typography>
                <Paper variant="outlined">
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={'medium'}
                        >
                            <TableHead>
                            <TableRow>
                                {headCells.map((headCell) => (
                                <TableCell
                                    key={headCell.id}
                                    align={headCell.numeric ? 'right' : 'left'}
                                    padding={headCell.disablePadding ? 'none' : 'normal'}
                                
                                >
                                    
                                    {headCell.label}
                                    
                                </TableCell>
                                ))}
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    
                                    <TableRow
                                    onClick={() => handleRowClick(row)}
                                    sx={{ cursor: 'pointer' }}
                                    hover
                                    tabIndex={-1}
                                    key={row.key}
                                    >
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                        >
                                            {row.date}
                                        </TableCell>
                                        <TableCell>{row.customer_name}</TableCell>
                                        <TableCell>{row.sale_person}</TableCell>
                                        <TableCell align="right">{row.paid? row.paid: 0}</TableCell>
                                        <TableCell align="right">{row.paid? row.paid: 0}</TableCell>
                                        <TableCell>{row.notes? row.notes: "-"}</TableCell>
                                    </TableRow>
                                );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                style={{
                                    height: (53) * emptyRows,
                                }}
                                >
                                <TableCell colSpan={6} />
                                </TableRow>
                            )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {data.length === 0 && <Typography sx={{ mt: '2rem', mb: '2rem' }} textAlign='center'>No data found</Typography>}
                    <TablePagination
                    rowsPerPageOptions={[10, 25]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Grid>

        </Grid>
            
        
        <Link to='/create-invoice'>
            <Fab color="primary" aria-label="add" sx={{position: 'fixed', bottom: '20px', right: '20px'}}>
                <Add/>
            </Fab>
        </Link>
    </Dashboard>
    );
}

export default Invoices;