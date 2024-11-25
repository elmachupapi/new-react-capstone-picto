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
import api from "../api"; // Ensure this is your API handler

const RequestLog = () => {
  const [logs, setLogs] = useState([]); // State for fetched logs
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [page, setPage] = useState(0); // State for pagination
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page for pagination

  useEffect(() => {
    // Fetch logs from the backend when the component mounts
    getRequestLogs();
  }, []);

  const getRequestLogs = async () => {
    try {
      const res = await api.get("/api/logs/request/"); // Adjust the URL if necessary
      setLogs(res.data); // Populate logs with the fetched data
    } catch (error) {
      console.error("Error fetching request logs:", error);
      alert("Failed to fetch request logs.");
    }
  };

  // Filter logs based on the search term
  const filteredLogs = logs.filter(
    log =>
      log.requestor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.request_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.admin && log.admin.toLowerCase().includes(searchTerm.toLowerCase())) // Handle null admin field
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
        sx={{ width: '400px', backgroundColor: 'white', mt: 0.1, mb: 2 }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Requestor</TableCell>
              <TableCell>RF Number</TableCell>
              <TableCell>Item Description</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Admin</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLogs
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{log.requestor}</TableCell>
                  <TableCell>{log.request_number}</TableCell>
                  <TableCell>{log.item_name}</TableCell>
                  <TableCell>
                    {new Date(log.date).toISOString().split("T")[0]} {/* Format date */}
                  </TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{log.admin || "N/A"}</TableCell> {/* Handle null admin */}
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
