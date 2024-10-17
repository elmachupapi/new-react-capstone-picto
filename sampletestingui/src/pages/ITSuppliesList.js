// src/pages/ITSuppliesList.js
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
    itemCategory: "IT Supplies",
    itemDescription: "Keyboard",
    serialNumber: "KB12345",
    quantity: "10",
    unit: "pcs",
    date: "2024-10-10",
    purpose: "Office Use",
    rfNumber: "RF-001",
  },
  {
    itemCategory: "Electronics",
    itemDescription: "Monitor",
    serialNumber: "MN56789",
    quantity: "5",
    unit: "pcs",
    date: "2024-10-11",
    purpose: "Upgrade",
    rfNumber: "RF-002",
  },
  // Add more items as needed for testing
];

const ITSuppliesList = () => {
  return (
    <Box sx={{ p: 3, backgroundColor: "#f0f4f4", minHeight: "100vh", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        IT Supplies List
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

export default ITSuppliesList;
