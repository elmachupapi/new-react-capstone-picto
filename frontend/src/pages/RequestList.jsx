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
  TextField,
  TablePagination,
  IconButton,
  Button,
  Modal,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const RequestList = () => {
  // Initial sample data for the request list
  const initialRequests = [
    { itemName: "Laptop", requestNumber: "REQ-001", dateRequested: "2024-10-10", status: "Approved" },
    { itemName: "Mouse", requestNumber: "REQ-002", dateRequested: "2024-10-11", status: "Pending" },
    { itemName: "Printer", requestNumber: "REQ-003", dateRequested: "2024-10-12", status: "Denied" },
    { itemName: "Broom", requestNumber: "REQ-004", dateRequested: "2024-10-13", status: "Pending" },
  ];

  // State for request data, search term, pagination, and confirmation modal
  const [requests, setRequests] = useState(initialRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState(null);

  // Filter requests based on the search term
  const filteredRequests = requests.filter(
    request =>
      request.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.requestNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
  const handleOpenConfirmDelete = (requestNumber) => {
    setRequestToDelete(requestNumber);
    setConfirmDeleteOpen(true);
  };

  // Close the confirmation modal
  const handleCloseConfirmDelete = () => {
    setConfirmDeleteOpen(false);
    setRequestToDelete(null);
  };

  // Handle delete action
  const handleDelete = () => {
    setRequests(requests.filter((request) => request.requestNumber !== requestToDelete));
    handleCloseConfirmDelete();
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
              <TableCell>Request Number</TableCell>
              <TableCell>Date Requested</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRequests
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((request) => (
                <TableRow key={request.requestNumber}>
                  <TableCell>{request.itemName}</TableCell>
                  <TableCell>{request.requestNumber}</TableCell>
                  <TableCell>{request.dateRequested}</TableCell>
                  <TableCell>{request.status}</TableCell>
                  <TableCell>
                    <IconButton
                      color="error"
                      onClick={() => handleOpenConfirmDelete(request.requestNumber)}
                    >
                      <DeleteIcon />
                    </IconButton>
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
