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

const RequestLog = () => {
  // Sample data for request logs
  const logs = [
    {
      requestor: 'User1',
      requestNumber: 'REQ-001',
      date: '2024-10-10',
      action: 'Request Created',
      admin: 'Admin1',
    },
    {
      requestor: 'User2',
      requestNumber: 'REQ-002',
      date: '2024-10-11',
      action: 'Request Approved',
      admin: 'Admin2',
    },
    {
      requestor: 'User3',
      requestNumber: 'REQ-003',
      date: '2024-10-12',
      action: 'Request Denied',
      admin: 'Admin3',
    },
    {
      requestor: 'User4',
      requestNumber: 'REQ-004',
      date: '2024-10-13',
      action: 'Request Created',
      admin: 'Admin4',
    },
  ];

  // State for search term and pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Filter logs based on the search term
  const filteredLogs = logs.filter(
    log =>
      log.requestor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.requestNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.admin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle pagination change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#f0f4f4', minHeight: '100vh', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Request Logs
      </Typography>
      {/* Search Input */}
      <TextField
        label="Search by Requestor, Request Number, or Admin"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{width: '400px', backgroundColor: 'white', mt: .1, mb: 2 }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Requestor</TableCell>
              <TableCell>Request Number</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Admin</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLogs
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((log) => (
                <TableRow key={log.requestNumber}>
                  <TableCell>{log.requestor}</TableCell>
                  <TableCell>{log.requestNumber}</TableCell>
                  <TableCell>{log.date}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{log.admin}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Pagination Component */}
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

export default RequestLog;
