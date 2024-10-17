// src/pages/OfficeList.js
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

const OfficeList = () => {
  // Sample data for the submitted requests
  const requests = [
    {
      itemCategory: "Electronics",
      itemDescription: "Laptop",
      serialNumber: "SN12345",
      quantity: 2,
      unit: "pcs",
      date: "2024-10-10",
      purpose: "Office Use",
      rfNumber: "RF001",
    },
    {
      itemCategory: "IT Supplies",
      itemDescription: "Mouse",
      serialNumber: "SN67890",
      quantity: 10,
      unit: "pcs",
      date: "2024-10-11",
      purpose: "Stock Replenishment",
      rfNumber: "RF002",
    },
    // Add more items here if needed
  ];

  return (
    <Box sx={{ p: 3, backgroundColor: "#f0f4f4", minHeight: "100vh", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Office List
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
            {requests.map((request, index) => (
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

export default OfficeList;
