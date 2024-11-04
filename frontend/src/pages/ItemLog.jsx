import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const ItemLog = () => {
  // Sample data for item logs
  const logs = [
    {
      itemName: 'Laptop',
      date: '2024-10-10',
      action: 'Request Created',
      currentQuantity: 15,
    },
    {
      itemName: 'Mouse',
      date: '2024-10-11',
      action: 'Request Created',
      currentQuantity: 50,
    },
    {
      itemName: 'Printer',
      date: '2024-10-12',
      action: 'Request Created',
      currentQuantity: 5,
    },
    {
      itemName: 'Broom',
      date: '2024-10-13',
      action: 'Request Denied',
      currentQuantity: 100,
    },
  ];

  return (
    <Box sx={{ p: 3, backgroundColor: '#f0f4f4', minHeight: '100vh', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Item Logs
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Current Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map((log, index) => (
              <TableRow key={index}>
                <TableCell>{log.itemName}</TableCell>
                <TableCell>{log.date}</TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell>{log.currentQuantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ItemLog;
