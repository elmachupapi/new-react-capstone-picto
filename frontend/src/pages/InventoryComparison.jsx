import React, { useState, useEffect } from "react";
import api from "../api";  // Import your axios instance with interceptor
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, MenuItem, Select, FormControl, InputLabel, CircularProgress } from "@mui/material";
import { jsPDF } from "jspdf";  // Import jsPDF for PDF generation

const InventoryComparison = () => {
  const [inventoryData, setInventoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState("");  // State to store selected item name
  const [filteredData, setFilteredData] = useState({
    electronics: [],
    it_supplies: [],
    office_supplies: [],
    janitorial_supplies: [],
  });  // State to store filtered inventory data based on selected item
  const [itemsList, setItemsList] = useState([]);  // List of all items to populate the select dropdown

  useEffect(() => {
    // Fetch data using the API instance with interceptors
    api
      .get("/api/reports/total-vs-approved-vs-pending/")  // Replace with your actual endpoint
      .then((response) => {
        setInventoryData(response.data);
        setLoading(false);
        console.log(response.data);
        
        // Collect all unique item names across all categories
        const allItems = [
          ...response.data.electronics,
          ...response.data.it_supplies,
          ...response.data.office_supplies,
          ...response.data.janitorial_supplies,
        ];
        const itemNames = [...new Set(allItems.map((item) => item.item_name))];  // Remove duplicates
        setItemsList(itemNames);

        // Filter data initially when the page loads (if needed)
        filterDataByItem("");  // Initially, show all items (empty filter)
      })
      .catch((error) => {
        console.error("Error fetching inventory data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Every time the selectedItem changes, filter the data
    filterDataByItem(selectedItem);
  }, [selectedItem]);

  const filterDataByItem = (itemName) => {
    if (!itemName) {
      // If no item is selected, display all items
      setFilteredData({
        electronics: inventoryData?.electronics || [],
        it_supplies: inventoryData?.it_supplies || [],
        office_supplies: inventoryData?.office_supplies || [],
        janitorial_supplies: inventoryData?.janitorial_supplies || [],
      });
    } else {
      // Filter data for the selected item
      const filterItems = (categoryItems) => categoryItems.filter(item => item.item_name === itemName);
      setFilteredData({
        electronics: filterItems(inventoryData?.electronics || []),
        it_supplies: filterItems(inventoryData?.it_supplies || []),
        office_supplies: filterItems(inventoryData?.office_supplies || []),
        janitorial_supplies: filterItems(inventoryData?.janitorial_supplies || []),
      });
    }
  };

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
              <TableCell align="right">Total Requests</TableCell> {/* Added the column for Total Requests */}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => {
              const totalRequests = item.pending_requests + (item.approved_requests || 0);  // Calculate total requests
              return (
                <TableRow key={item.item_name}>
                  <TableCell component="th" scope="row">
                    {item.item_name}
                  </TableCell>
                  <TableCell align="right">{item.remaining_quantity}</TableCell>
                  <TableCell align="right">{item.total_quantity}</TableCell>
                  <TableCell align="right">{item.pending_requests}</TableCell>
                  <TableCell align="right">{item.request_count}</TableCell> {/* Display the total requests */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  // Function to export the data to PDF
  const exportToPDF = () => {
    const doc = new jsPDF("landscape");
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
  
    let yOffset = 20; // Starting Y position
  
    // Add Report Title with Styling
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Inventory Comparison Report", pageWidth / 2, yOffset, { align: "center" });
    yOffset += 10;
  
    // Add a date for report generation
    doc.setFontSize(10);
    const now = new Date();
    const reportDate = `Generated on: ${now.toLocaleDateString()} at ${now.toLocaleTimeString()}`;
    doc.text(reportDate, pageWidth - 30, yOffset, { align: "right" });
    yOffset += 10;
  
    // Function to draw a clean table with shaded rows
    const drawTable = (category, items) => {
      // Section Header
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text(category, 20, yOffset);
      yOffset += 8;
  
      // Table Headers
      const columnHeaders = ["Item Name", "Current Qty", "Total Qty", "Pending Req.", "Total Req."];
      const columnWidths = [60, 40, 40, 40, 40];
      let xPos = 20;
  
      doc.setFontSize(10);
      doc.setFillColor(220, 220, 220); // Light gray for header
      doc.rect(xPos, yOffset - 5, pageWidth - 40, 8, "F"); // Header background
      columnHeaders.forEach((header, i) => {
        doc.text(header, xPos + 5, yOffset);
        xPos += columnWidths[i];
      });
      yOffset += 10;
  
      // Table Rows
      let rowIndex = 0;
      items.forEach((item) => {
        const totalRequests = item.pending_requests + (item.approved_requests || 0);
        xPos = 20;
  
        // Alternate row color
        if (rowIndex % 2 === 0) {
          doc.setFillColor(240, 240, 240); // Very light gray for alternate rows
          doc.rect(20, yOffset - 5, pageWidth - 40, 8, "F");
        }
  
        // Add row data
        doc.setFont("helvetica", "normal");
        const rowData = [
          item.item_name,
          String(item.remaining_quantity),
          String(item.total_quantity),
          String(item.pending_requests),
          String(totalRequests),
        ];
  
        rowData.forEach((data, i) => {
          doc.text(data, xPos + 5, yOffset);
          xPos += columnWidths[i];
        });
  
        yOffset += 8;
        rowIndex++;
  
        // Check for page overflow
        if (yOffset > pageHeight - 20) {
          doc.addPage();
          yOffset = 20; // Reset for new page
        }
      });
  
      yOffset += 10; // Add space after table
    };
  
    // Draw tables for each category if data exists
    if (filteredData.electronics.length) drawTable("Electronics", filteredData.electronics);
    if (filteredData.it_supplies.length) drawTable("IT Supplies", filteredData.it_supplies);
    if (filteredData.office_supplies.length) drawTable("Office Supplies", filteredData.office_supplies);
    if (filteredData.janitorial_supplies.length) drawTable("Janitorial Supplies", filteredData.janitorial_supplies);
  
    // Add Footer with Page Number
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text(
        `Page ${i} of ${pageCount}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: "center" }
      );
    }
  
    // Save PDF
    const fileName = selectedItem ? `${selectedItem}_inventory_report.pdf` : "inventory_report.pdf";
    doc.save(fileName);
  };  
  
  

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Inventory Comparison Report
      </Typography>

      {/* Dropdown to select item */}
      <FormControl fullWidth sx={{ marginBottom: "20px" }}>
        <InputLabel>Choose Item</InputLabel>
        <Select
          value={selectedItem}
          label="Choose Item"
          onChange={(e) => setSelectedItem(e.target.value)}
        >
          <MenuItem value="">All Items</MenuItem>
          {itemsList.map((itemName) => (
            <MenuItem key={itemName} value={itemName}>
              {itemName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Export to PDF Button */}
      <Button variant="contained" color="primary" onClick={exportToPDF} sx={{ marginBottom: "20px" }}>
        Export to PDF
      </Button>

      {/* Render filtered tables for each category */}
      {filteredData.electronics.length > 0 && renderTable("Electronics", filteredData.electronics)}
      {filteredData.it_supplies.length > 0 && renderTable("IT Supplies", filteredData.it_supplies)}
      {filteredData.office_supplies.length > 0 && renderTable("Office Supplies", filteredData.office_supplies)}
      {filteredData.janitorial_supplies.length > 0 && renderTable("Janitorial Supplies", filteredData.janitorial_supplies)}
    </Box>
  );
};

export default InventoryComparison;
