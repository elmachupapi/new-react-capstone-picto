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
  TextField,
  TablePagination,
  IconButton,
  Button,
  Modal,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../api";

const RequestList = () => {
  // Initial sample data for the request list
  // const initialRequests = [
  //   { itemName: "Laptop", RF_number: "REQ-001", dateRequested: "2024-10-10", status: "Approved" },
  //   { itemName: "Mouse", RF_number: "REQ-002", dateRequested: "2024-10-11", status: "Pending" },
  //   { itemName: "Printer", RF_number: "REQ-003", dateRequested: "2024-10-12", status: "Denied" },
  //   { itemName: "Broom", RF_number: "REQ-004", dateRequested: "2024-10-13", status: "Pending" },
  // ];

  // // State for request data, search term, pagination, and confirmation modal
  // const [requests, setRequests] = useState(initialRequests);
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState(null);

  // Filter requests based on the search term
  const filteredRequests = requests.filter(
    request =>
      request.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.RF_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle pagination change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Open the confirmation modal
  const handleOpenConfirmDelete = (RF_number) => {
    setRequestToDelete(RF_number);
    setConfirmDeleteOpen(true);
  };

  // Close the confirmation modal
  const handleCloseConfirmDelete = () => {
    setConfirmDeleteOpen(false);
    setRequestToDelete(null);
  };

  // Handle delete action
  const handleDelete = async () => {
    try {
      // Send a DELETE request to the backend
      const res = await api.delete(`/api/requests/delete/${requestToDelete}/`);
      
      if (res.status === 204) { // Assuming 204 No Content indicates successful deletion
        // Remove the deleted request from the frontend state
        setRequests((prevRequests) => 
          prevRequests.filter((request) => request.RF_number !== requestToDelete)
        );
        alert("Request deleted successfully!");
      } else {
        alert("Failed to delete the request. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting request:", error);
      alert("An error occurred while deleting the request.");
    } finally {
      handleCloseConfirmDelete();
    }
  };

  useEffect(() => {
    getRequests();
  }, [])

  const getRequests = () => {
    api
      .get("/api/requests/")
      .then((res) => res.data)
      .then((data) => {setRequests(data); console.log(data)})
      .catch((err) => alert(err));
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split("T")[0];
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "#f0f4f4", minHeight: "100vh", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Request List
      </Typography>
      {/* Search Input */}
      <TextField
        label="Search by Item Name, Request Number, or Status"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ width: '400px', mt: -1, backgroundColor: 'white' }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item Name</TableCell>
              <TableCell>RF Number</TableCell>
              <TableCell>Date Requested</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRequests
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.item_name}</TableCell>
                  <TableCell>{request.RF_number}</TableCell>
                  <TableCell>{formatDate(request.date_created)}</TableCell>
                  <TableCell>{request.status}</TableCell>
                  <TableCell>
                    <IconButton
                      color="error"
                      onClick={() => handleOpenConfirmDelete(request.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    {/* Conditionally show the button if the status is "approved" */}
                    {request.status.toLowerCase() === "approved" && (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => alert(`Request ${request.RF_number} button clicked!`)}
                      >
                        Action
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Pagination Component */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredRequests.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {/* Confirmation Modal */}
      <Modal open={confirmDeleteOpen} onClose={handleCloseConfirmDelete}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Confirm Deletion
          </Typography>
          <Typography variant="body1" gutterBottom>
            Are you sure you want to delete this item?
          </Typography>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            sx={{ mt: 2, mr: 2 }}
          >
            Delete
          </Button>
          <Button
            onClick={handleCloseConfirmDelete}
            variant="outlined"
            sx={{ mt: 2 }}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default RequestList;
