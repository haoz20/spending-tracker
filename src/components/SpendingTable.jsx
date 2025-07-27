import {useState, useRef, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button} from "@mui/material";

function SpendingTable({data, onDeleteRecord}) {
    console.log('Spending Data:', data);


    return (
        <>
            <h3>Spending Record</h3>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {data.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.spending_id}</TableCell>
                            <TableCell>{item.amount}฿</TableCell>
                            <TableCell>{item.date}</TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>
                                <Button onClick={() => onDeleteRecord(index)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default SpendingTable;