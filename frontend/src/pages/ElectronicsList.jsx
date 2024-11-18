import React, { useState, useEffect } from "react";
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
import api from "../api";

const ElectronicsList = () => {
  const [electronics, setElectronics] = useState([]);
  
  const [electronicsData, setElectronicsData] = useState([
    { itemDescription: "Laptop", quantity: 5, unit: "pcs", date: "2024-10-12", rfNumber: "RF-001" },
    { itemDescription: "Projector", quantity: 2, unit: "pcs", date: "2024-10-13", rfNumber: "RF-002" },
  ]);

  const [open, setOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [newItem, setNewItem] = useState({
    item_name: "",
    quantity: "",
    unit: "",
    date_added: "",
    RF_number: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpen = () => {
    setEditItem(null);  // Reset edit mode
    setNewItem({
      item_name: "",
      quantity: "",
      unit: "",
      date_added: "",
      RF_number: "",
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

  const filteredElectronics = electronics.filter((item) =>
    item.item_name.toLowerCase().includes(searchQuery.toLowerCase())
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

  const handleDelete = async () => {
    try {
      const res = await api.delete(`api/item/electronics/delete/${itemToDelete.id}/`);
      if (res.status === 204) {
        alert("Item deleted successfully!");
        setElectronics((prevData) => prevData.filter((item) => item.id !== itemToDelete.id));
      } else {
        alert("Failed to delete the item.");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("An error occurred while trying to delete the item.");
    }
    setConfirmDeleteOpen(false);
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item); // Store item to be deleted
    setConfirmDeleteOpen(true); // Open delete confirmation modal
  };

  const handleSubmit = async () => {
    if (editItem) {
      try {
        // Construct payload for the update request
        const payload = {
          item_name: newItem.item_name,
          quantity: parseInt(newItem.quantity, 10), // Ensure quantity is a number
          unit: newItem.unit,
          date_added: newItem.date_added,
          RF_number: newItem.RF_number,
        };
  
        // Make PUT request to the update endpoint
        const res = await api.put(`api/item/electronics/update/${editItem.id}/`, payload);
  
        if (res.status === 200) { // Assuming successful update returns HTTP 200
          alert("Item updated successfully!");
          // Optional: Fetch updated data from the server
          getElectronics(); // Refresh list
        } else {
          alert("Failed to update the item.");
        }
      } catch (error) {
        console.error("Error updating item:", error);
        alert("An error occurred while updating the item.");
      }
    } else {
      // Add a new item
      addElectronics();
    }

    setEditItem(null); // Reset edit mode
    setNewItem({
      item_name: "",
      quantity: "",
      unit: "",
      date_added: "",
      RF_number: "",
    });
    handleClose();
  };

  useEffect(() => {
    getElectronics();
  }, [])

  const getElectronics = () => {
    api
      .get("/api/item/electronics/")
      .then((res) => res.data)
      .then((data) => {setElectronics(data); console.log(data)})
      .catch((err) => alert(err));
  }

  const addElectronics = async () => {
    const payload = {
      item_name: newItem.item_name,
      quantity: parseInt(newItem.quantity, 10), // Ensure quantity is a number
      unit: newItem.unit,
      date_added: newItem.date_added,
      RF_number: newItem.RF_number,
    };
  
    try {
      const res = await api.post("/api/item/electronics/", payload);
      if (res.status === 201) {
        alert("Item added!");
        getElectronics(); // Refresh the list
      } else {
        alert("Error: Item not added");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to add item. Please check your input and try again.");
    }
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "#f0f4f4", minHeight: "100vh", mt: 5 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
        <Typography variant="h4" gutterBottom>
          Electronics List
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
              <TableCell>Item Description</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>RF Number</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredElectronics.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(item)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>{item.item_name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.unit}</TableCell>
                <TableCell>{item.date_added}</TableCell>
                <TableCell>{item.RF_number}</TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => handleDeleteClick(item)}>
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
        count={filteredElectronics.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Modal for Adding or Editing Item */}
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
          <IconButton aria-label="close" onClick={handleClose} sx={{ position: 'absolute', top: 16, right: 16 }}>
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" gutterBottom>
            {editItem ? "Edit Item" : "Add New Item"}
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
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
                  <TextField fullWidth name="item_name" value={newItem.item_name} onChange={handleInputChange} placeholder={editItem ? "" : "Enter Item Description"}/>
                </TableCell>
                <TableCell>
                  <TextField fullWidth name="quantity" type="number" value={newItem.quantity} onChange={handleInputChange} placeholder={editItem ? "" : "Enter Quantity"} />
                </TableCell>
                <TableCell>
                  <TextField fullWidth name="unit" value={newItem.unit} onChange={handleInputChange} placeholder={editItem ? "" : "Enter Unit"}/>
                </TableCell>
                <TableCell>
                  <TextField fullWidth name="date_added" type="date" value={newItem.date_added} onChange={handleInputChange} />
                </TableCell>
                <TableCell>
                  <TextField fullWidth name="RF_number" value={newItem.RF_number} onChange={handleInputChange} placeholder={editItem ? "" : "Enter RF Number"}/>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ mt: 2 }}>
            {editItem ? "Update Item" : "Add Item"}
          </Button>
        </Box>
      </Modal>

      {/* Delete Confirmation Modal */}
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
          <Typography variant="h6" gutterBottom>Confirm Deletion</Typography>
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

export default ElectronicsList;
