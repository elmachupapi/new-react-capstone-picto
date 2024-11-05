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

const ElectronicsList = () => {
  const [electronicsData, setElectronicsData] = useState([
    { itemCategory: "Electronics", itemDescription: "Laptop", quantity: 5, unit: "pcs", date: "2024-10-12", rfNumber: "RF-001" },
    { itemCategory: "Electronics", itemDescription: "Projector", quantity: 2, unit: "pcs", date: "2024-10-13", rfNumber: "RF-002" },
  ]);

  const [open, setOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [newItem, setNewItem] = useState({
    itemCategory: "",
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
    setEditItem(null);  // Reset edit mode
    setNewItem({
      itemCategory: "",
      itemDescription: "",
      quantity: "",
      unit: "",
      date: "",
      rfNumber: "",
    });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "quantity" && value < 0) return;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(0); // Reset to the first page when searching
  };

  const filteredElectronics = electronicsData.filter((item) =>
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

  const handleDelete = (itemToDelete) => {
    setElectronicsData((prevData) => prevData.filter((item) => item !== itemToDelete));
  };

  const handleSubmit = () => {
    if (editItem) {
      // Update the existing item
      setElectronicsData((prevData) =>
        prevData.map((item) => (item === editItem ? newItem : item))
      );
    } else {
      // Add a new item
      setElectronicsData((prevData) => [...prevData, newItem]);
    }

    setEditItem(null); // Reset edit mode
    setNewItem({
      itemCategory: "",
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
            {filteredElectronics.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(item)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>{item.itemCategory}</TableCell>
                <TableCell>{item.itemDescription}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.unit}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.rfNumber}</TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => handleDelete(item)}>
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
            <TextField fullWidth name="itemCategory" value={newItem.itemCategory} onChange={handleInputChange} />
          </TableCell>
          <TableCell>
            <TextField fullWidth name="itemDescription" value={newItem.itemDescription} onChange={handleInputChange} />
          </TableCell>
          <TableCell>
            <TextField fullWidth name="quantity" type="number" value={newItem.quantity} onChange={handleInputChange} inputProps={{ min: 0 }} />
          </TableCell>
          <TableCell>
            <TextField fullWidth name="unit" value={newItem.unit} onChange={handleInputChange} />
          </TableCell>
          <TableCell>
            <TextField fullWidth name="date" type="date" value={newItem.date} onChange={handleInputChange} />
          </TableCell>
          <TableCell>
            <TextField fullWidth name="rfNumber" value={newItem.rfNumber} onChange={handleInputChange} />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
      {editItem ? "Update Item" : "Submit"}
    </Button>
  </Box>
</Modal>
    </Box>
  );
};

export default ElectronicsList;
