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
  MenuItem
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../api";

const ITSuppliesList = () => {
  const [itSupplies, setITSupplies] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [hoveredColumn, setHoveredColumn] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [newItem, setNewItem] = useState({
    item_name: "",
    brand: "",
    model: "",
    quantity: "",
    unit: "",
    date_added: "",
    PO_number: "",
    year: "",
    quarter: "",
    serial_number: "",
    obsolete: ""
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpen = () => {
    setEditItem(null); // Reset edit mode
    setNewItem({
      item_name: "",
      brand: "",
      model: "",
      quantity: "",
      unit: "",
      date_added: "",
      PO_number: "",
      year: "",
      quarter: "",
      serial_number: "",
      obsolete: ""
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

  const filteredITSupplies = itSupplies.filter((item) =>
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
      const res = await api.delete(api/item/itsupplies/delete/${itemToDelete.id}/);
      if (res.status === 204) {
        alert("Item deleted successfully!");
  
        // Add a log for the delete action
        await addLog(itemToDelete.item_name, "Item Deleted", itemToDelete.quantity, localStorage.getItem("username"));
  
        setITSupplies((prevData) => prevData.filter((item) => item.id !== itemToDelete.id));
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

  const addLog = async (itemName, action, currentQuantity, admin) => {
    try {
      const logPayload = {
        item_name: itemName,
        action: action, // Specify the action (e.g., "Item Added", "Item Updated")
        current_quantity: currentQuantity,
        admin: admin
      };
      await api.post("/api/logs/item/", logPayload);
      alert("Log added successfully!");
    } catch (error) {
      console.error("Error adding log:", error);
      alert("Failed to add log.");
    }
  };
  
  const handleSubmit = async () => {
    const sanitizePayload = (payload) => {
      const sanitizedPayload = {};
      for (const [key, value] of Object.entries(payload)) {
        sanitizedPayload[key] = value === "" || value === undefined ? null : value;
      }
      return sanitizedPayload;
    };
  
    if (editItem) {
      // Editing an existing item
      try {
        const payload = {
          item_name: newItem.item_name,
          brand: newItem.brand,
          model: newItem.model,
          quantity: parseInt(newItem.quantity, 10), // Ensure quantity is a number or null
          unit: newItem.unit,
          date_added: newItem.date_added,
          PO_number: newItem.PO_number,
          year: newItem.year,
          quarter: newItem.quarter,
          serial_number: newItem.serial_number,
          obsolete: newItem.obsolete,
        };
  
        const sanitizedPayload = sanitizePayload(payload);
  
        const res = await api.put(`/api/item/itsupplies/update/${editItem.id}/`, sanitizedPayload);
        if (res.status === 200) {
          alert("Item updated successfully!");
          // Add a log for the update action
          await addLog(newItem.item_name, "Item Updated", parseInt(newItem.quantity, 10), localStorage.getItem("username"));
          getITSupplies(); // Refresh the list
        } else {
          alert("Failed to update the item.");
        }
      } catch (error) {
        console.error("Error updating item:", error);
        alert("An error occurred while updating the item.");
      }
    } else {
      // Adding a new item
      try {
        const payload = {
          item_name: newItem.item_name,
          brand: newItem.brand,
          model: newItem.model,
          quantity: parseInt(newItem.quantity, 10), // Ensure quantity is a number or null
          unit: newItem.unit,
          date_added: newItem.date_added,
          PO_number: newItem.PO_number,
          year: newItem.year,
          quarter: newItem.quarter,
          serial_number: newItem.serial_number,
          obsolete: newItem.obsolete,
        };
  
        const sanitizedPayload = sanitizePayload(payload);
  
        const res = await api.post("/api/item/itsupplies/", sanitizedPayload);
        if (res.status === 201) {
          alert("Item added successfully!");
          // Add a log for the add action
          await addLog(newItem.item_name, "Item Added", parseInt(newItem.quantity, 10), localStorage.getItem("username"));
          getITSupplies(); // Refresh the list
        } else {
          alert("Error: Item not added.");
        }
      } catch (error) {
        console.error(error);
        alert("Failed to add item. Please check your input and try again.");
      }
    }
  
    setEditItem(null); // Reset edit mode
    handleClose();
  };
  
  useEffect(() => {
    getITSupplies();
  }, []);

  const getITSupplies = () => {
    api
      .get("/api/item/itsupplies/")
      .then((res) => res.data)
      .then((data) => {
        setITSupplies(data); console.log(data)})
      .catch((err) => alert(err));
  };


  //for sorting
  const [sortConfig, setSortConfig] = useState({ key: "item_name", direction: "asc" });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };
  
  const sortedITSupplies = [...filteredITSupplies].sort((a, b) => {
    const aValue = sortConfig.key === "date_added" ? new Date(a[sortConfig.key]) : a[sortConfig.key];
    const bValue = sortConfig.key === "date_added" ? new Date(b[sortConfig.key]) : b[sortConfig.key];
  
    if (aValue < bValue) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });


  //for hover
  const handleMouseEnter = (column) => {
    setHoveredColumn(column);
  };

  const handleMouseLeave = () => {
    setHoveredColumn(null);
  };

  const getHoverStyle = (column) => ({
    backgroundColor: hoveredColumn === column ? "#e0f7fa" : "transparent",
    transition: "background-color 0.3s ease",
    cursor: "pointer",
  });


  return (
    <Box sx={{ p: 3, backgroundColor: "#f0f4f4", minHeight: "100vh", mt: 5 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
        <Typography variant="h4" gutterBottom>
          IT Supplies List
        </Typography>
        <Button variant="contained" color="primary" sx={{ width: "200px" }} onClick={handleOpen}>
          Add Item
        </Button>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", mt: 1, mb: 2 }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ width: "400px", mt: -1, backgroundColor: "white" }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
        <TableHead>
          <TableRow>
            <TableCell>Edit</TableCell>
            <TableCell
              onClick={() => handleSort("item_name")}
              onMouseEnter={() => handleMouseEnter("item_name")}
              onMouseLeave={handleMouseLeave}
              style={getHoverStyle("item_name")}
            >
              Item Description {sortConfig.key === "item_name" && (sortConfig.direction === "asc" ? "↑" : "↓")}
            </TableCell>
            <TableCell
              onClick={() => handleSort("brand")}
              onMouseEnter={() => handleMouseEnter("brand")}
              onMouseLeave={handleMouseLeave}
              style={getHoverStyle("brand")}
            >
              Brand {sortConfig.key === "brand" && (sortConfig.direction === "asc" ? "↑" : "↓")}
            </TableCell>
            <TableCell>Model</TableCell>
            <TableCell>Serial Number</TableCell>
            <TableCell
              onClick={() => handleSort("quantity")}
              onMouseEnter={() => handleMouseEnter("quantity")}
              onMouseLeave={handleMouseLeave}
              style={getHoverStyle("quantity")}
            >
              Quantity {sortConfig.key === "quantity" && (sortConfig.direction === "asc" ? "↑" : "↓")}
            </TableCell>
            <TableCell>Unit</TableCell>
            <TableCell
              onClick={() => handleSort("date_added")}
              onMouseEnter={() => handleMouseEnter("date_added")}
              onMouseLeave={handleMouseLeave}
              style={getHoverStyle("date_added")}
            >
              Date {sortConfig.key === "date_added" && (sortConfig.direction === "asc" ? "↑" : "↓")}
            </TableCell>
            <TableCell>PO Number</TableCell>
            <TableCell
              onClick={() => handleSort("year")}
              onMouseEnter={() => handleMouseEnter("year")}
              onMouseLeave={handleMouseLeave}
              style={getHoverStyle("year")}
            >
              Year {sortConfig.key === "year" && (sortConfig.direction === "asc" ? "↑" : "↓")}
            </TableCell>
            <TableCell>Quarter</TableCell>
            <TableCell>Obsolete</TableCell>
          </TableRow>
        </TableHead>
          <TableBody>
            {sortedITSupplies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(item)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>{item.item_name}</TableCell>
                <TableCell>{item.brand}</TableCell>
                <TableCell>{item.model}</TableCell>
                <TableCell>{item.serial_number}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.unit}</TableCell>
                <TableCell>{item.date_added}</TableCell>
                <TableCell>{item.PO_number}</TableCell>
                <TableCell>{item.year}</TableCell>
                <TableCell>{item.quarter}</TableCell>
                <TableCell>{item.obsolete}</TableCell>
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
        count={filteredITSupplies.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 1500,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <IconButton aria-label="close" onClick={handleClose} sx={{ position: "absolute", top: 16, right: 16 }}>
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" gutterBottom>
            {editItem ? "Edit Item" : "Add New Item"}
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item Description</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Serial Number</TableCell>
                <TableCell sx={{width: "120px"}}>Quantity</TableCell>
                <TableCell>Unit</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>PO Number</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>Quarter</TableCell>
                <TableCell>Obsolete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <TextField
                    fullWidth
                    name="item_name"
                    value={newItem.item_name}
                    onChange={handleInputChange}
                    placeholder={editItem ? "" : "Enter Item Description"}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    name="brand"
                    value={newItem.brand}
                    onChange={handleInputChange}
                    placeholder={editItem ? "" : "Enter brand"}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    name="model"
                    value={newItem.model}
                    onChange={handleInputChange}
                    placeholder={editItem ? "" : "Enter model"}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    name="serial_number"
                    value={newItem.serial_number}
                    onChange={handleInputChange}
                    placeholder={editItem ? "" : "Enter Serial Number"}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    name="quantity"
                    type="number"
                    value={newItem.quantity}
                    onChange={handleInputChange}
                    placeholder={editItem ? "" : "Enter Quantity"}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    name="unit"
                    value={newItem.unit}
                    onChange={handleInputChange}
                    placeholder={editItem ? "" : "Enter Unit"}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    name="date_added"
                    type="date"
                    value={newItem.date_added}
                    onChange={handleInputChange}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    name="PO_number"
                    value={newItem.PO_number}
                    onChange={handleInputChange}
                    placeholder={editItem ? "" : "Enter PO Number"}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    name="year"
                    value={newItem.year}
                    onChange={handleInputChange}
                    placeholder={editItem ? "" : "Enter Year"}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    name="qaurter"
                    value={newItem.quarter}
                    onChange={handleInputChange}
                    placeholder={editItem ? "" : "Enter Quarter"}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    select
                    fullWidth
                    name="obsolete"
                    value={newItem.obsolete || ""} 
                    onChange={handleInputChange}
                    label="Yes or No" 
                  >
                    <MenuItem value="" disabled>
                      Select Obsolete Status
                    </MenuItem>
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </TextField>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ mt: 2 }}>
            {editItem ? "Update Item" : "Add Item"}
          </Button>
        </Box>
      </Modal>

      <Modal open={confirmDeleteOpen} onClose={handleConfirmDeleteClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            textAlign: "center",
          }}
        >
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

export default ITSuppliesList;