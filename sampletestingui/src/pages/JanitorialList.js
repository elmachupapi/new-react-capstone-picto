// src/pages/JanitorialSupplies.js
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

// Sample data structure to simulate submitted requests (replace this with real data management in a full app)
const sampleSubmittedRequests = [
  {
    itemCategory: "Janitorial Supplies",
    itemDescription: "Mop",
    serialNumber: "MOP12345",
    quantity: "20",
    unit: "pcs",
    date: "2024-10-10",
    purpose: "Cleaning",
    rfNumber: "RF-003",
  },
  {
    itemCategory: "Janitorial Supplies",
    itemDescription: "Broom",
    serialNumber: "BRM56789",
    quantity: "15",
    unit: "pcs",
    date: "2024-10-11",
    purpose: "Cleaning",
    rfNumber: "RF-004",
  },
  // Add more items as needed for testing
];

const JanitorialSupplies = () => {
  return (
    <Box sx={{ p: 3, backgroundColor: "#f0f4f4", minHeight: "100vh", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Janitorial Supplies List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item Category</TableCell>
              <TableCell>Item Description</TableCell>
              <TableCell>Serial Number</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Purpose</TableCell>
              <TableCell>RF Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sampleSubmittedRequests.map((request, index) => (
              <TableRow key={index}>
                <TableCell>{request.itemCategory}</TableCell>
                <TableCell>{request.itemDescription}</TableCell>
                <TableCell>{request.serialNumber}</TableCell>
                <TableCell>{request.quantity}</TableCell>
                <TableCell>{request.unit}</TableCell>
                <TableCell>{request.date}</TableCell>
                <TableCell>{request.purpose}</TableCell>
                <TableCell>{request.rfNumber}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default JanitorialSupplies;
