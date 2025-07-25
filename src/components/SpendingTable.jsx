import { useState, useRef, useEffect } from 'react';


function SpendingTable({ data, onDeleteRecord }) {
    console.log('Spending Data:', data);


    return (
        <>
            <table>
                <thead>
                    <tr>
                        
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.amount}฿</td>
                            <td>{item.date}</td>
                            <td>{item.category}</td>
                            <td>{item.description}</td>
                            <td>
                                <button onClick={() => onDeleteRecord(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default SpendingTable;