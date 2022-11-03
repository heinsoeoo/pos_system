import React, { useEffect } from "react";
import Dashboard from "../Dashboard";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { invoiceActions } from '../../store/actions/invoice.actions';

const headCells = [
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
    }
];

function createData(customer, sale, paid, note) {
    return {
        customer,
        sale,
        paid,
        note,
    };
  }

// const data = [
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Donut', 452, 25.0, 51, 4.9),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
//     createData('Honeycomb', 408, 3.2, 87, 6.5),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Jelly Bean', 375, 0.0, 94, 0.0),
//     createData('KitKat', 518, 26.0, 65, 7.0),
//     createData('Lollipop', 392, 0.2, 98, 0.0),
//     createData('Marshmallow', 318, 0, 81, 2.0),
//     createData('Nougat', 360, 19.0, 9, 37.0),
//     createData('Oreo', 437, 18.0, 63, 4.0),
//   ];

const Invoices = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const dispatch = useDispatch();
    const data = useSelector((state) => state.invoice.invoiceList);
    console.log(data);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        dispatch(invoiceActions.getInvoices());
    }, [invoiceActions.getInvoices]);
    
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

        console.log(emptyRows);

    return (
    <Dashboard>
        <Box sx={{ maxWidth: "90vw", margin: 'auto', mt: "3rem"}}>
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
                                hover
                                tabIndex={-1}
                                key={row.key}
                                >
                                    <TableCell
                                        component="th"
                                        id={labelId}
                                        scope="row"
                                    >
                                        {row.customer_name}
                                    </TableCell>
                                    <TableCell>{row.sale_person}</TableCell>
                                    <TableCell align="right">{row.total? row.total: 0}</TableCell>
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
        </Box>
    </Dashboard>
    );
}

export default Invoices;