import React, { useState, useEffect } from 'react';
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
import api from '../api'; // Make sure this is configured for your backend API

const ItemLog = () => {
  const [logs, setLogs] = useState([]); // State for item logs
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [page, setPage] = useState(0); // Current page for pagination
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page for pagination

  // Fetch item logs from the backend
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await api.get('/api/logs/item/'); // Replace with your actual endpoint
        setLogs(response.data); // Update state with fetched logs
      } catch (error) {
        console.error('Error fetching item logs:', error);
      }
    };

    fetchLogs();
  }, []);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0); // Reset to the first page when searching
  };

  // Filter logs based on the search term
  const filteredLogs = logs.filter((log) =>
    log.item_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle pagination page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when changing rows per page
  };

  // Get the current logs to display based on pagination
  const currentLogs = filteredLogs.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split('T')[0];
  };

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
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentLogs.map((log, index) => (
              <TableRow key={index}>
                <TableCell>{log.item_name}</TableCell>
                <TableCell>{formatDate(log.date)}</TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell>{log.current_quantity}</TableCell>
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
