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
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState(null);

  // Fetch requests from the backend
  const getRequests = () => {
    api
      .get("/api/requests/")
      .then((res) => res.data)
      .then((data) => {
        setRequests(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    getRequests();
  }, []);

  // Handle search input
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Handle delete confirmation modal
  const handleOpenConfirmDelete = (request) => {
    setRequestToDelete(request);
    setConfirmDeleteOpen(true);
  };

  const handleCloseConfirmDelete = () => {
    setConfirmDeleteOpen(false);
    setRequestToDelete(null);
  };

  // Handle delete request
  const handleDelete = async () => {
    try {
      const response = await api.delete(`/api/requests/delete/${requestToDelete.id}/`);
      if (response.status === 204) {
        alert("Request deleted successfully!");
        setRequests((prevRequests) =>
          prevRequests.filter((request) => request.id !== requestToDelete.id)
        );
        handleCloseConfirmDelete();
      } else {
        alert("Failed to delete the request.");
      }
    } catch (error) {
      console.error("Error deleting request:", error);
      alert("An error occurred while trying to delete the request.");
    }
  };

  // Filter requests based on search
  const filteredRequests = requests.filter(
    (request) =>
      request.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.RF_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination controls
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatDate = (dateString) => new Date(dateString).toISOString().split("T")[0];

  return (
    <Box sx={{ p: 3, backgroundColor: "#f0f4f4", minHeight: "100vh", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Request List
      </Typography>
      <TextField
        label="Search by Item Name, Request Number, or Status"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ width: "400px", mt: -1, backgroundColor: "white" }}
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
              <TableCell>Received</TableCell>
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
                      onClick={() => handleOpenConfirmDelete(request)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    {request.status.toLowerCase() === "approved" && (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => alert(`Request ${request.RF_number} button clicked!`)}
                      >
                        Received
                      </Button>
                    )}
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
      <Modal open={confirmDeleteOpen} onClose={handleCloseConfirmDelete}>
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
