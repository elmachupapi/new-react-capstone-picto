// src/pages/UserRequest.js
import React from "react";
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
} from "@mui/material";

const UserRequest = () => {
  // Sample data for the user requests
  const requests = [
    { itemName: "Laptop", requestNumber: "REQ-001", dateRequested: "2024-10-10" },
    { itemName: "Mouse", requestNumber: "REQ-002", dateRequested: "2024-10-11" },
    { itemName: "Printer", requestNumber: "REQ-003", dateRequested: "2024-10-12" },
    { itemName: "Broom", requestNumber: "REQ-004", dateRequested: "2024-10-13" },
  ];

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

  return (
    <Box sx={{ p: 3, backgroundColor: "#f0f4f4", minHeight: "100vh", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        User Requests
      </Typography>
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
            {requests.map((request) => (
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
    </Box>
  );
};

export default UserRequest;
