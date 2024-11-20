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
  TextField,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const UserRequest = () => {
  // Sample data for the user requests
  const requests = [
    {
      itemName: "Laptop",
      requestNumber: "REQ-001",
      dateRequested: "2024-10-10",
      requestor: "John Doe",
      position: "IT Specialist",
      division: "ICT Division",
      serialNumber: "SN-12345",
      quantity: 1,
      unit: "Piece",
      purpose: "For work-from-home setup",
      rfNumber: "RF-101",
    },
    {
      itemName: "Mouse",
      requestNumber: "REQ-002",
      dateRequested: "2024-10-11",
      requestor: "Jane Smith",
      position: "Office Assistant",
      division: "Admin Division",
      serialNumber: "SN-67890",
      quantity: 2,
      unit: "Pieces",
      purpose: "For office use",
      rfNumber: "RF-102",
    },
  ];

  // State for search term, pagination, rows per page, and dialog visibility
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Function to handle approval
  const handleApprove = (request) => {
    setSelectedRequest(request);
    setDialogOpen(true);
  };

  // Function to close the dialog
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedRequest(null);
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0); // Reset to the first page on search
  };

  // Filter requests based on the search term
  const filteredRequests = requests.filter((request) =>
    request.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle pagination page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when changing rows per page
  };

  // Get the current requests to display
  const currentRequests = filteredRequests.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const CustomDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialog-paper": {
      width: "700px", // Customize width
      height: "475px", // Optional: customize height
      maxWidth: "none", // Disable default maxWidth
    },
  }));


  return (
    <Box sx={{ p: 3, backgroundColor: "#f0f4f4", minHeight: "100vh", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        User Requests
      </Typography>
      <TextField
        label="Search by Item Name"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ mb: 2, width: "400px", backgroundColor: "white" }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item Name</TableCell>
              <TableCell>Request Number</TableCell>
              <TableCell>Date Requested</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRequests.map((request) => (
              <TableRow key={request.requestNumber}>
                <TableCell>{request.itemName}</TableCell>
                <TableCell>{request.requestNumber}</TableCell>
                <TableCell>{request.dateRequested}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleApprove(request)}
                    sx={{ mr: 1 }}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() =>
                      console.log(`Denied request: ${request.requestNumber}`)
                    }
                  >
                    Deny
                  </Button>
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

      {/* Dialog for Approval Details */}
      {selectedRequest && (
  <CustomDialog open={dialogOpen} onClose={handleCloseDialog}>
    <DialogTitle sx={{ fontSize: "24px", fontWeight: "bold" }}>Approval Details</DialogTitle>
    <DialogContent>
      <Typography variant="body1" sx={{ fontSize: "18px", marginBottom: "8px" }}>
        <strong>Requestor:</strong> {selectedRequest.requestor}
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "18px", marginBottom: "8px" }}>
        <strong>Position:</strong> {selectedRequest.position}
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "18px", marginBottom: "8px" }}>
        <strong>Division:</strong> {selectedRequest.division}
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "18px", marginBottom: "8px" }}>
        <strong>Item Issued:</strong> {selectedRequest.itemName}
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "18px", marginBottom: "8px" }}>
        <strong>Serial Number:</strong> {selectedRequest.serialNumber}
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "18px", marginBottom: "8px" }}>
        <strong>Quantity:</strong> {selectedRequest.quantity}
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "18px", marginBottom: "8px" }}>
        <strong>Unit:</strong> {selectedRequest.unit}
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "18px", marginBottom: "8px" }}>
        <strong>Purpose:</strong> {selectedRequest.purpose}
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "18px", marginBottom: "8px" }}>
        <strong>RF No.:</strong> {selectedRequest.rfNumber}
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCloseDialog} variant="contained" color="primary">
        OK
      </Button>
    </DialogActions>
  </CustomDialog>
)}

    </Box>
  );
};

export default UserRequest;
