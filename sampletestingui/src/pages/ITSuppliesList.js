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
  Button,
  Modal,
  TextField,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Import CloseIcon

const sampleSubmittedRequests = [
  {
    itemCategory: "IT Supplies",
    itemDescription: "Keyboard",
    quantity: "10",
    unit: "pcs",
    date: "2024-10-10",
    rfNumber: "RF-001",
  },
  {
    itemCategory: "Electronics",
    itemDescription: "Monitor",
    quantity: "5",
    unit: "pcs",
    date: "2024-10-11",
    rfNumber: "RF-002",
  },
];

const ITSuppliesList = () => {
  const [open, setOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    itemCategory: "",
    itemDescription: "",
    quantity: "",
    unit: "",
    date: "",
    rfNumber: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Prevent setting a negative value for quantity
    if (name === "quantity" && value < 0) return;

    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("New Item:", newItem);
    handleClose();
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "#f0f4f4", minHeight: "100vh", mt: 5 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
        <Typography variant="h4" gutterBottom>
          IT Supplies List
        </Typography>
        <Button variant="contained" color="primary" sx={{ width: '200px' }} onClick={handleOpen}>
          Add Item
        </Button>
      </Box>

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
            {sampleSubmittedRequests.map((request, index) => (
              <TableRow key={index}>
                <TableCell>{request.itemCategory}</TableCell>
                <TableCell>{request.itemDescription}</TableCell>
                <TableCell>{request.quantity}</TableCell>
                <TableCell>{request.unit}</TableCell>
                <TableCell>{request.date}</TableCell>
                <TableCell>{request.rfNumber}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Adding Item */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          width: 1400, // Increased width for the modal
          bgcolor: 'background.paper', 
          boxShadow: 24, 
          p: 4 
        }}>
          {/* Close Icon Button */}
          <IconButton 
            aria-label="close" 
            onClick={handleClose} 
            sx={{ position: 'absolute', top: 16, right: 16 }} // Positioning the icon in the top right corner
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" gutterBottom>
            Add New Item
          </Typography>
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
              <TableRow>
                <TableCell>
                  <TextField 
                    fullWidth 
                    name="itemCategory" 
                    value={newItem.itemCategory} 
                    onChange={handleInputChange} 
                  />
                </TableCell>
                <TableCell>
                  <TextField 
                    fullWidth 
                    name="itemDescription" 
                    value={newItem.itemDescription} 
                    onChange={handleInputChange} 
                  />
                </TableCell>
                <TableCell>
                  <TextField 
                    fullWidth 
                    name="quantity" 
                    type="number" 
                    value={newItem.quantity} 
                    onChange={handleInputChange} 
                    inputProps={{ min: 0 }} // Set minimum value to 0
                  />
                </TableCell>
                <TableCell>
                  <TextField 
                    fullWidth 
                    name="unit" 
                    value={newItem.unit} 
                    onChange={handleInputChange} 
                  />
                </TableCell>
                <TableCell>
                  <TextField 
                    fullWidth 
                    name="date" 
                    type="date" 
                    value={newItem.date} 
                    onChange={handleInputChange} 
                  />
                </TableCell>
                <TableCell>
                  <TextField 
                    fullWidth 
                    name="rfNumber" 
                    value={newItem.rfNumber} 
                    onChange={handleInputChange} 
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
            Submit
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default ITSuppliesList;
