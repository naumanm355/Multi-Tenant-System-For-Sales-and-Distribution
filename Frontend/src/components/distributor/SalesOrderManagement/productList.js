import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
    table: {
        width: '100%',
    },
});

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0),
    createData('Ice cream sandwich', 237, 9.0),
    createData('Eclair', 262, 16.0),
    createData('Cupcake', 305, 3.7),
    createData('Gingerbread', 356, 16.0),
];

export default function DenseTable(props) {
    const classes = useStyles();
    //alert("so product list length is" + props.customerOrderItemslist.length)
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} >
                <TableHead>
                    <TableRow>
                        <TableCell>Product Name</TableCell>
                        <TableCell align="right">Category</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">SubTotal</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.customerOrderItemslist.map(row => (
                        <TableRow key={row.productObj.id}>
                            <TableCell component="th" scope="row">
                                {row.productObj.name}
                            </TableCell>
                            <TableCell align="right">{row.productObj.category}</TableCell>
                            <TableCell align="right">{row.productObj.price}</TableCell>
                            <TableCell align="right">{row.orderProd.qty}</TableCell>
                            <TableCell align="right">{row.productObj.price * row.orderProd.qty}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
