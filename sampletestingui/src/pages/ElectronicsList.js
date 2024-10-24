// src/pages/ElectronicsList.js
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
} from "@mui/material";

const ElectronicsList = () => {
  // Sample data to represent submitted items (could be replaced with data from context or props)
  const [electronicsData, setElectronicsData] = useState([
    {
      itemCategory: "Electronics",
      itemDescription: "Laptop",
      quantity: 5,
      unit: "pcs",
      date: "2024-10-12",
      rfNumber: "RF-001",
    },
    {
      itemCategory: "Electronics",
      itemDescription: "Projector",
      quantity: 2,
      unit: "pcs",
      date: "2024-10-13",
      rfNumber: "RF-002",
    },
  ]);

  return (
    <Box sx={{ p: 3, backgroundColor: "#f0f4f4", minHeight: "100vh", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Electronics List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item Category</TableCell>
              <TableCell>Item Description</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>RF Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {electronicsData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.itemCategory}</TableCell>
                <TableCell>{item.itemDescription}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.unit}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.rfNumber}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ElectronicsList;
