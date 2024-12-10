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
  TextField,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import api from "../api";

const UserRequest = () => {
  // Sample data for the user requests
  // const requests = [
  //   {
  //     itemName: "Laptop",
  //     id: "REQ-001",
  //     dateRequested: "2024-10-10",
  //     requestor: "John Doe",
  //     position: "IT Specialist",
  //     division: "ICT Division",
  //     serialNumber: "SN-12345",
  //     quantity: 1,
  //     unit: "Piece",
  //     purpose: "For work-from-home setup",
  //     rfNumber: "RF-101",
  //   },
  //   {
  //     itemName: "Mouse",
  //     id: "REQ-002",
  //     dateRequested: "2024-10-11",
  //     requestor: "Jane Smith",
  //     position: "Office Assistant",
  //     division: "Admin Division",
  //     serialNumber: "SN-67890",
  //     quantity: 2,
  //     unit: "Pieces",
  //     purpose: "For office use",
  //     rfNumber: "RF-102",
  //   },
  // ];

  const [requests, setRequests] = useState([]);

  // State for search term, pagination, rows per page, and dialog visibility
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const addRequestLog = async (requestor, itemName, requestNumber, action, admin = null) => {
    try {
      const logPayload = {
        requestor: requestor,
        item_name: itemName,
        request_number: requestNumber,
        action: action,
        admin: admin, // Admin can be null
      };
      await api.post("/api/logs/request/", logPayload);
      console.log("Request log added successfully!");
    } catch (error) {
      console.error("Error adding request log:", error);
      alert("Failed to add request log.");
    }
  };
  
  // Function to handle approval
  const handleApprove = async (request) => {
    try {
      const response = await api.post(`/api/approvals/approved/${request.id}/`);
      if (response.status === 200) {
        alert("Request approved successfully!");
        await addRequestLog(
          request.requestor_username,
          request.item_name,
          request.RF_number,
          "Request Approved",
          localStorage.getItem("username") // Fetch admin username from local storage
        );
        getPendingRequests(); // Refresh the request list to reflect changes
      } else {
        alert("Failed to approve the request.");
      }
    } catch (error) {
      console.error("Error approving request:", error);
      alert(error.response?.data?.error || "An error occurred while approving the request.");
    }
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
    request.item_name.toLowerCase().includes(searchTerm.toLowerCase())
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

  useEffect(() => {
    getPendingRequests();
  }, [])

  const getPendingRequests = () => {
    api
      .get("/api/requests/list/pending/")
      .then((res) => res.data)
      .then((data) => {setRequests(data); console.log(data)})
      .catch((err) => alert(err));
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split("T")[0];
  };

  const handleDeny = async (request) => {
    try {
      // Send request to deny the request
      const response = await api.post(`/api/approvals/deny/${request.id}/`);
      if (response.status === 200) {
        // Display success message
        alert("Request denied successfully!");
  
        // Add a log for the denied request
        // await addRequestLog(
        //   request.requestor_username,
        //   request.item_name,             // Item name
        //   request.RF_number,             // Request number
        //   "Request Denied",              // Action
        //   localStorage.getItem("username") // Fetch admin username from local storage
        // );
  
        // Refresh the request list
        getPendingRequests();
      } else {
        alert("Failed to deny the request.");
      }
    } catch (error) {
      console.error("Error denying request:", error);
      alert(error.response?.data?.error || "An error occurred while denying the request.");
    }
  };
  
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
              <TableCell>RF Number</TableCell>
              <TableCell>Date Requested</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.item_name}</TableCell>
                <TableCell>{request.RF_number}</TableCell>
                <TableCell>{formatDate(request.date_created)}</TableCell>
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
                    onClick={() => handleDeny(request)} // Call the deny handler
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
      {/* {selectedRequest && (
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
        <strong>Item Issued:</strong> {selectedRequest.item_name}
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
)} */}

    </Box>
  );
};

export default UserRequest;
