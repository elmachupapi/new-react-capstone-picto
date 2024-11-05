// src/pages/UserRequest.js
import React, { useState } from "react";
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
  Button,
  TextField,
  TablePagination,
} from "@mui/material";

const UserRequest = () => {
  // Sample data for the user requests
  const requests = [
    { itemName: "Laptop", requestNumber: "REQ-001", dateRequested: "2024-10-10" },
    { itemName: "Mouse", requestNumber: "REQ-002", dateRequested: "2024-10-11" },
    { itemName: "Printer", requestNumber: "REQ-003", dateRequested: "2024-10-12" },
    { itemName: "Broom", requestNumber: "REQ-004", dateRequested: "2024-10-13" },
  ];

  // State for search term, pagination, and rows per page
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Function to handle approval
  const handleApprove = (requestNumber) => {
    console.log(`Approved request: ${requestNumber}`);
    // Add additional logic for approving here
  };

  // Function to handle denial
  const handleDeny = (requestNumber) => {
    console.log(`Denied request: ${requestNumber}`);
    // Add additional logic for denial here
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0); // Reset to the first page on search
  };

  // Filter requests based on the search term
  const filteredRequests = requests.filter((request) =>
    request.itemName.toLowerCase().includes(searchTerm.toLowerCase())
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

  // Get the current requests to display
  const currentRequests = filteredRequests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ p: 3, backgroundColor: "#f0f4f4", minHeight: "100vh", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        User Requests
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
              <TableCell>Item Name</TableCell>
              <TableCell>Request Number</TableCell>
              <TableCell>Date Requested</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRequests.map((request) => (
              <TableRow key={request.requestNumber}>
                <TableCell>{request.itemName}</TableCell>
                <TableCell>{request.requestNumber}</TableCell>
                <TableCell>{request.dateRequested}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleApprove(request.requestNumber)}
                    sx={{ mr: 1 }}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeny(request.requestNumber)}
                  >
                    Deny
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredRequests.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default UserRequest;
