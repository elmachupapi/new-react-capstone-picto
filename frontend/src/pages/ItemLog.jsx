import React, { useState } from 'react';
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
  TextField,
  TablePagination,
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

  // State for search term
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Handle search
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0); // Reset to the first page on search
  };

  // Filter logs based on search term
  const filteredLogs = logs.filter((log) =>
    log.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle pagination change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when changing rows per page
  };

  // Get current logs to display
  const currentLogs = filteredLogs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ p: 3, backgroundColor: '#f0f4f4', minHeight: '100vh', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Item Logs
      </Typography>
      <TextField
        label="Search by Item Name"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ mb: 2, width: '400px', backgroundColor: 'white' }}
      />
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
            {currentLogs.map((log, index) => (
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
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredLogs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default ItemLog;
