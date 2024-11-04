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
} from "@mui/material";

const RequestList = () => {
  // Sample data for the request list with status
  const requests = [
    { itemName: "Laptop", requestNumber: "REQ-001", dateRequested: "2024-10-10", status: "Approved" },
    { itemName: "Mouse", requestNumber: "REQ-002", dateRequested: "2024-10-11", status: "Pending" },
    { itemName: "Printer", requestNumber: "REQ-003", dateRequested: "2024-10-12", status: "Denied" },
    { itemName: "Broom", requestNumber: "REQ-004", dateRequested: "2024-10-13", status: "Pending" },
  ];

  return (
    <Box sx={{ p: 3, backgroundColor: "#f0f4f4", minHeight: "100vh", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Request List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item Name</TableCell>
              <TableCell>Request Number</TableCell>
              <TableCell>Date Requested</TableCell>
              <TableCell>Status</TableCell> {/* New Status column */}
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.requestNumber}>
                <TableCell>{request.itemName}</TableCell>
                <TableCell>{request.requestNumber}</TableCell>
                <TableCell>{request.dateRequested}</TableCell>
                <TableCell>{request.status}</TableCell> {/* Display the status */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RequestList;
