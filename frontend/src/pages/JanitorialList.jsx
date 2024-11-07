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
  TablePagination,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const sampleSubmittedRequests = [
  { itemCategory: "Janitorial Supplies", itemDescription: "Mop", quantity: "20", unit: "pcs", date: "2024-10-10", rfNumber: "RF-003" },
  { itemCategory: "Janitorial Supplies", itemDescription: "Broom", quantity: "15", unit: "pcs", date: "2024-10-11", rfNumber: "RF-004" },
  // Add more items as needed for testing
];

const JanitorialSupplies = () => {
  const [janitorialData, setJanitorialData] = useState(sampleSubmittedRequests);
  const [open, setOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [newItem, setNewItem] = useState({
    itemCategory: "Janitorial Supplies",
    itemDescription: "",
    quantity: "",
    unit: "",
    date: "",
    rfNumber: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpen = () => {
    setEditItem(null); // Reset edit mode
    setNewItem({
      itemCategory: "Janitorial Supplies",
      itemDescription: "",
      quantity: "",
      unit: "",
      date: "",
      rfNumber: "",
    });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  const handleConfirmDeleteClose = () => setConfirmDeleteOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "quantity" && value < 0) return;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(0); // Reset to the first page when searching
  };

  const filteredRequests = janitorialData.filter((item) =>
    item.itemDescription.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setNewItem(item); // Pre-fill form with selected item's data
    setOpen(true);
  };

  const handleDelete = () => {
    setJanitorialData((prevData) => prevData.filter((item) => item !== itemToDelete));
    setConfirmDeleteOpen(false); // Close confirmation dialog after deleting
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item); // Store item to be deleted
    setConfirmDeleteOpen(true); // Open delete confirmation modal
  };

  const handleSubmit = () => {
    if (editItem) {
      // Update the existing item
      setJanitorialData((prevData) =>
        prevData.map((item) => (item === editItem ? newItem : item))
      );
    } else {
      // Add a new item
      setJanitorialData((prevData) => [...prevData, newItem]);
    }

    setEditItem(null); // Reset edit mode
    setNewItem({
      itemCategory: "Janitorial Supplies",
      itemDescription: "",
      quantity: "",
      unit: "",
      date: "",
      rfNumber: "",
    });
    handleClose();
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "#f0f4f4", minHeight: "100vh", mt: 5 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
        <Typography variant="h4" gutterBottom>
          Janitorial Supplies List
        </Typography>
        <Button variant="contained" color="primary" sx={{ width: '200px' }} onClick={handleOpen}>
          Add Item
        </Button>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 2 }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ width: '400px', mt: -1, backgroundColor: 'white' }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Edit</TableCell>
              <TableCell>Item Category</TableCell>
              <TableCell>Item Description</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>RF Number</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRequests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((request, index) => (
              <TableRow key={index}>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(request)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>{request.itemCategory}</TableCell>
                <TableCell>{request.itemDescription}</TableCell>
                <TableCell>{request.quantity}</TableCell>
                <TableCell>{request.unit}</TableCell>
                <TableCell>{request.date}</TableCell>
                <TableCell>{request.rfNumber}</TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => handleDeleteClick(request)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredRequests.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Add/Edit Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 1400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4
        }}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: 'absolute', top: 16, right: 16 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" gutterBottom>
            {editItem ? "Edit Item" : "Add New Item"}
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
                  <TextField fullWidth name="itemCategory" value={newItem.itemCategory} onChange={handleInputChange} disabled/>
                </TableCell>
                <TableCell>
                  <TextField fullWidth name="itemDescription" value={newItem.itemDescription} onChange={handleInputChange} placeholder={editItem ? "" : "Enter Item Description"} />
                </TableCell>
                <TableCell>
                  <TextField fullWidth name="quantity" type="number" value={newItem.quantity} onChange={handleInputChange} placeholder={editItem ? "" : "Enter Quantity"} />
                </TableCell>
                <TableCell>
                  <TextField fullWidth name="unit" value={newItem.unit} onChange={handleInputChange} placeholder={editItem ? "" : "Enter Unit"} />
                </TableCell>
                <TableCell>
                  <TextField fullWidth name="date" type="date" value={newItem.date} onChange={handleInputChange} />
                </TableCell>
                <TableCell>
                  <TextField fullWidth name="rfNumber" value={newItem.rfNumber} onChange={handleInputChange} placeholder={editItem ? "" : "Enter RF Number"}/>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ mt: 2 }}>
            {editItem ? "Update Item" : "Add Item"}
          </Button>
        </Box>
      </Modal>

      {/* Confirm Delete Modal */}
      <Modal open={confirmDeleteOpen} onClose={handleConfirmDeleteClose}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          textAlign: 'center'
        }}>
          <Typography variant="h6" gutterBottom>
            Confirm Deletion
          </Typography>
          <Typography variant="body1" gutterBottom>
            Are you sure you want to delete this item?
          </Typography>
          <Button onClick={handleDelete} color="error" variant="contained" sx={{ mt: 2, mr: 2 }}>
            Delete
          </Button>
          <Button onClick={handleConfirmDeleteClose} variant="outlined" sx={{ mt: 2 }}>
            Cancel
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default JanitorialSupplies;
