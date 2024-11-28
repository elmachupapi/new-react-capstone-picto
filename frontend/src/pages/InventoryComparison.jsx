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
    const doc = new jsPDF("landscape");  // Set the orientation to landscape
    const pageWidth = doc.internal.pageSize.width; // Get the page width (landscape orientation)
    const pageHeight = doc.internal.pageSize.height; // Get the page height (landscape orientation)
    let yOffset = 30; // Starting position for the first table

    doc.setFont("helvetica", "bold"); // Using Helvetica with bold style
    doc.setFontSize(16);
    doc.text("Inventory Comparison Report", 20, yOffset);
    yOffset += 20;  // Adding space below the title

    // Function to add a table to the PDF
    const drawTable = (category, items) => {
        // Add category header
        doc.setFont("helvetica", "bold"); // Ensure bold font for headers
        doc.setFontSize(12);
        doc.text(category, 20, yOffset);
        yOffset += 10;

        // Table headers
        doc.setFont("helvetica", "normal");  // Use normal font for table content
        doc.setFontSize(10);
        
        // Adjusted column widths to fit content
        const columnWidths = {
            itemName: 50, // Reduced width for "Item Name"
            currentQuantity: 40,
            totalQuantity: 40,
            pendingRequests: 40,
            totalRequests: 40,  // All columns reduced to fit within landscape mode
        };

        doc.text("Item Name", 20, yOffset);
        doc.text("Current Quantity", 20 + columnWidths.itemName, yOffset);
        doc.text("Total Quantity", 20 + columnWidths.itemName + columnWidths.currentQuantity, yOffset);
        doc.text("Pending Requests", 20 + columnWidths.itemName + columnWidths.currentQuantity + columnWidths.totalQuantity, yOffset);
        doc.text("Total Requests", 20 + columnWidths.itemName + columnWidths.currentQuantity + columnWidths.totalQuantity + columnWidths.pendingRequests, yOffset);
        yOffset += 10;

        // Table content
        doc.setFont("helvetica", "normal"); // Use normal font for table content
        doc.setFontSize(10);
        items.forEach((item) => {
            const totalRequests = item.pending_requests + (item.approved_requests || 0);

            // Add each row of the table
            doc.text(item.item_name, 20, yOffset);
            doc.text(String(item.remaining_quantity), 20 + columnWidths.itemName, yOffset, { align: "right" });
            doc.text(String(item.total_quantity), 20 + columnWidths.itemName + columnWidths.currentQuantity, yOffset, { align: "right" });
            doc.text(String(item.pending_requests), 20 + columnWidths.itemName + columnWidths.currentQuantity + columnWidths.totalQuantity, yOffset, { align: "right" });
            doc.text(String(totalRequests), 20 + columnWidths.itemName + columnWidths.currentQuantity + columnWidths.totalQuantity + columnWidths.pendingRequests, yOffset, { align: "right" });

            yOffset += 8;  // Move to next row

            // Check if the current content overflows the page, if so, add a new page
            if (yOffset > pageHeight - 20) {  // Add 20px margin for footer
                doc.addPage();
                yOffset = 20;  // Reset Y offset to start at the top of the next page
                // Re-add headers to the new page
                doc.setFont("helvetica", "bold");
                doc.setFontSize(10);
                doc.text("Item Name", 20, yOffset);
                doc.text("Current Quantity", 20 + columnWidths.itemName, yOffset);
                doc.text("Total Quantity", 20 + columnWidths.itemName + columnWidths.currentQuantity, yOffset);
                doc.text("Pending Requests", 20 + columnWidths.itemName + columnWidths.currentQuantity + columnWidths.totalQuantity, yOffset);
                doc.text("Total Requests", 20 + columnWidths.itemName + columnWidths.currentQuantity + columnWidths.totalQuantity + columnWidths.pendingRequests, yOffset);
                yOffset += 10;
            }
        });
    };

    // Add tables for each category (only if there is data to show)
    if (filteredData.electronics.length > 0) {
        drawTable("Electronics", filteredData.electronics);
    }
    if (filteredData.it_supplies.length > 0) {
        drawTable("IT Supplies", filteredData.it_supplies);
    }
    if (filteredData.office_supplies.length > 0) {
        drawTable("Office Supplies", filteredData.office_supplies);
    }
    if (filteredData.janitorial_supplies.length > 0) {
        drawTable("Janitorial Supplies", filteredData.janitorial_supplies);
    }

    // Save the PDF to the client's browser
    doc.save(`${selectedItem}_inventory_comparison_report.pdf`);
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
