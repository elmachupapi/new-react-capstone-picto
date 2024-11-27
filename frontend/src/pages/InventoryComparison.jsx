import React, { useState, useEffect } from "react";
import api from "../api";  // Import your axios instance with interceptor
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { jsPDF } from "jspdf";  // Import jsPDF for PDF generation

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

  // Function to export the data to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();

    doc.setFont("Helvetica-Bold", 16);
    doc.text("Inventory Comparison Report", 20, 20);

    let yOffset = 30;  // Starting position for the tables

    // Function to add a table to the PDF
    const drawTable = (category, items) => {
      doc.setFont("Helvetica-Bold", 12);
      doc.text(category, 20, yOffset);
      yOffset += 10;

      // Table header
      doc.setFont("Helvetica-Bold", 10);
      doc.text("Item Name", 20, yOffset);
      doc.text("Current Quantity", 120, yOffset);
      doc.text("Total Quantity", 180, yOffset);
      doc.text("Pending Requests", 250, yOffset);
      yOffset += 10;

      // Table content
      doc.setFont("Helvetica", 10);
      items.forEach((item) => {
        doc.text(item.item_name, 20, yOffset);
        doc.text(String(item.remaining_quantity), 120, yOffset);
        doc.text(String(item.total_quantity), 180, yOffset);
        doc.text(String(item.pending_requests), 250, yOffset);
        yOffset += 10;
      });
    };

    // Add tables for each category
    if (inventoryData.electronics) {
      drawTable("Electronics", inventoryData.electronics);
    }
    if (inventoryData.it_supplies) {
      drawTable("IT Supplies", inventoryData.it_supplies);
    }
    if (inventoryData.office_supplies) {
      drawTable("Office Supplies", inventoryData.office_supplies);
    }
    if (inventoryData.janitorial_supplies) {
      drawTable("Janitorial Supplies", inventoryData.janitorial_supplies);
    }

    // Save the PDF to the client's browser
    doc.save("inventory_comparison_report.pdf");
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Inventory Comparison Report
      </Typography>

      {/* Export to PDF Button */}
      <Button variant="contained" color="primary" onClick={exportToPDF} sx={{ marginBottom: "20px" }}>
        Export to PDF
      </Button>

      {/* Render tables for each category */}
      {inventoryData.electronics && renderTable("Electronics", inventoryData.electronics)}
      {inventoryData.it_supplies && renderTable("IT Supplies", inventoryData.it_supplies)}
      {inventoryData.office_supplies && renderTable("Office Supplies", inventoryData.office_supplies)}
      {inventoryData.janitorial_supplies && renderTable("Janitorial Supplies", inventoryData.janitorial_supplies)}
    </Box>
  );
};

export default InventoryComparison;
