import React, { useState, useEffect } from "react";
import api from "../api";  // Import your axios instance with interceptor
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const InventoryComparison = () => {
  const [inventoryData, setInventoryData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data using the API instance with interceptors
    api
      .get("/api/reports/total-vs-approved-vs-pending/")  // Replace with your actual endpoint
      .then((response) => {
        setInventoryData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching inventory data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", marginTop: "20px" }}>
        <Typography variant="h5">Loading...</Typography>
      </Box>
    );
  }

  // Function to render the report table
  const renderTable = (category, items) => (
    <Box sx={{ marginBottom: "30px" }}>
      <Typography variant="h6" sx={{ marginBottom: "15px" }}>
        {category}
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label={`${category} table`}>
          <TableHead>
            <TableRow>
              <TableCell>Item Name</TableCell>
              <TableCell align="right">Current Quantity</TableCell>
              <TableCell align="right">Total Quantity</TableCell>
              <TableCell align="right">Pending Requests</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.item_name}>
                <TableCell component="th" scope="row">
                  {item.item_name}
                </TableCell>
                <TableCell align="right">{item.remaining_quantity}</TableCell>
                <TableCell align="right">{item.total_quantity}</TableCell>
                <TableCell align="right">{item.pending_requests}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Inventory Comparison Report
      </Typography>

      {/* Render tables for each category */}
      {inventoryData.electronics && renderTable("Electronics", inventoryData.electronics)}
      {inventoryData.it_supplies && renderTable("IT Supplies", inventoryData.it_supplies)}
      {inventoryData.office_supplies && renderTable("Office Supplies", inventoryData.office_supplies)}
      {inventoryData.janitorial_supplies && renderTable("Janitorial Supplies", inventoryData.janitorial_supplies)}
    </Box>
  );
};

export default InventoryComparison;
